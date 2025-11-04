// Config padrão
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

/* ---------- Tema (se precisar mudar por config) ---------- */
function applyTheme(cfg) {
  document.documentElement.style.setProperty(
    "--color-primary",
    cfg.primary_color || defaultConfig.primary_color
  );
  document.documentElement.style.setProperty(
    "--color-surface",
    cfg.surface_color || defaultConfig.surface_color
  );
  document.documentElement.style.setProperty(
    "--color-text",
    cfg.text_color || defaultConfig.text_color
  );
  document.documentElement.style.setProperty(
    "--color-heading",
    cfg.primary_color || defaultConfig.primary_color
  );
}

function onConfigChange(config = {}) {
  const cfg = { ...defaultConfig, ...config };

  const firmName = document.getElementById("firm-name");
  if (firmName) firmName.innerHTML = cfg.firm_name.replace(" ", "<br/>");

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

  applyTheme(cfg);
  document.documentElement.style.setProperty(
    "--font-serif",
    `'${cfg.font_family}', serif`
  );
  document.documentElement.style.fontSize = `${cfg.font_size}px`;
}

/* ---------- Util ---------- */
function prettyPhone(num) {
  const n = (num || "").replace(/\D/g, "");
  if (n.length === 13)
    return `+${n.slice(0, 2)} ${n.slice(2, 4)} ${n.slice(4, 9)}-${n.slice(9)}`;
  if (n.length === 12)
    return `+${n.slice(0, 2)} ${n.slice(2, 4)} ${n.slice(4, 8)}-${n.slice(8)}`;
  return num;
}

/* ---------- Scroll spy / header / animações ---------- */
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
      link.getAttribute("href") === `#${current}`
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

/* ---------- Contato ---------- */
function openWhatsApp() {
  const n = (defaultConfig.whatsapp_number || "").replace(/\D/g, "");
  const msg = encodeURIComponent("Olá! Gostaria de agendar uma consulta.");
  window.open(
    `https://wa.me/${n}?text=${msg}`,
    "_blank",
    "noopener,noreferrer"
  );
}
function callPhone() {
  const n = (defaultConfig.phone_number || "").replace(/\D/g, "");
  window.open(`tel:+${n}`, "_self");
}
function sendEmail() {
  const email = defaultConfig.email_address;
  const subject = encodeURIComponent(
    "Agendamento de Consulta - Marques Araújo Advocacia"
  );
  const body = encodeURIComponent("Olá! Gostaria de agendar uma consulta.");
  window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
}

/* ---------- FAQ ---------- */
function toggleFaq(button) {
  const item = button.closest(".faq-item");
  const ans = item.querySelector(".faq-answer");
  ans.classList.toggle("active");
}

/* ---------- Menu Mobile ---------- */
(function setupMobileMenu() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const menuCta = document.getElementById("menuCta");
  const desktopCta = document.getElementById("desktopCta");

  if (!menuToggle || !navMenu) return;

  const openMenu = () => {
    navMenu.classList.add("open");
    document.body.classList.add("no-scroll");
    menuToggle.setAttribute("aria-expanded", "true");
  };
  const closeMenu = () => {
    navMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");
    menuToggle.setAttribute("aria-expanded", "false");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.contains("open");
    isOpen ? closeMenu() : openMenu();
  });

  // Fecha ao clicar em um link do menu
  navMenu
    .querySelectorAll("a.nav-link, a.menu-cta")
    .forEach((a) => a.addEventListener("click", () => closeMenu()));

  // CTA ações
  if (menuCta)
    menuCta.addEventListener("click", (e) => {
      e.preventDefault();
      openWhatsApp();
    });
  if (desktopCta)
    desktopCta.addEventListener("click", (e) => {
      e.preventDefault();
      openWhatsApp();
    });

  // Corrige estado ao redimensionar
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });
})();

/* ---------- Botões de ação ---------- */
document.getElementById("btnAgendarHero")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp();
});
document.getElementById("btnLigarHero")?.addEventListener("click", (e) => {
  e.preventDefault();
  callPhone();
});
document.getElementById("whatsLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp();
});
document.getElementById("phoneLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  callPhone();
});
document.getElementById("emailLink")?.addEventListener("click", (e) => {
  e.preventDefault();
  sendEmail();
});
document.getElementById("whatsFloat")?.addEventListener("click", (e) => {
  e.preventDefault();
  openWhatsApp();
});

/* ---------- Eventos globais ---------- */
window.addEventListener("scroll", () => {
  updateActiveLink();
  updateHeader();
  animateOnScroll();
});
window.addEventListener("load", () => {
  animateOnScroll();
  onConfigChange(); // aplica textos/tema padrão
});
