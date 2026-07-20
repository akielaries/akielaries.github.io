---
permalink: /circuit/
title: "Sweat Circuit"
excerpt: "A press-start-and-go full-body circuit, about 30 minutes."
author_profile: true
---

A roughly 30-minute full-body circuit: a mobility warm-up, three rounds of
strength and cardio, then a cool-down. Press start and go. It speaks the next
move, counts you down, and advances on its own. Every move has a one-line
how-to, a reference photo of the start and end position, and a "watch demo"
link.

<style>
  #circuit { max-width: 620px; margin: 1rem auto; }
  #circuit * { box-sizing: border-box; }

  #cc-stage { position: sticky; top: 0; z-index: 30; border-radius: 14px;
    padding: 1rem 1rem 1.1rem; text-align:center; background:#0f1115; color:#f4f4f5;
    box-shadow: 0 6px 20px rgba(0,0,0,.15); transition:background .2s; }
  #cc-stage.trans { background:#334155; }
  #cc-kind { font-size:.7rem; letter-spacing:.16em; text-transform:uppercase; opacity:.7; }
  #cc-name { font-size:1.55rem; font-weight:700; line-height:1.15; margin:.3rem 0 .1rem; }
  #cc-time { font-size:3.6rem; font-weight:800; font-variant-numeric:tabular-nums; margin:.1rem 0; line-height:1; }
  #cc-next { font-size:.9rem; opacity:.8; min-height:1.3em; }
  #cc-total { font-size:.78rem; opacity:.6; margin-top:.4rem; }
  #cc-bar { height:6px; border-radius:3px; background:#334155; overflow:hidden; margin:.8rem 0 .1rem; }
  #cc-bar > div { height:100%; width:0; background:#22d3a6; transition:width .25s linear; }

  #cc-controls { display:flex; gap:.5rem; margin-top:.8rem; flex-wrap:wrap; }
  #circuit button { flex:1 1 auto; min-width:84px; min-height:48px; padding:.6rem 1rem; border:none;
    border-radius:10px; font-size:1rem; font-weight:600; cursor:pointer; color:#fff; background:#374151;
    -webkit-tap-highlight-color: transparent; }
  #cc-start { background:#ef4444; flex:2 1 100%; }
  #cc-start.running { background:#374151; }
  #cc-opts { display:flex; align-items:center; margin:.7rem 0 .3rem; font-size:.9rem; }
  #cc-opts label { display:flex; align-items:center; gap:.4rem; cursor:pointer; }

  #cc-list ol { margin:.5rem 0 0; padding:0; list-style:none; }
  #cc-list li.sec { margin:1.4rem 0 .2rem; padding:0 0 .3rem; font-size:.78rem; font-weight:700;
    letter-spacing:.12em; text-transform:uppercase; color:#ef4444; border-bottom:2px solid #f1d3d3; }
  #cc-list li.work { padding:.7rem .2rem; border-bottom:1px solid #eee; }
  #cc-list li.work .head { display:flex; justify-content:space-between; gap:.75rem; align-items:baseline; }
  #cc-list li.work .n { font-weight:700; font-size:1.02rem; }
  #cc-list li.work .d { font-variant-numeric:tabular-nums; color:#6b7280; flex:none; }
  #cc-list li.work .desc { font-size:.88rem; color:#4b5563; margin:.25rem 0 .1rem; line-height:1.4; }
  #cc-list li.work .media { display:flex; gap:.5rem; margin:.5rem 0 .5rem; }
  #cc-list li.work .media figure { flex:1 1 0; margin:0; min-width:0; }
  #cc-list li.work .media img { width:100%; border-radius:8px; display:block; background:#eee; }
  #cc-list li.work .media figcaption { font-size:.7rem; text-align:center; color:#6b7280; margin-top:.15rem; }
  #cc-list li.work .media.single { justify-content:center; }
  #cc-list li.work .media.single img { width:auto; max-width:220px; max-height:200px; }
  #cc-list li.work .demo { font-size:.8rem; color:#2563eb; text-decoration:none; }
  #cc-list li.work .demo:hover { text-decoration:underline; }
  #cc-list li.rest { display:flex; justify-content:space-between; padding:.35rem .2rem; font-size:.82rem;
    color:#9ca3af; font-style:italic; border-bottom:1px solid #f4f4f4; }
  #cc-list li.rest .d { font-variant-numeric:tabular-nums; }
  #cc-list li.active { background:#fff7ed; border-radius:8px; }
  #cc-list li.active .n { color:#c2410c; }
  #cc-list li.done { opacity:.4; }
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
  </div>
  <div id="cc-list"><ol></ol></div>
</div>

<script src="{{ base_path }}/assets/js/circuit.js"></script>
