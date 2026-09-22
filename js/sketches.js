const SKETCHES = {
  sk: [
    {
      id: "inbox",
      title: "inbox-triage",
      foot: "Náčrt — bez skutočných e-mailov",
      float1: "Hranica nastavená",
      float2: "Človek <b>stále posiela</b>",
      body: `
        <div class="sketch-stack">
          <div class="mail-row"><span class="tag-soft">Triáž</span><b>Faktúra · dodávateľ</b><small>Pripraviť návrh odpovede</small></div>
          <div class="mail-row mute"><span class="tag-soft">Preskočiť</span><b>Newsletter · nástroj</b><small>Bez zákazníka, bez termínu</small></div>
          <div class="mail-row"><span class="tag-soft">Ľudské</span><b>Žiadosť · klient</b><small>Asistent pripraví. Človek odošle.</small></div>
        </div>`,
    },
    {
      id: "monday",
      title: "monday-report",
      foot: "Obnova namiesto ručného exportu",
      float1: "Obnova podľa plánu",
      float2: "Jeden <b>pohľad</b>",
      body: `
        <div class="lanes full">
          <div class="lane"><span>Pondelkový report</span>
            <div class="bars tall" aria-hidden="true"><i style="--h:55%"></i><i style="--h:70%"></i><i class="on" style="--h:88%"></i><i style="--h:42%"></i><i style="--h:63%"></i><i style="--h:77%"></i></div>
          </div>
          <p class="bubble ask">Skladá sa to stále ručne?</p>
          <p class="bubble answer">Nie — stránka sa obnoví. Čísla už existovali.</p>
        </div>`,
    },
    {
      id: "lookup",
      title: "data-helper",
      foot: "Odpoveď z vašich dát, alebo „neviem“",
      float1: "Musí sa pozrieť",
      float2: "Bez <b>hádania</b>",
      body: `
        <div class="lanes full">
          <p class="bubble ask">Aký je stav objednávky 1842?</p>
          <p class="bubble answer">Pozrel som CRM. Stav: odoslané · 21. 9.</p>
          <p class="bubble ask">A čo zľava pre nového klienta?</p>
          <p class="bubble answer dim">V zdroji nevidím pravidlá. Nechám to na človeka.</p>
        </div>`,
    },
    {
      id: "followup",
      title: "follow-up",
      foot: "Náčrt — pripomienka nezapadne",
      float1: "Termín sledovaný",
      float2: "Človek <b>rozhodne</b>",
      body: `
        <div class="sketch-stack">
          <div class="mail-row"><span class="tag-soft">Dnes</span><b>Ponuka · čaká 5 dní</b><small>Pripraviť krátky follow-up</small></div>
          <div class="mail-row"><span class="tag-soft">Zajtra</span><b>Handoff · kolega</b><small>Zhrnutie stavu do poznámky</small></div>
          <div class="mail-row mute"><span class="tag-soft">Hotovo</span><b>Faktúra · potvrdená</b><small>Bez ďalšej akcie</small></div>
        </div>`,
    },
  ],
  en: [
    {
      id: "inbox",
      title: "inbox-triage",
      foot: "Sketch — no real mail",
      float1: "Boundary set",
      float2: "A person <b>still sends</b>",
      body: `
        <div class="sketch-stack">
          <div class="mail-row"><span class="tag-soft">Triage</span><b>Invoice · vendor</b><small>Draft a reply</small></div>
          <div class="mail-row mute"><span class="tag-soft">Skip</span><b>Newsletter · tool</b><small>No customer, no deadline</small></div>
          <div class="mail-row"><span class="tag-soft">Human</span><b>Request · client</b><small>Helper prepares. Person sends.</small></div>
        </div>`,
    },
    {
      id: "monday",
      title: "monday-report",
      foot: "Refresh instead of a manual export",
      float1: "Scheduled refresh",
      float2: "One <b>view</b>",
      body: `
        <div class="lanes full">
          <div class="lane"><span>Monday report</span>
            <div class="bars tall" aria-hidden="true"><i style="--h:55%"></i><i style="--h:70%"></i><i class="on" style="--h:88%"></i><i style="--h:42%"></i><i style="--h:63%"></i><i style="--h:77%"></i></div>
          </div>
          <p class="bubble ask">Still rebuilt by hand?</p>
          <p class="bubble answer">No — the page refreshes. The numbers already existed.</p>
        </div>`,
    },
    {
      id: "lookup",
      title: "data-helper",
      foot: "Answer from your data, or “I can’t see it”",
      float1: "Has to look",
      float2: "No <b>guessing</b>",
      body: `
        <div class="lanes full">
          <p class="bubble ask">What’s the status of order 1842?</p>
          <p class="bubble answer">I checked CRM. Status: shipped · 21 Sep.</p>
          <p class="bubble ask">And the discount for a new client?</p>
          <p class="bubble answer dim">I don’t see a policy in the source. Leaving that to a person.</p>
        </div>`,
    },
    {
      id: "followup",
      title: "follow-up",
      foot: "Sketch — a reminder that sticks",
      float1: "Deadline tracked",
      float2: "A person <b>decides</b>",
      body: `
        <div class="sketch-stack">
          <div class="mail-row"><span class="tag-soft">Today</span><b>Offer · waiting 5 days</b><small>Draft a short follow-up</small></div>
          <div class="mail-row"><span class="tag-soft">Tomorrow</span><b>Handoff · colleague</b><small>Status summary into a note</small></div>
          <div class="mail-row mute"><span class="tag-soft">Done</span><b>Invoice · confirmed</b><small>No further action</small></div>
        </div>`,
    },
  ],
};

function initSketches() {
  const root = document.querySelector("[data-sketches]");
  if (!root) return;
  const body = root.querySelector("[data-sketch-body]");
  const title = root.querySelector("[data-sketch-title]");
  const foot = root.querySelector("[data-sketch-foot]");
  const float1 = root.querySelector("[data-sketch-float1]");
  const float2 = root.querySelector("[data-sketch-float2]");
  const dots = root.querySelector("[data-sketch-dots]");
  const live = root.querySelector("[data-sketch-live]");
  let index = 0;
  let timer;

  function list() {
    const lang = window.IH?.getLang?.() || "sk";
    return SKETCHES[lang] || SKETCHES.en;
  }

  function paint(i) {
    const items = list();
    index = ((i % items.length) + items.length) % items.length;
    const sketch = items[index];
    root.classList.add("is-swap");
    window.setTimeout(() => {
      title.textContent = sketch.title;
      foot.textContent = sketch.foot;
      float1.innerHTML = `<i></i> ${sketch.float1}`;
      float2.innerHTML = sketch.float2;
      body.innerHTML = sketch.body;
      dots.querySelectorAll("button").forEach((btn, n) => {
        btn.setAttribute("aria-current", n === index ? "true" : "false");
      });
      root.classList.remove("is-swap");
    }, 180);
  }

  function buildDots() {
    dots.replaceChildren();
    list().forEach((sketch, n) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("aria-label", sketch.title);
      btn.addEventListener("click", () => {
        paint(n);
        restart();
      });
      dots.append(btn);
    });
  }

  function restart() {
    window.clearInterval(timer);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timer = window.setInterval(() => paint(index + 1), 5200);
  }

  if (live) live.textContent = (window.IH?.getLang?.() || "sk") === "sk" ? "Živý náčrt" : "Live sketch";
  buildDots();
  paint(0);
  restart();
  document.addEventListener("ih:lang", () => {
    if (live) live.textContent = (window.IH?.getLang?.() || "sk") === "sk" ? "Živý náčrt" : "Live sketch";
    buildDots();
    paint(index);
    restart();
  });
}

window.IH_SKETCHES = { initSketches, SKETCHES };
