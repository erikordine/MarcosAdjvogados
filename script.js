// Config padrão (mantém template; só atualiza dados e cores)
const defaultConfig = {
  firm_name: "Marques Araújo Advocacia",
  hero_headline: "Advocacia especializada em soluções jurídicas",
  hero_subtitle:
    "Defendemos seus direitos com excelência, dedicação e estratégia personalizada para cada caso",
  lawyer_name: "Dr. Marques Araújo",
  oab_registration: "OAB/SP • (atualize aqui)",
  whatsapp_number: "+5511988175273",
  phone_number: "+5511988175273",
  email_address: "contato@marquesaraujo.adv.br",
  primary_color: "#051A3A",
  surface_color: "#E7F6FF",
  text_color: "#333333",
  font_family: "Playfair Display",
  font_size: 16,
};

let currentConfig = { ...defaultConfig };

function applyTheme(cfg) {
  document.documentElement.style.setProperty(
    "--color-primary",
    cfg.primary_color
  );
  document.documentElement.style.setProperty(
    "--color-surface",
    cfg.surface_color
  );
  document.documentElement.style.setProperty("--color-text", cfg.text_color);
  document.documentElement.style.setProperty(
    "--color-heading",
    cfg.primary_color
  );
}

function onConfigChange(config = {}) {
  const cfg = { ...defaultConfig, ...config };
  currentConfig = cfg;

  // textos
  const firmName = document.getElementById("firm-name");
  if (firmName) {
    const parts = (cfg.firm_name || "").split(/\s+/, 2);
    firmName.innerHTML = `${parts[0]}<br/>${parts[1] ?? "Advocacia"}`.trim();
  }

  const heroHeadline = document.getElementById("hero-headline");
  if (heroHeadline) heroHeadline.textContent = cfg.hero_headline;

  const heroSubtitle = document.getElementById("hero-subtitle");
  if (heroSubtitle) heroSubtitle.textContent = cfg.hero_subtitle;

  const lawyerName = document.getElementById("lawyer-name");
  if (lawyerName) lawyerName.textContent = cfg.lawyer_name;

  const oabRegistration = document.getElementById("oab-registration");
  if (oabRegistration) oabRegistration.textContent = cfg.oab_registration;

  const whatsappDisplay = document.getElementById("whatsapp-display");
  if (whatsappDisplay)
    whatsappDisplay.textContent = prettyPhone(cfg.whatsapp_number);

  const phoneDisplay = document.getElementById("phone-display");
  if (phoneDisplay) phoneDisplay.textContent = prettyPhone(cfg.phone_number);

  const emailDisplay = document.getElementById("email-display");
  if (emailDisplay) emailDisplay.textContent = cfg.email_address;

  // tema e tipografia
  applyTheme(cfg);
  document.documentElement.style.setProperty(
    "--font-serif",
    `'${cfg.font_family}', serif`
  );
  document.documentElement.style.fontSize = `${cfg.font_size}px`;
}

function prettyPhone(num) {
  const n = (num || "").replace(/\D/g, "");
  if (!n.startsWith("55")) return num;
  const cc = n.slice(0, 2);
  const ddd = n.slice(2, 4);
  const rest = n.slice(4);
  const isMobile9 = rest.length === 9;
  const a = rest.slice(0, isMobile9 ? 5 : 4);
  const b = rest.slice(isMobile9 ? 5 : 4);
  return `+${cc} ${ddd} ${a}-${b}`;
}

/* ===== Navegação, animação e header ===== */
function updateActiveLink() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";
  sections.forEach((section) => {
    const top = section.offsetTop;
    if (window.scrollY >= top - 120) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
}

function updateHeader() {
  const header = document.querySelector(".header");
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 50);
}

function animateOnScroll() {
  document
    .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
    .forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 140) el.classList.add("visible");
    });
}

// rAF para performance
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveLink();
      updateHeader();
      animateOnScroll();
      ticking = false;
    });
    ticking = true;
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("load", () => {
  animateOnScroll();
  onConfigChange(); // inicializa com defaultConfig
});

// Remove “buraco” do Sobre se não houver imagem
document.addEventListener("DOMContentLoaded", () => {
  const about = document.querySelector(".about-content");
  const pic = about?.querySelector(".about-image");
  if (about && pic && pic.childElementCount === 0) {
    about.classList.add("no-illustration");
  }
});

/* ===== Contatos ===== */
function openWhatsApp() {
  const n = (currentConfig.whatsapp_number || "").replace(/\D/g, "");
  const msg = encodeURIComponent(
    "Olá! Gostaria de agendar uma consulta jurídica."
  );
  window.open(
    `https://wa.me/${n}?text=${msg}`,
    "_blank",
    "noopener,noreferrer"
  );
}
function callPhone() {
  const n = (currentConfig.phone_number || "").replace(/\D/g, "");
  window.open(`tel:+${n}`, "_self");
}
function sendEmail() {
  const email = currentConfig.email_address || defaultConfig.email_address;
  const subject = encodeURIComponent(
    "Consulta Jurídica - Marques Araújo Advocacia"
  );
  const body = encodeURIComponent(
    "Olá! Gostaria de agendar uma consulta jurídica."
  );
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
}

/* Liga botões sem usar onclick no HTML (mantém compatibilidade) */
document
  .getElementById("btn-whatsapp-header")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });
document.getElementById("btn-whatsapp-hero")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp();
});
document
  .getElementById("btn-whatsapp-float")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });
document
  .getElementById("btn-whatsapp-contact")
  ?.addEventListener("click", (e) => {
    e.preventDefault();
    openWhatsApp();
  });
document.getElementById("btn-call-hero")?.addEventListener("click", (e) => {
  e.preventDefault();
  callPhone();
});
document.getElementById("btn-call-contact")?.addEventListener("click", (e) => {
  e.preventDefault();
  callPhone();
});
document.getElementById("btn-email-contact")?.addEventListener("click", (e) => {
  e.preventDefault();
  sendEmail();
});

/* ===== FAQ ===== */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const ans = item.querySelector(".faq-answer");
    ans.classList.toggle("active");
  });
});

/* ===== Menu mobile ===== */
const mobileBtn = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");
mobileBtn?.addEventListener("click", () => {
  navMenu?.classList.toggle("open");
  const isOpen = navMenu?.classList.contains("open");
  mobileBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
});
// fecha menu ao clicar num link
navMenu
  ?.querySelectorAll("a.nav-link")
  .forEach((a) =>
    a.addEventListener("click", () => navMenu.classList.remove("open"))
  );
