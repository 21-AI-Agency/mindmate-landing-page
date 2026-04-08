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
    ogImage: "https://chat-therapy.solarityai.com/assets/screenshots/sohbet-terapi-hero.png",
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
    badge: "Yapay Zekâ Destekli Duygusal Destek",
    title: "Konuş, Paylaş, Rahatla",
    subtitle: "Yapay zekâ destekli empatik sohbetler ile duygusal destek alın. Anonim, güvenli ve 7/24 erişilebilir bir platformda, sizi yargılamadan dinleyen, anlayan ve yanınızda olan bir destek sistemi.",
    ctaPrimary: { label: "Uygulamayı İndir", href: "#", icon: "arrow-up-right" },
    ctaSecondary: { label: "Özellikleri Keşfet", href: "#features" },
    phoneImage: "assets/screenshots/iphone-right.png",
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
    image: "assets/screenshots/sohbet-terapi-dashboard.png",
    imageAlt: "Sohbet Terapi uygulama önizleme",
    imageCaption: "",
  },

  features01: {
    badge: "Özellikler",
    title: "Sohbet Terapi İle Öne Çıkanlar",
    cards: [
      {
        image: "https://placehold.co/560x340/f9fafb/1e293b?text=Empati+Odakl%C4%B1",
        imageAlt: "Empati Odaklı Destek",
        imageCaption: "",
        title: "Empati Odaklı Destek",
        description: "Yapay zekâ destekli sohbetler ile sizi anlamaya çalışan, empati kuran bir deneyim.",
      },
      {
        image: "https://placehold.co/560x340/f9fafb/1e293b?text=Gizlilik+%26+G%C3%BCvenlik",
        imageAlt: "Gizlilik ve Güvenlik",
        imageCaption: "",
        title: "Gizlilik ve Güvenlik",
        description: "Sohbetleriniz gizlilik ilkelerine uygun şekilde korunur, üçüncü kişilerle paylaşılmaz.",
      },
    ],
  },

  features02: {
    badge: "Özellikler",
    title: "Size Özel Tasarlanmış Deneyim",
    phoneImage: "assets/screenshots/iphone-front.png",
    phoneImageAlt: "Sohbet Terapi özellikleri",
    tabs: [
      {
        icon: "layout",
        title: "Her Zaman Yanınızda",
        description: "Günün her saati destek almak için erişebileceğiniz bir sohbet ortamı.",
      },
      {
        icon: "target",
        title: "Anlaşılmak & Yargılanmamak",
        description: "Paylaşmak isteyip anlatamadıklarınızı dinleyen, sizi yargılamayan bir ortam.",
      },
      {
        icon: "check-circle",
        title: "Anonim Kullanım",
        description: "Kimliğinizi paylaşmadan, tamamen anonim şekilde duygularınızı ifade edin.",
      },
      {
        icon: "users",
        title: "KVKK Uyumlu",
        description: "Verileriniz KVKK'ya uygun şekilde korunur ve işlenir.",
      },
    ],
  },

  features03: {
    badge: "Özellikler",
    title: "Tüm Yetenekleri Keşfet",
    rows: [
      {
        image: "https://placehold.co/520x360/f9fafb/1e293b?text=Empati",
        imageAlt: "Empatik Sohbet",
        imageCaption: "",
        title: "Empatik Sohbet Deneyimi",
        description: "Yapay zekâ destekli sistemimiz duygularınızı anlar ve size empatiyle yanıt verir. Kendinizi güvende hissedeceğiniz bir alan.",
        cta: { label: "Daha Fazla", href: "#" },
        reverse: false,
      },
      {
        image: "https://placehold.co/520x360/f9fafb/1e293b?text=G%C3%BCvenlik",
        imageAlt: "Güvenlik ve Gizlilik",
        imageCaption: "",
        title: "Güvenliğiniz Bizim Önceliğimiz",
        description: "Sohbetleriniz şifrelenir ve üçüncü kişilerle asla paylaşılmaz. Tamamen anonim bir deneyim.",
        counters: [
          { value: "100%", label: "Anonim" },
          { value: "7/24", label: "Erişilebilir" },
        ],
        reverse: true,
      },
      {
        image: "https://placehold.co/520x360/f9fafb/1e293b?text=Destek",
        imageAlt: "Duygusal Destek",
        imageCaption: "",
        title: "Her An Yanınızda",
        description: "Günün her saati, haftanın her günü duygusal destek alın.",
        bulletPoints: [
          "Anlık empatik yanıtlar",
          "Anonim ve güvenli sohbet ortamı",
          "Kişiselleştirilmiş destek deneyimi",
          "Mobil ve web erişim",
        ],
        reverse: false,
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
    phoneImage: "assets/screenshots/iphone-front.png",
    phoneImageAlt: "Sohbet Terapi araçları",
    left: [
      { title: "Duygusal Destek", description: "Zor anlarınızda sizi dinleyen ve anlayan bir yapay zekâ asistanı." },
      { title: "Stres Yönetimi", description: "Yoğun iş temposunda kısa bir sohbet bile fark yaratır." },
      { title: "Gece Desteği", description: "Gece kaygılarınız arttığında yazın, içiniz sakinleşsin." },
    ],
    right: [
      { title: "Anonim Alan", description: "Kimliğinizi paylaşmadan, tamamen özgürce kendinizi ifade edin." },
      { title: "Yargılanmama", description: "Sizi yargılamayan, anlayan bir ortamda rahatlayın." },
      { title: "Kolay Erişim", description: "Mobil ve web üzerinden her an, her yerden erişin." },
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
      {
        quote: "Anonim bir alan olması beni rahatlatıyor. Kendimi özgürce ifade edebiliyorum.",
        name: "Mehmet B.",
        role: "Yazılım Geliştirici",
        avatarColor: "#ef4444",
      },
      {
        quote: "Paylaşmak gerçekten rahatlatıyor. Artık duygularımı bastırmak yerine ifade ediyorum.",
        name: "Ayşe D.",
        role: "Öğretmen",
        avatarColor: "#8b5cf6",
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
      meta: {
        title: "Sohbet Terapi | AI-Powered Emotional Support",
        description: "AI-powered empathetic conversations for emotional support. Anonymous, secure, and available 24/7.",
      },
      navLinks: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Testimonials", href: "#testimonials" },
      ],
      hero: {
        badge: "AI-Powered Emotional Support",
        title: "Talk, Share, Feel Better",
        subtitle: "Get emotional support through AI-powered empathetic conversations. An anonymous, secure, and 24/7 accessible platform that listens, understands, and stands by you without judgment.",
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
      features01: {
        badge: "Features",
        title: "What Makes Sohbet Terapi Special",
        cards: [
          {
            image: "https://placehold.co/560x340/f9fafb/1e293b?text=Empathy+Focused",
            imageAlt: "Empathy-Focused Support",
            title: "Empathy-Focused Support",
            description: "AI-powered conversations that try to understand and empathize with you.",
          },
          {
            image: "https://placehold.co/560x340/f9fafb/1e293b?text=Privacy+%26+Security",
            imageAlt: "Privacy & Security",
            title: "Privacy & Security",
            description: "Your conversations are protected and never shared with third parties.",
          },
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
      features03: {
        badge: "Features",
        title: "Explore All Capabilities",
        rows: [
          {
            image: "https://placehold.co/520x360/f9fafb/1e293b?text=Empathy",
            imageAlt: "Empathetic Chat",
            title: "Empathetic Chat Experience",
            description: "Our AI-powered system understands your emotions and responds with empathy. A space where you feel safe.",
            cta: { label: "Learn More", href: "#" },
          },
          {
            image: "https://placehold.co/520x360/f9fafb/1e293b?text=Security",
            imageAlt: "Security & Privacy",
            title: "Your Security Is Our Priority",
            description: "Your conversations are encrypted and never shared. A completely anonymous experience.",
            counters: [
              { value: "100%", label: "Anonymous" },
              { value: "24/7", label: "Accessible" },
            ],
          },
          {
            image: "https://placehold.co/520x360/f9fafb/1e293b?text=Support",
            imageAlt: "Emotional Support",
            title: "Always By Your Side",
            description: "Get emotional support any time of day, every day of the week.",
            bulletPoints: [
              "Instant empathetic responses",
              "Anonymous and secure chat environment",
              "Personalized support experience",
              "Mobile and web access",
            ],
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
        title: "Relax with Sohbet Terapi",
        left: [
          { title: "Emotional Support", description: "An AI assistant that listens and understands you in your difficult moments." },
          { title: "Stress Management", description: "Even a short chat can make a difference in a busy work schedule." },
          { title: "Night Support", description: "Write when your night anxieties increase, let your mind calm down." },
        ],
        right: [
          { title: "Anonymous Space", description: "Express yourself freely without sharing your identity." },
          { title: "No Judgment", description: "Relax in an environment that understands you without judging." },
          { title: "Easy Access", description: "Access from anywhere, anytime via mobile and web." },
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
          {
            quote: "The anonymous space comforts me. I can express myself freely.",
            name: "Mehmet B.",
            role: "Software Developer",
          },
          {
            quote: "Sharing truly relieves. Now I express my feelings instead of suppressing them.",
            name: "Ayse D.",
            role: "Teacher",
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
