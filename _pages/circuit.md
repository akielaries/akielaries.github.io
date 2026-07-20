---
permalink: /circuit/
title: "Mobility Circuit"
excerpt: "A press-start-and-go circuit timer for a full mobility routine."
author_profile: true
---

A circuit timer for a full mobility routine. Press start and go. The timer runs
each segment, speaks the next move, counts you down, and advances automatically.

<style>
  #circuit { max-width: 640px; margin: 1rem auto; --work:#22d3a6; --sect:#a3e635; --trans:#9ca3af; }
  #circuit * { box-sizing: border-box; }

  /* sticky timer so the countdown stays visible while you scroll */
  #cc-stage { position: sticky; top: 0; z-index: 30; border-radius: 14px;
    padding: 1rem 1rem 1.1rem; text-align:center; background:#0f1115; color:#f4f4f5;
    box-shadow: 0 6px 20px rgba(0,0,0,.15); transition:background .2s; }
  #cc-stage.trans { background:#2a2f38; }
  #cc-kind { font-size:.7rem; letter-spacing:.16em; text-transform:uppercase; opacity:.7; }
  #cc-name { font-size:1.55rem; font-weight:700; line-height:1.15; margin:.3rem 0 .1rem; }
  #cc-time { font-size:3.6rem; font-weight:800; font-variant-numeric:tabular-nums; margin:.1rem 0; line-height:1; }
  #cc-next { font-size:.9rem; opacity:.75; min-height:1.3em; }
  #cc-total { font-size:.78rem; opacity:.6; margin-top:.4rem; }
  #cc-bar { height:6px; border-radius:3px; background:#2a2f38; overflow:hidden; margin:.8rem 0 .1rem; }
  #cc-bar > div { height:100%; width:0; background:var(--work); transition:width .25s linear; }

  #cc-controls { display:flex; gap:.5rem; margin-top:.8rem; flex-wrap:wrap; }
  #circuit button { flex:1 1 auto; min-width:84px; min-height:48px; padding:.6rem 1rem; border:none;
    border-radius:10px; font-size:1rem; font-weight:600; cursor:pointer; color:#fff; background:#374151;
    -webkit-tap-highlight-color: transparent; }
  #cc-start { background:#ef4444; flex:2 1 100%; }
  #cc-start.running { background:#374151; }
  #cc-opts { display:flex; gap:1rem; align-items:center; margin:.7rem 0 .3rem; font-size:.9rem; flex-wrap:wrap; }
  #cc-opts label { display:flex; align-items:center; gap:.4rem; cursor:pointer; }

  /* list scrolls with the page, no trapped inner scrollbar */
  #cc-list ol { margin:.5rem 0 0; padding:0; list-style:none; }
  #cc-list li { display:flex; align-items:center; gap:.7rem; padding:.6rem .3rem; min-height:52px;
    border-bottom:1px solid #eee; -webkit-tap-highlight-color: transparent; }
  #cc-list li.work { cursor:pointer; }
  #cc-list li.work:active { background:#fafafa; }
  #cc-list li.done { opacity:.45; }
  #cc-list li.active { background:#fff7ed; }
  #cc-list li.active .n { font-weight:700; }
  #cc-list li.transition { color:#6b7280; font-style:italic; font-size:.9rem; min-height:40px; }
  #cc-list li.section { font-weight:700; }
  #cc-list .thumb { width:64px; height:44px; flex:none; border-radius:6px; object-fit:cover; background:#e5e7eb; }
  #cc-list .thumb.ph { display:flex; align-items:center; justify-content:center; font-size:1.1rem; color:#9ca3af; }
  #cc-list .n { flex:1 1 auto; min-width:0; }
  #cc-list .d { font-variant-numeric:tabular-nums; opacity:.7; flex:none; font-size:.9rem; }
  #cc-list .go { flex:none; color:#9ca3af; font-size:1.1rem; }

  /* full-screen detail with big photos + inline video */
  #cc-modal { position:fixed; inset:0; z-index:1000; background:rgba(0,0,0,.6);
    display:none; align-items:flex-start; justify-content:center; padding:1rem; overflow:auto; }
  #cc-modal.open { display:flex; }
  #cc-sheet { background:#fff; color:#111; width:100%; max-width:560px; border-radius:14px;
    padding:1rem; margin:auto; }
  #cc-sheet h3 { margin:.1rem 0 .2rem; font-size:1.25rem; }
  #cc-sheet .sub { font-size:.85rem; color:#6b7280; margin-bottom:.7rem; }
  #cc-photos { display:flex; gap:.5rem; margin-bottom:.8rem; }
  #cc-photos figure { flex:1 1 0; margin:0; }
  #cc-photos img { width:100%; border-radius:8px; display:block; background:#eee; }
  #cc-photos figcaption { font-size:.72rem; text-align:center; color:#6b7280; margin-top:.2rem; }
  #cc-video { width:100%; aspect-ratio:16/9; border:0; border-radius:8px; background:#000; }
  #cc-modal .actions { display:flex; gap:.5rem; margin-top:.8rem; }
  #cc-modal .actions a, #cc-modal .actions button { flex:1 1 0; text-align:center; min-height:46px;
    display:flex; align-items:center; justify-content:center; border-radius:10px; font-weight:600;
    font-size:.95rem; text-decoration:none; }
  #cc-close { background:#111; color:#fff; border:none; cursor:pointer; }
  #cc-yt { background:#f3f4f6; color:#111; border:1px solid #e5e7eb; }
  #cc-modal .nomedia { font-size:.9rem; color:#6b7280; padding:.5rem 0 .2rem; }
</style>

<div id="circuit">
  <div id="cc-stage">
    <div id="cc-kind">Ready</div>
    <div id="cc-name">Press start</div>
    <div id="cc-time">00:00</div>
    <div id="cc-bar"><div></div></div>
    <div id="cc-next">&nbsp;</div>
    <div id="cc-total">&nbsp;</div>
  </div>
  <div id="cc-controls">
    <button id="cc-start">Start</button>
    <button id="cc-pause">Pause</button>
    <button id="cc-skip">Skip</button>
    <button id="cc-reset">Reset</button>
  </div>
  <div id="cc-opts">
    <label><input type="checkbox" id="cc-voice" checked> Voice cues</label>
    <span style="opacity:.6">Tap any exercise for photos and a demo.</span>
  </div>
  <div id="cc-list"><ol></ol></div>

  <div id="cc-modal">
    <div id="cc-sheet">
      <h3 id="cc-mtitle"></h3>
      <div class="sub" id="cc-msub"></div>
      <div id="cc-mbody"></div>
      <div class="actions">
        <a id="cc-yt" target="_blank" rel="noopener" href="#">Search YouTube</a>
        <button id="cc-close">Close</button>
      </div>
    </div>
  </div>
</div>

<script src="{{ base_path }}/assets/js/circuit.js"></script>
