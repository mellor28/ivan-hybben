const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

window.IH?.bindLangSwitch?.();
window.IH?.applyLang?.(window.IH.getLang());

function paintTicker() {
  const root = document.querySelector("[data-ticker]");
  if (!root || !window.IH) return;
  const raw = window.IH.t("ticker");
  const parts = raw.split("✦").map((part) => part.trim()).filter(Boolean);
  const track = document.createElement("div");
  track.className = "ticker-track";
  const render = [...parts, ...parts];
  render.forEach((text, i) => {
    const span = document.createElement("span");
    span.textContent = text;
    track.append(span);
    if (i < render.length - 1) {
      const sep = document.createElement("b");
      sep.textContent = "✦";
      track.append(sep);
    }
  });
  root.replaceChildren(track);
}

paintTicker();
document.addEventListener("ih:lang", paintTicker);

const photo = document.querySelector(".portrait-photo");
if (photo) {
  const showPhoto = () => {
    photo.hidden = false;
    photo.closest(".portrait")?.classList.add("has-photo");
  };
  photo.addEventListener("load", showPhoto);
  if (photo.complete && photo.naturalWidth > 0) showPhoto();
}

const nav = document.querySelector("[data-nav]");
const toggle = document.querySelector("[data-nav-toggle]");
const progress = document.querySelector("[data-progress]");
const form = document.querySelector("[data-form]");
const status = document.querySelector("[data-form-status]");
const links = [...document.querySelectorAll(".nav-links a[href^='#']")];
const spotlight = document.querySelector("[data-spotlight]");

function setMenu(open) {
  nav.dataset.open = open ? "true" : "false";
  toggle.setAttribute("aria-expanded", open ? "true" : "false");
  document.body.classList.toggle("nav-open", open);
}

toggle?.addEventListener("click", () => {
  setMenu(nav.dataset.open !== "true");
});

nav?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

function onScroll() {
  document.body.classList.toggle("is-scrolled", window.scrollY > 8);
  if (progress) {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const value = height > 0 ? window.scrollY / height : 0;
    progress.style.transform = `scaleX(${value})`;
  }

  const marker = window.scrollY + 140;
  let current = links[0];
  for (const link of links) {
    const id = link.getAttribute("href").slice(1);
    const section = document.getElementById(id);
    if (section && section.offsetTop <= marker) current = link;
  }
  for (const link of links) {
    if (link === current) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  }
}

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

document.querySelectorAll("[data-faq]").forEach((item) => {
  const button = item.querySelector("button");
  const panel = item.querySelector("[data-faq-panel]");
  button.addEventListener("click", () => {
    const wasOpen = item.dataset.open === "true";
    document.querySelectorAll("[data-faq]").forEach((other) => {
      other.dataset.open = "false";
      other.querySelector("button").setAttribute("aria-expanded", "false");
      other.querySelector("[data-faq-panel]").hidden = true;
    });
    if (!wasOpen) {
      item.dataset.open = "true";
      button.setAttribute("aria-expanded", "true");
      panel.hidden = false;
    }
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const note = String(data.get("note") || "").trim();
  const email = window.IH?.CONTACT_EMAIL || "ivanhybben@gmail.com";
  const subject = window.IH?.t("contact.mail.subject") || "What I want to improve";
  const body = (window.IH?.t("contact.mail.body") || "Name: {name}\n\nWhat I want to improve:\n{note}\n")
    .replace("{name}", name || "—")
    .replace("{note}", note || "—");
  const href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = href;
  if (status) {
    status.textContent = name
      ? (window.IH?.t("contact.saved.name") || "").replace("{name}", name)
      : (window.IH?.t("contact.saved") || "");
  }
});

const reveal = document.querySelectorAll("[data-reveal]");
if (reduceMotion) {
  reveal.forEach((node) => node.classList.add("is-in"));
} else if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-in");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  reveal.forEach((node) => observer.observe(node));
} else {
  reveal.forEach((node) => node.classList.add("is-in"));
}

if (spotlight && !reduceMotion) {
  window.addEventListener(
    "pointermove",
    (event) => {
      spotlight.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    },
    { passive: true }
  );
}

const tilt = document.querySelector("[data-tilt]");
if (tilt && !reduceMotion) {
  tilt.addEventListener("pointermove", (event) => {
    const box = tilt.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    tilt.style.transform = `perspective(1200px) rotateY(${x * 10}deg) rotateX(${y * -8}deg)`;
  });
  tilt.addEventListener("pointerleave", () => {
    tilt.style.transform = "";
  });
}

window.IH_SKETCHES?.initSketches?.();
