#!/usr/bin/env bash
# Deploy Static Landing Page to Frontend EC2
# This script uploads static landing page files to the Nginx document root

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LANDING_PAGE_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ANSIBLE_DIR="${SCRIPT_DIR}"

# Default landing page source directory (current project root)
if [ -z "${LANDING_PAGE_SOURCE:-}" ]; then
    LANDING_PAGE_SOURCE="${LANDING_PAGE_ROOT}"
fi

echo "🚀 Landing Page Deployment"
echo "=========================="
echo ""

# Check if landing page source directory exists
if [ ! -d "${LANDING_PAGE_SOURCE}" ]; then
    echo "❌ Error: Landing page source directory not found: ${LANDING_PAGE_SOURCE}"
    echo ""
    echo "📋 Options:"
    echo "   1. Create landing page files in: ${LANDING_PAGE_SOURCE}"
    echo "   2. Set LANDING_PAGE_SOURCE environment variable:"
    echo "      export LANDING_PAGE_SOURCE=/path/to/your/landing-page"
    echo ""
    exit 1
fi

# Check if index.html exists (non-blocking warning, deployment continues)
if [ ! -f "${LANDING_PAGE_SOURCE}/index.html" ]; then
    echo "⚠️  Warning: index.html not found in ${LANDING_PAGE_SOURCE}"
    echo "   Landing page should have an index.html file"
    echo "   Continuing deployment anyway (files will be uploaded as-is)..."
    echo ""
fi

echo "✅ Landing page source: ${LANDING_PAGE_SOURCE}"
echo ""

# Sync Terraform outputs first
if [ -f "${ANSIBLE_DIR}/sync-terraform-outputs.sh" ]; then
    echo "[1/4] Syncing Terraform outputs..."
    "${ANSIBLE_DIR}/sync-terraform-outputs.sh" || {
        echo "⚠️  Warning: Failed to sync Terraform outputs"
        echo "   Continuing with existing configuration..."
        echo ""
    }
fi

# Upload landing page files via Ansible playbook
echo "[2/4] Uploading landing page files..."
cd "${ANSIBLE_DIR}"

# Create temporary playbook for file upload
cat > /tmp/deploy-landing-files.yml <<EOF
---
- name: Upload Landing Page Files
  hosts: all
  become: yes
  gather_facts: no
  tasks:
    - name: Create landing page directory
      file:
        path: /usr/share/nginx/html/landing
        state: directory
        owner: root
        group: nginx
        mode: '0755'
    
    - name: Upload landing page files (using rsync - faster and supports exclusions)
      synchronize:
        src: "${LANDING_PAGE_SOURCE}/"
        dest: /usr/share/nginx/html/landing/
        delete: no
        recursive: yes
        rsync_opts:
          - "--exclude=.git"
          - "--exclude=.gitignore"
          - "--exclude=ansible"
          - "--exclude=*.bak"
          - "--exclude=*.backup"
          - "--exclude=TestCommit"
          - "--exclude=README.md"
          - "--exclude=LICENCE"
          - "--progress"
      become: no
      
    - name: Set correct ownership and permissions
      file:
        path: /usr/share/nginx/html/landing
        owner: root
        group: nginx
        mode: '0755'
        recurse: yes
      
    - name: Verify files uploaded
      shell: ls -lah /usr/share/nginx/html/landing/ | head -10
      register: landing_files
      changed_when: false
    
    - name: Show uploaded files
      debug:
        var: landing_files.stdout_lines
      
    - name: Test Nginx configuration
      command: nginx -t
      changed_when: false
      register: nginx_test
      
    - name: Display Nginx test result
      debug:
        msg: "{{ nginx_test.stderr }}"
      when: nginx_test.rc != 0
      
    - name: Reload Nginx
      service:
        name: nginx
        state: reloaded
      when: nginx_test.rc == 0
      
    - name: Restart Nginx (if reload failed)
      service:
        name: nginx
        state: restarted
      when: nginx_test.rc != 0
EOF

ansible-playbook -i inventory/hosts.yml /tmp/deploy-landing-files.yml || {
    echo "❌ Error: Failed to upload landing page files"
    rm -f /tmp/deploy-landing-files.yml
    exit 1
}

rm -f /tmp/deploy-landing-files.yml

echo ""
echo "[3/4] Deployment verification complete"

echo ""
echo "✅ Landing page deployed successfully!"
echo ""

# Get domain from Terraform or group_vars
LANDING_DOMAIN=$(grep -E "^\s+- \"[^\"]+\"" "${ANSIBLE_DIR}/group_vars/all.yml" | head -1 | sed 's/.*"\([^"]*\)".*/\1/' || echo "")

# Get frontend IP from inventory
FRONTEND_IP=$(grep "ansible_host:" "${ANSIBLE_DIR}/inventory/hosts.yml" | awk '{print $2}' | head -1 || echo "")

echo "🌐 Access your landing page:"
if [ -n "$LANDING_DOMAIN" ] && [ "$LANDING_DOMAIN" != "_" ]; then
    # Try to get HTTPS URL from Terraform
    TERRAFORM_DIR="${LANDING_PAGE_ROOT}/../../../umur-fw-2025/demo/devops/aws/terraform"
    if [ -f "${TERRAFORM_DIR}/terraform.tfstate" ] && command -v terraform &> /dev/null; then
        cd "${TERRAFORM_DIR}"
        # Try to get root domain URL (might be configured via ALB)
        ROOT_URL=$(terraform output -raw root_domain_url 2>/dev/null || echo "")
        if [ -n "$ROOT_URL" ] && [ "$ROOT_URL" != "null" ]; then
            echo "   🌍 Production (HTTPS): ${ROOT_URL}"
        else
            echo "   🌍 Domain: ${LANDING_DOMAIN}"
        fi
        cd - > /dev/null
    else
        echo "   🌍 Domain: ${LANDING_DOMAIN}"
    fi
fi

if [ -n "$FRONTEND_IP" ]; then
    echo "   🖥️  Direct IP (HTTP): http://${FRONTEND_IP}"
fi
echo ""

