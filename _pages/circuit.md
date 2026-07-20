---
permalink: /circuit/
title: "Mobility Circuit"
excerpt: "A press-start-and-go circuit timer for a full mobility routine."
author_profile: true
---

A circuit timer for a full mobility routine. Press start and go. The timer runs
each segment, beeps on transitions, and advances automatically.

<style>
  #circuit { max-width: 640px; margin: 1rem 0; --work:#22d3a6; --sect:#a3e635; --trans:#9ca3af; }
  #circuit * { box-sizing: border-box; }
  #cc-stage { border-radius: 14px; padding: 1.25rem 1rem 1.5rem; text-align:center;
    background:#0f1115; color:#f4f4f5; transition:background .2s; }
  #cc-stage.trans { background:#2a2f38; }
  #cc-kind { font-size:.72rem; letter-spacing:.16em; text-transform:uppercase; opacity:.7; }
  #cc-name { font-size:1.7rem; font-weight:700; line-height:1.15; margin:.35rem 0 .1rem; min-height:2.3em;
    display:flex; align-items:center; justify-content:center; }
  #cc-time { font-size:4.2rem; font-weight:800; font-variant-numeric:tabular-nums; margin:.2rem 0; }
  #cc-next { font-size:.95rem; opacity:.75; min-height:1.4em; }
  #cc-total { font-size:.8rem; opacity:.6; margin-top:.5rem; }
  #cc-bar { height:6px; border-radius:3px; background:#2a2f38; overflow:hidden; margin:.9rem 0 .2rem; }
  #cc-bar > div { height:100%; width:0; background:var(--work); transition:width .25s linear; }
  #cc-controls { display:flex; gap:.5rem; margin-top:1rem; flex-wrap:wrap; justify-content:center; }
  #circuit button { flex:1 1 auto; min-width:90px; padding:.7rem 1rem; border:none; border-radius:10px;
    font-size:1rem; font-weight:600; cursor:pointer; color:#fff; background:#374151; }
  #cc-start { background:#ef4444; flex:2 1 100%; }
  #cc-start.running { background:#374151; }
  #cc-list { margin-top:1.25rem; max-height:340px; overflow:auto; border:1px solid #e5e7eb; border-radius:10px; }
  #cc-list ol { margin:0; padding:0; list-style:none; }
  #cc-list li { display:flex; justify-content:space-between; gap:.75rem; padding:.5rem .8rem;
    border-bottom:1px solid #eee; font-size:.9rem; }
  #cc-list li:last-child { border-bottom:none; }
  #cc-list li.done { opacity:.4; }
  #cc-list li.active { background:#fff7ed; font-weight:700; }
  #cc-list li .d { font-variant-numeric:tabular-nums; opacity:.7; }
  #cc-list li.transition { color:#6b7280; font-style:italic; }
  #cc-list li.section { font-weight:700; }
  #cc-list li .row { display:flex; justify-content:space-between; gap:.75rem; align-items:center; width:100%; }
  #cc-list li .left { display:flex; align-items:center; gap:.5rem; min-width:0; }
  #cc-list li .n { overflow:hidden; text-overflow:ellipsis; }
  #cc-list li .right { display:flex; align-items:center; gap:.5rem; flex:none; }
  .cc-vidbtn { border:1px solid #d1d5db; background:#f9fafb; border-radius:6px; padding:.1rem .45rem;
    font-size:.75rem; line-height:1.4; cursor:pointer; color:#374151; }
  .cc-vidbtn:hover { background:#f0f0f0; }
  .cc-embed { width:100%; margin:.6rem 0 .2rem; }
  .cc-embed iframe { width:100%; aspect-ratio:16/9; border:0; border-radius:8px; }
  .cc-embed .miss { font-size:.85rem; }
  .cc-embed a { font-size:.78rem; }
  #cc-opts { display:flex; gap:1rem; align-items:center; margin-top:.75rem; font-size:.9rem; flex-wrap:wrap; }
  #cc-opts label { display:flex; align-items:center; gap:.35rem; cursor:pointer; }
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
    <span style="opacity:.6">Tap a name to see a demo video.</span>
  </div>
  <div id="cc-list"><ol></ol></div>
</div>

<script src="{{ base_path }}/assets/js/circuit.js"></script>
