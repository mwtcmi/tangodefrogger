// scripts/theme-freepbx.js
// Tango Edition theme shim: swaps images, sets copy, and provides simple sound hooks.
// Safe to load AFTER the original game scripts (no core changes required for visuals).

(() => {
  const THEME = {
    title: "FreePBX Frogger — Tango Edition",
    hudBadge: "images/freepbx/freepbx-logo-badge.png",
    sprites: {
      frog: "images/freepbx/tango-sprite.png",          // 4 frames @32x32 across (128x32 total)
      enemySmall: "images/freepbx/sip-trunk.png",        // small car/bug
      enemyMedium: "images/freepbx/pseries-phone.png",   // medium car/van
      enemyLarge: "images/freepbx/nat-firewall.png",     // truck/bus
      platformA: "images/freepbx/rtp-stream.png",        // log
      platformB: "images/freepbx/server-rack.png",       // turtle
      homePad: "images/freepbx/freepbx-pad.png"          // home pad
    },
    sfx: {
      win: "sounds/ringback.wav",
      lose: "sounds/fast-busy.wav",
      coin: "sounds/dtmf-1.wav"
    },
    copy: {
      intro: "Guide Tango across congested SIP lanes, ride RTP streams, and dock on FreePBX pads.",
      howto: "Arrow keys/WASD to move. Avoid trunks and firewalls. Reach all 5 pads.",
      footer: "© Sangoma — Built on denodell/frogger (Apress demo)"
    }
  };

  document.title = THEME.title;
  const help = document.getElementById('help') || document.querySelector('.help');
  if (help) help.textContent = `${THEME.copy.intro} ${THEME.copy.howto}`;

  const hud = document.getElementById('hud-badge');
  if (hud) hud.src = THEME.hudBadge;

  // Swap image assets by best-effort filename patterns common in Frogger demos.
  const swapImg = (pattern, src) => {
    document.querySelectorAll(`img[src*='${pattern}']`).forEach(img => img.src = src);
  };
  // Try to update any preloaded <img> tags used by the engine/resources loader
  const candidates = [
    ["frog", THEME.sprites.frog],
    ["char-boy", THEME.sprites.frog],
    ["bug", THEME.sprites.enemySmall],
    ["car", THEME.sprites.enemyMedium],
    ["truck", THEME.sprites.enemyLarge],
    ["log", THEME.sprites.platformA],
    ["turtle", THEME.sprites.platformB],
    ["home", THEME.sprites.homePad]
  ];
  candidates.forEach(([p,s]) => swapImg(p, s));

  // Provide simple audio hooks other code can call: window.playSound('win'|'lose'|'coin')
  const audio = {};
  for (const k of Object.keys(THEME.sfx)) {
    const a = new Audio(THEME.sfx[k]);
    a.preload = "auto";
    audio[k] = a;
  }
  window.playSound = (name) => {
    const a = audio[name];
    if (!a) return;
    try { a.currentTime = 0; } catch(e) {}
    a.play().catch(()=>{});
  };

  // Optional score API: window.scoreHook.add/reset/win/lose
  if (!window.scoreHook) {
    window.scoreHook = {
      add(){}, reset(){}, win(){ window.playSound('win'); }, lose(){ window.playSound('lose'); }
    };
  }

  // If the upstream exposes a global Resources cache (like Udacity's Frogger), patch its map:
  if (window.Resources && typeof window.Resources.cache === 'object') {
    const map = window.Resources.cache;
    const replace = (needle, src) => {
      Object.keys(map).forEach(k => { if (k.includes(needle)) map[k].src = src; });
    };
    replace("char-boy", THEME.sprites.frog);
    replace("bug", THEME.sprites.enemySmall);
    replace("car", THEME.sprites.enemyMedium);
    replace("truck", THEME.sprites.enemyLarge);
    replace("log", THEME.sprites.platformA);
    replace("turtle", THEME.sprites.platformB);
    replace("home", THEME.sprites.homePad);
  }
})();
