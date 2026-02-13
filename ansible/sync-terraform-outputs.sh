#!/bin/bash
# Sync Terraform outputs to Landing Page Ansible configuration
# This ensures seamless deployment without manual configuration

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$(cd "${SCRIPT_DIR}/../../umur-fw-2025/demo/devops/aws/terraform" && pwd)"
ANSIBLE_DIR="${SCRIPT_DIR}"

echo "🔄 Syncing Terraform outputs to Landing Page Ansible configuration..."

# Check if terraform is available
if ! command -v terraform &> /dev/null; then
    echo "❌ Error: terraform command not found"
    echo "   Please install Terraform or ensure it's in your PATH"
    exit 1
fi

# Check if jq is available (for JSON parsing)
if ! command -v jq &> /dev/null; then
    echo "⚠️  Warning: jq not found. Continuing without jq..."
    USE_JQ=false
else
    USE_JQ=true
fi

# Change to Terraform directory
cd "${TERRAFORM_DIR}"

# Check if terraform is initialized
if [ ! -d ".terraform" ]; then
    echo "⚠️  Terraform not initialized. Running terraform init..."
    terraform init -input=false > /dev/null 2>&1 || {
        echo "❌ Error: Failed to initialize Terraform"
        exit 1
    }
fi

# Get Terraform outputs
echo "📥 Fetching Terraform outputs..."

if [ "$USE_JQ" = true ]; then
    # Use jq for better parsing
    FRONTEND_IP=$(terraform output -json 2>/dev/null | jq -r '.frontend_static_ip.value // empty')
    SSH_KEY=$(terraform output -json 2>/dev/null | jq -r '.frontend_ssh_key_path.value // empty')
else
    # Fallback to grep/sed
    FRONTEND_IP=$(terraform output frontend_static_ip 2>/dev/null | sed 's/"//g' | awk '{print $3}' || echo "")
    SSH_KEY=$(terraform output frontend_ssh_key_path 2>/dev/null | sed 's/"//g' | awk '{print $3}' || echo "")
fi

# Get landing page domain from Terraform output (preferred method)
LANDING_DOMAINS=""
if [ "$USE_JQ" = true ]; then
    LANDING_PAGE_DOMAIN=$(terraform output -json 2>/dev/null | jq -r '.landing_page_domain_name.value // empty' || echo "")
else
    LANDING_PAGE_DOMAIN=$(terraform output landing_page_domain_name 2>/dev/null | sed 's/"//g' | awk '{print $3}' || echo "")
fi

# Fallback: Get landing page subdomain from Terraform variables file
if [ -z "$LANDING_PAGE_DOMAIN" ]; then
    LANDING_PAGE_SUBDOMAIN=$(grep -E "^\s*landing_page_subdomain\s*=" "${TERRAFORM_DIR}/terraform.tfvars" 2>/dev/null | sed 's/.*=\s*\([^#]*\).*/\1/' | awk '{print $1}' | tr -d ' "' || echo "")
    if [ -n "$LANDING_PAGE_SUBDOMAIN" ]; then
        # Get root domain from domain_name variable
        DOMAIN_NAME=$(grep -E "^\s*domain_name\s*=" "${TERRAFORM_DIR}/terraform.tfvars" 2>/dev/null | sed 's/.*=\s*"\([^"]*\)".*/\1/' || echo "")
        if [ -n "$DOMAIN_NAME" ]; then
            LANDING_PAGE_DOMAIN="${LANDING_PAGE_SUBDOMAIN}.${DOMAIN_NAME}"
        fi
    fi
fi

# Legacy support: fallback to root_domain_to_frontend
if [ -z "$LANDING_PAGE_DOMAIN" ]; then
    ROOT_DOMAIN_TO_FRONTEND=$(grep -E "^\s*root_domain_to_frontend\s*=" "${TERRAFORM_DIR}/terraform.tfvars" 2>/dev/null | sed 's/.*=\s*\([^#]*\).*/\1/' | awk '{print $1}' | tr -d ' "' || echo "false")
    CREATE_WWW_RECORD=$(grep -E "^\s*create_www_record\s*=" "${TERRAFORM_DIR}/terraform.tfvars" 2>/dev/null | sed 's/.*=\s*\([^#]*\).*/\1/' | awk '{print $1}' | tr -d ' "' || echo "false")
    
    if [ "$ROOT_DOMAIN_TO_FRONTEND" = "true" ] || [ "$CREATE_WWW_RECORD" = "true" ]; then
        DOMAIN_NAME=$(grep -E "^\s*domain_name\s*=" "${TERRAFORM_DIR}/terraform.tfvars" 2>/dev/null | sed 's/.*=\s*"\([^"]*\)".*/\1/' || echo "")
        if [ -n "$DOMAIN_NAME" ]; then
            if [ "$ROOT_DOMAIN_TO_FRONTEND" = "true" ]; then
                LANDING_PAGE_DOMAIN="${DOMAIN_NAME}"
            fi
            if [ "$CREATE_WWW_RECORD" = "true" ]; then
                if [ -n "$LANDING_PAGE_DOMAIN" ]; then
                    LANDING_PAGE_DOMAIN="${LANDING_PAGE_DOMAIN} www.${DOMAIN_NAME}"
                else
                    LANDING_PAGE_DOMAIN="www.${DOMAIN_NAME}"
                fi
            fi
        fi
    fi
fi

if [ -n "$LANDING_PAGE_DOMAIN" ]; then
    LANDING_DOMAINS="${LANDING_PAGE_DOMAIN}"
fi

# Update inventory file
echo ""
echo "📝 Updating Ansible inventory: ${ANSIBLE_DIR}/inventory/hosts.yml"

if [ -n "$FRONTEND_IP" ]; then
    # Update inventory with frontend IP
    if [ "$USE_JQ" = true ]; then
        sed -i.bak "s/ansible_host:.*/ansible_host: ${FRONTEND_IP}/" "${ANSIBLE_DIR}/inventory/hosts.yml"
    else
        # For systems without sed -i (macOS compatibility)
        sed "s/ansible_host:.*/ansible_host: ${FRONTEND_IP}/" "${ANSIBLE_DIR}/inventory/hosts.yml" > "${ANSIBLE_DIR}/inventory/hosts.yml.tmp" && mv "${ANSIBLE_DIR}/inventory/hosts.yml.tmp" "${ANSIBLE_DIR}/inventory/hosts.yml"
    fi
    
    if [ -n "$SSH_KEY" ]; then
        # Convert absolute path to ~/.ssh/ format if it's in the user's home directory
        if [[ "$SSH_KEY" == "$HOME"* ]]; then
            SSH_KEY="${SSH_KEY/#$HOME/~}"
        fi
        sed "s|ansible_ssh_private_key_file:.*|ansible_ssh_private_key_file: ${SSH_KEY}|" "${ANSIBLE_DIR}/inventory/hosts.yml" > "${ANSIBLE_DIR}/inventory/hosts.yml.tmp" && mv "${ANSIBLE_DIR}/inventory/hosts.yml.tmp" "${ANSIBLE_DIR}/inventory/hosts.yml"
    fi
    
    echo "✅ Inventory updated with frontend IP: ${FRONTEND_IP}"
else
    echo "⚠️  Warning: Could not get frontend IP from Terraform outputs"
fi

# Update group_vars/all.yml with landing page domains
echo ""
echo "📝 Updating Ansible variables: ${ANSIBLE_DIR}/group_vars/all.yml"

if [ -n "$LANDING_DOMAINS" ]; then
    # Convert space-separated domains to YAML list
    LANDING_DOMAINS_YAML=""
    for domain in $LANDING_DOMAINS; do
        LANDING_DOMAINS_YAML="${LANDING_DOMAINS_YAML}    - \"${domain}\"\n"
    done
    
    # Update landing_domain_names in group_vars/all.yml
    # Remove existing landing_domain_names section and add new one
    if [ -f "${ANSIBLE_DIR}/group_vars/all.yml" ]; then
        # Create backup
        cp "${ANSIBLE_DIR}/group_vars/all.yml" "${ANSIBLE_DIR}/group_vars/all.yml.bak"
        
        # Remove old landing_domain_names entries
        awk '
            /^landing_domain_names:/ {
                in_section=1
                next
            }
            in_section && /^[a-z_]+:/ {
                in_section=0
            }
            in_section && /^[[:space:]]*-/ {
                next
            }
            {
                print
            }
            /^landing_domain_names:/ {
                in_section=1
            }
        ' "${ANSIBLE_DIR}/group_vars/all.yml.bak" > "${ANSIBLE_DIR}/group_vars/all.yml.tmp"
        
        # Insert new landing_domain_names before any other top-level key or at the end
        if grep -q "^landing_domain_names:" "${ANSIBLE_DIR}/group_vars/all.yml.tmp"; then
            sed -i.bak "/^landing_domain_names:/a\\${LANDING_DOMAINS_YAML}" "${ANSIBLE_DIR}/group_vars/all.yml.tmp" 2>/dev/null || \
            awk -v domains="${LANDING_DOMAINS_YAML}" '/^landing_domain_names:/{print; printf "%s", domains; next}1' "${ANSIBLE_DIR}/group_vars/all.yml.tmp" > "${ANSIBLE_DIR}/group_vars/all.yml.tmp2" && mv "${ANSIBLE_DIR}/group_vars/all.yml.tmp2" "${ANSIBLE_DIR}/group_vars/all.yml.tmp"
        else
            # Add landing_domain_names section
            echo "" >> "${ANSIBLE_DIR}/group_vars/all.yml.tmp"
            echo "landing_domain_names:" >> "${ANSIBLE_DIR}/group_vars/all.yml.tmp"
            echo -e "${LANDING_DOMAINS_YAML}" >> "${ANSIBLE_DIR}/group_vars/all.yml.tmp"
        fi
        
        mv "${ANSIBLE_DIR}/group_vars/all.yml.tmp" "${ANSIBLE_DIR}/group_vars/all.yml"
        
        echo "✅ Variables updated:"
        echo "   Landing Page Domains: ${LANDING_DOMAINS}"
    else
        echo "⚠️  Warning: group_vars/all.yml not found"
    fi
else
    echo "⚠️  Warning: Could not determine landing page domains from Terraform"
fi

echo ""
echo "✅ Sync complete! Configuration files updated."
echo ""
echo "📋 Next steps:"
echo "   1. Deploy landing page: cd ${ANSIBLE_DIR} && ./deploy-landing-page.sh"
echo ""
echo "💡 Tip: Run this script before each deployment to ensure"
echo "   Ansible configuration matches your Terraform infrastructure."

