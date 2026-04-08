/**
 * Sohbet Terapi — Product configuration
 * Copy this to config.js to use.
 */

const PRODUCT_CONFIG = {

  name: "Sohbet Terapi",
  tagline: "Konuş, Paylaş, Rahatla",
  description: "Yapay zekâ destekli empatik sohbetler ile duygusal destek alın. Anonim, güvenli ve 7/24 erişilebilir.",
  url: "https://chat-therapy.solarityai.com/",
  year: "2025",
  copyrightName: "Solarity AI LLC",

  theme: {
    accentColor: "#82CDE0",        // Primary — Light Blue
    lightBlue: "#6abac5",          // Accent — Teal
    themeColor: "#1e3a5f",
    bgColor: "#f8fafc",            // Background
    textColor: "#1f2937",          // Text
    textMuted: "#4b5563",          // Text Secondary
    secondary: "#1e3a5f",          // Secondary — Deep Navy
    ctaBg: "#E3F9F0",              // CTA section background — soft mint
  },

  logoSvg: `<img src="assets/images/logo/logo-128.webp" alt="Sohbet Terapi" class="nav-logo-img">`,

  meta: {
    title: "Sohbet Terapi | Yapay Zekâ Destekli Duygusal Destek",
    description: "Sohbet Terapi, yapay zekâ destekli empatik konuşmalar ve duygusal destek sunarak ruhsal iyi oluşunuza katkı sağlar. Anonim, güvenli ve 7/24 erişilebilir.",
    keywords: "sohbet terapi, yapay zeka terapi, duygusal destek, mental sağlık, psikolojik destek, AI terapi, online terapi, anonim terapi",
    ogImage: "https://chat-therapy.solarityai.com/assets/screenshots/sohbet-terapi-hero.webp",
  },

  navLinks: [
    { label: "Özellikler", href: "#features" },
    { label: "Paketlerimiz", href: "#pricing" },
    { label: "Kullanıcı Yorumları", href: "#testimonials" },
  ],
  navCta: {
    loginLabel: "Giriş Yap",
    loginHref: "#",
    primaryLabel: "Hemen Başla",
    primaryHref: "#",
  },

  // Language toggle
  langSwitch: {
    default: "tr",
    storageKey: "sohbet_terapi_lang",
    options: [
      { code: "tr", flag: "\u{1F1F9}\u{1F1F7}" },
      { code: "en", flag: "\u{1F1FA}\u{1F1F8}" },
    ],
  },

  hero: {
    badge: "Yapay Zekâ Destekli Duygusal Destek Uygulaması",
    title: "Konuş, Paylaş, Rahatla",
    subtitle: "Yapay zekâ destekli empatik sohbetler ile anonim ve 7/24 duygusal destek. Sizi dinleyen, anlayan ve yargılamayan bir alan.",
    ctaPrimary: { label: "Uygulamayı İndir", href: "#", icon: "arrow-up-right" },
    ctaSecondary: { label: "Özellikleri Keşfet", href: "#features" },
    phoneImage: "assets/screenshots/iphone-right.webp",
    phoneImageAlt: "Sohbet Terapi uygulama arayüzü",
    cardLeft: {
      title: "Empati Odaklı",
      description: "Yapay zekâ destekli sohbetler ile sizi anlayan bir deneyim.",
      stat: "7/24",
      statLabel: "Erişim",
      avatars: [
        "https://i.pravatar.cc/60?img=32",
        "https://i.pravatar.cc/60?img=47",
        "https://i.pravatar.cc/60?img=12",
        "https://i.pravatar.cc/60?img=25",
      ],
    },
    cardRight: {
      title: "Rahatlatıcı bir deneyim",
      quote: "Zorlandığım günlerde yazmak beni rahatlatıyor. Yargılanmadığımı bilmek iyi hissettiriyor.",
      author: "Elif K.",
    },
  },

  brands: {
    label: "Güvenli, anonim ve empatik destek platformu",
    count: 3,
  },

  numbers: {
    badge: "Etki",
    title: "Sohbet Terapi ile Kendinizi Daha İyi Hissedin",
    subtitle: "Platformumuz duygusal destek arayanlar için güvenli ve anonim bir alan sunar.",
    stats: [
      { value: "7/24", label: "Erişilebilirlik" },
      { value: "100%", label: "Anonim & Güvenli" },
    ],
    image: "assets/screenshots/sohbet-terapi-dashboard.webp",
    imageAlt: "Sohbet Terapi uygulama önizleme",
    imageCaption: "",
  },

  features02: {
    badge: "Özellikler",
    title: "Size Özel Tasarlanmış Deneyim",
    phoneImage: "assets/screenshots/iphone-front2.webp",
    phoneImageAlt: "Sohbet Terapi günce ekranı — minnet, başarı ve gelişim alanları",
    tabs: [
      {
        icon: "clock",
        title: "Her Zaman Yanınızda",
        description: "Günün her saati destek almak için erişebileceğiniz bir sohbet ortamı.",
      },
      {
        icon: "chat",
        title: "Anlaşılmak & Yargılanmamak",
        description: "Paylaşmak isteyip anlatamadıklarınızı dinleyen, sizi yargılamayan bir ortam.",
      },
      {
        icon: "incognito",
        title: "Anonim Kullanım",
        description: "Kimliğinizi paylaşmadan, tamamen anonim şekilde duygularınızı ifade edin.",
      },
      {
        icon: "shield-lock",
        title: "KVKK Uyumlu",
        description: "Verileriniz KVKK'ya uygun şekilde korunur ve işlenir.",
      },
    ],
  },

  benefits: {
    badge: "Temel Değerler",
    title: "Neden Sohbet Terapi?",
    items: [
      {
        icon: "management",
        title: "Empati",
        description: "Yapay zekâ destekli sohbetler ile sizi anlamaya çalışan, empati kuran bir deneyim sunar.",
      },
      {
        icon: "security",
        title: "Güven",
        description: "Sohbetleriniz gizlilik ilkelerine uygun şekilde korunur, üçüncü kişilerle paylaşılmaz.",
      },
      {
        icon: "insights",
        title: "Gizlilik",
        description: "Kimliğinizi paylaşmadan, tamamen anonim şekilde duygularınızı ifade edebilirsiniz.",
      },
    ],
  },

  tools: {
    badge: "Nasıl Çalışır",
    title: "Sohbet Terapi ile Rahatla",
    phoneImage: "assets/screenshots/sohbet-terapi-home.webp",
    phoneImageAlt: "Sohbet Terapi ana ekranı — sohbet serisi ve günlük ilham",
    left: [
      { title: "Empatik Sohbet", description: "Zor anlarınızda sizi dinleyen ve yargılamayan bir yapay zekâ asistanı." },
      { title: "Gece Desteği", description: "Gece kaygılarınız arttığında yazın, içiniz sakinleşsin." },
    ],
    right: [
      { title: "Anonim Alan", description: "Kimliğinizi paylaşmadan, tamamen özgürce kendinizi ifade edin." },
      { title: "Kolay Erişim", description: "Mobil ve web üzerinden her an, her yerden 7/24 ulaşın." },
    ],
  },

  integrations: {
    badge: "Platform",
    title: "Her Platformda Yanınızda",
    row1Count: 4,
    row2Count: 3,
  },

  pricing: {
    badge: "Fiyatlandırma",
    title: "Paketlerimiz",
    plans: [
      {
        name: "Başlangıç",
        description: "Platformu keşfetmek isteyenler için.",
        priceMonthly: "₺200",
        priceYearly: "₺150",
        cta: { label: "Hemen Başla", href: "#", style: "outline" },
        features: [
          "Aylık 50 sohbet hakkı",
          "Temel özelliklere erişim",
          "Mobil ve web kullanım",
          "7/24 destek",
        ],
      },
      {
        name: "Standart",
        description: "Tam deneyim isteyenler için.",
        priceMonthly: "₺500",
        priceYearly: "₺375",
        featured: true,
        cta: { label: "Hemen Başla", href: "#", style: "primary" },
        features: [
          "Aylık 200 sohbet hakkı",
          "Tüm özelliklere tam erişim",
          "Öncelikli müşteri desteği",
          "Uygulama içi özel içerikler",
        ],
      },
      {
        name: "Premium",
        description: "Maksimum destek arayanlar için.",
        priceMonthly: "₺800",
        priceYearly: "₺600",
        cta: { label: "Hemen Başla", href: "#", style: "outline" },
        features: [
          "Yüksek limitli sohbet hakkı",
          "Özel premium içerikler",
          "1'e 1 özel destek",
          "Yeni özelliklere erken erişim",
        ],
      },
    ],
  },

  testimonials: {
    badge: "Kullanıcı Yorumları",
    title: "Gerçek Deneyimler",
    items: [
      {
        quote: "Zorlandığım günlerde yazmak beni rahatlatıyor. Yargılanmadığımı bilmek iyi hissettiriyor.",
        name: "Elif K.",
        role: "Üniversite Öğrencisi",
        avatarColor: "#82CDE0",
      },
      {
        quote: "Yoğun iş temposunda kısa bir sohbet bile fark yaratıyor, stresim azalıyor.",
        name: "Ahmet Y.",
        role: "Genç Profesyonel",
        avatarColor: "#6abac5",
      },
      {
        quote: "Gece kaygılarım arttığında yazıyorum; içim gerçekten sakinleşiyor.",
        name: "Zeynep A.",
        role: "Yeni Mezun",
        avatarColor: "#f59e0b",
      },
    ],
  },

  cta: {
    title: "Kendinizi Daha İyi Hissetmeye Başlayın",
    subtitle: "Anonim, güvenli ve 7/24 erişilebilir duygusal destek platformu.",
    buttonLabel: "Hemen Başla — Ücretsiz Dene",
    buttonHref: "#",
    image: "https://placehold.co/400x300/E3F9F0/1e293b?text=Sohbet+Terapi",
    imageAlt: "Sohbet Terapi illüstrasyon",
    imageCaption: "",
  },

  footer: {
    columns: [
      {
        title: "Destek",
        links: [],
      },
    ],
    appStore: {
      show: true,
      googlePlayHref: "#",
      appStoreHref: "#",
    },
    legal: [
      { label: "Veri Silme", href: "/data-deletion.html" },
      { label: "Gizlilik Politikası", href: "/privacy-policy.html" },
      { label: "Kullanım Şartları", href: "/footer-pages/terms.html" },
      { label: "KVKK Aydınlatma", href: "/footer-pages/kvkk.html" },
      { label: "Çerez Politikası", href: "/footer-pages/cookies.html" },
    ],
    supportText: "Yardıma mı ihtiyacınız var? Bize info@sohbetterapi.com veya support@sohbetterapi.com adresinden ulaşın.",
  },

  analyticsId: "",

  // ── ENGLISH TRANSLATIONS ───────────────────────
  translations: {
    en: {
      name: "Chat Therapy",
      meta: {
        title: "Chat Therapy | AI-Powered Emotional Support",
        description: "AI-powered empathetic conversations for emotional support. Anonymous, secure, and available 24/7.",
      },
      navLinks: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Testimonials", href: "#testimonials" },
      ],
      hero: {
        badge: "AI-Powered Emotional Support App",
        title: "Talk, Share, Feel Better",
        subtitle: "Anonymous, 24/7 emotional support through AI-powered empathetic conversations. A space that listens, understands, and never judges.",
        ctaPrimary: { label: "Download the App", href: "#", icon: "arrow-up-right" },
        ctaSecondary: { label: "Explore Features", href: "#features" },
        cardLeft: {
          title: "Empathy-Focused",
          description: "AI-powered conversations that understand and empathize with you.",
          stat: "24/7",
          statLabel: "Access",
        },
        cardRight: {
          title: "A comforting experience",
          quote: "Writing on tough days relieves me. Knowing I won't be judged feels great.",
          author: "Elif K.",
        },
      },
      brands: {
        label: "Secure, anonymous, and empathetic support platform",
      },
      numbers: {
        badge: "Impact",
        title: "Feel Better with Sohbet Terapi",
        subtitle: "Our platform offers a safe and anonymous space for those seeking emotional support.",
        stats: [
          { value: "24/7", label: "Accessibility" },
          { value: "100%", label: "Anonymous & Secure" },
        ],
      },
      features02: {
        badge: "Features",
        title: "An Experience Designed for You",
        tabs: [
          {
            title: "Always By Your Side",
            description: "A chat environment you can access any time of the day for support.",
          },
          {
            title: "Be Understood, Not Judged",
            description: "A space that listens to what you want to share without judgment.",
          },
          {
            title: "Anonymous Usage",
            description: "Express your feelings completely anonymously without sharing your identity.",
          },
          {
            title: "GDPR Compliant",
            description: "Your data is protected and processed in compliance with privacy regulations.",
          },
        ],
      },
      benefits: {
        badge: "Core Values",
        title: "Why Sohbet Terapi?",
        items: [
          {
            title: "Empathy",
            description: "AI-powered conversations that try to understand and empathize with you.",
          },
          {
            title: "Trust",
            description: "Your conversations are protected and never shared with third parties.",
          },
          {
            title: "Privacy",
            description: "Express your feelings completely anonymously without sharing your identity.",
          },
        ],
      },
      tools: {
        badge: "How It Works",
        title: "Relax with Chat Therapy",
        left: [
          { title: "Empathetic Chat", description: "An AI assistant that listens and never judges you in your difficult moments." },
          { title: "Night Support", description: "Write when your night anxieties increase, let your mind calm down." },
        ],
        right: [
          { title: "Anonymous Space", description: "Express yourself freely without sharing your identity." },
          { title: "Easy Access", description: "Reach us 24/7 from anywhere via mobile and web." },
        ],
      },
      integrations: {
        badge: "Platform",
        title: "By Your Side on Every Platform",
      },
      pricing: {
        badge: "Pricing",
        title: "Our Plans",
        toggleMonthly: "Monthly",
        toggleYearly: "Yearly",
        plans: [
          {
            name: "Starter",
            description: "For those who want to explore the platform.",
            priceMonthly: "$5",
            priceYearly: "$4",
            cta: { label: "Get Started", href: "#" },
            features: [
              "50 chats per month",
              "Basic feature access",
              "Mobile and web usage",
              "24/7 support",
            ],
          },
          {
            name: "Standard",
            description: "For those who want the full experience.",
            priceMonthly: "$13",
            priceYearly: "$10",
            cta: { label: "Get Started", href: "#" },
            features: [
              "200 chats per month",
              "Full feature access",
              "Priority customer support",
              "In-app exclusive content",
            ],
          },
          {
            name: "Premium",
            description: "For those seeking maximum support.",
            priceMonthly: "$21",
            priceYearly: "$16",
            cta: { label: "Get Started", href: "#" },
            features: [
              "High-limit chat access",
              "Exclusive premium content",
              "1-on-1 dedicated support",
              "Early access to new features",
            ],
          },
        ],
      },
      testimonials: {
        badge: "User Reviews",
        title: "Real Experiences",
        items: [
          {
            quote: "Writing on tough days relieves me. Knowing I won't be judged feels great.",
            name: "Elif K.",
            role: "University Student",
          },
          {
            quote: "Even a short chat during a busy work day makes a difference, my stress decreases.",
            name: "Ahmet Y.",
            role: "Young Professional",
          },
          {
            quote: "I write when my night anxieties increase; I really calm down.",
            name: "Zeynep A.",
            role: "Recent Graduate",
          },
        ],
      },
      cta: {
        title: "Start Feeling Better Today",
        subtitle: "Anonymous, secure, and 24/7 accessible emotional support platform.",
        buttonLabel: "Get Started — Try Free",
        image: "https://placehold.co/400x300/E3F9F0/1e293b?text=Sohbet+Terapi",
        imageAlt: "Sohbet Terapi illustration",
      },
      footer: {
        columns: [
          {
            title: "Support",
            links: [],
          },
        ],
        appStore: {
          title: "Get the App",
        },
        legal: [
          { label: "Data Deletion", href: "/data-deletion.html" },
          { label: "Privacy Policy", href: "/privacy-policy.html" },
          { label: "Terms of Service", href: "/footer-pages/terms.html" },
          { label: "GDPR Notice", href: "/footer-pages/kvkk.html" },
          { label: "Cookies Policy", href: "/footer-pages/cookies.html" },
        ],
        supportText: "Need help? Reach us at info@sohbetterapi.com or support@sohbetterapi.com.",
      },
    },
  },
};
