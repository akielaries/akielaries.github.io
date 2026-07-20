---
permalink: /circuit/
title: "Mobility Circuit"
excerpt: "A press-start-and-go circuit timer for a full mobility routine."
author_profile: true
---

A circuit timer for a full mobility routine. Press start and go. The timer runs
each segment, beeps on transitions, and advances automatically.

{% raw %}
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
  <div id="cc-list"><ol></ol></div>
</div>

<script>
(function () {
  // w = work, t = transition, s = section marker
  var SEQ = [
    ["Cat Cow", 60, "w"],
    ["Transitioning To Pelvic Tilts", 7, "t"],
    ["Pelvic Tilts", 60, "w"],
    ["Thoracic Mobility Work", 15, "s"],
    ["Thread The Needle", 60, "w"],
    ["Transitioning To Open Books", 7, "t"],
    ["Open Books", 60, "w"],
    ["Grab Foam Roller", 7, "t"],
    ["Thoracic Extension w/ Foam Roller", 60, "w"],
    ["Transitioning To Thoracic CARs", 7, "t"],
    ["Thoracic CARs Each Direction (slow)", 60, "w"],
    ["Hip Work", 15, "s"],
    ["90s / 90s", 90, "w"],
    ["Transitioning To Hip CARs", 7, "t"],
    ["Hip CARs Each Direction", 60, "w"],
    ["Transitioning To WGS", 7, "t"],
    ["Worlds Greatest Stretch", 60, "w"],
    ["Transitioning To Deep Squats", 7, "t"],
    ["Deep Squat Holds (explore)", 60, "w"],
    ["Transitioning To Couch Stretch", 15, "t"],
    ["Couch Stretch", 60, "w"],
    ["Limb Stability Work", 20, "s"],
    ["Shoulder CARs", 60, "w"],
    ["Transitioning To Push-Up Form", 7, "t"],
    ["Scapular Push ups", 45, "w"],
    ["Grab Resistance Band", 7, "t"],
    ["Band Pull Aparts", 60, "w"],
    ["Wrap Band To The Bar", 15, "t"],
    ["External Rotation", 60, "w"],
    ["Transitioning To Wrist Work", 7, "t"],
    ["Wrist CARs", 40, "w"],
    ["Wrist Rocks", 7, "t"],
    ["Forward Wrist Rocks", 30, "w"],
    ["Backwards", 7, "t"],
    ["Backwards Wrist Rocks", 30, "w"],
    ["Side 2 Side", 7, "t"],
    ["Side 2 Side Wrist Rocks", 30, "w"],
    ["End-Range Strength Training", 15, "s"],
    ["ATG Squat Hold", 60, "w"],
    ["Transitioning To Cossack Squat", 7, "t"],
    ["Cossack Squat", 60, "w"],
    ["Transitioning To Box For Jefferson Curls", 7, "t"],
    ["Jefferson Curls", 60, "w"],
    ["Transitioning To Pull Up Bar", 7, "t"],
    ["Hanging Scapular Shrug", 30, "w"],
    ["Tendon Health Work", 15, "s"],
    ["Spanish Squats", 60, "w"],
    ["Transitioning To A Wall", 7, "t"],
    ["Tibialis Raises", 45, "w"],
    ["Transitioning To Calf Raises", 7, "t"],
    ["Standing Calf Raises", 45, "w"],
    ["Single Leg Calf Raises", 40, "w"],
    ["Transitioning To Wrist Strength Training", 7, "t"],
    ["Wrist Flexor/Extensor Strength", 60, "w"],
    ["Grab A Rubber Band", 7, "t"],
    ["Finger Extensions", 60, "w"],
    ["Equilibrium Work", 15, "s"],
    ["Single Leg Balance", 60, "w"],
    ["Eyes Closed", 7, "t"],
    ["Eyes Closed Single Leg Balance", 40, "w"],
    ["Transitioning To A Seat", 7, "t"],
    ["Short Foot Exercise", 60, "w"],
    ["Toe Yoga", 30, "w"],
    ["Dumbbell To the Living Room", 15, "t"],
    ["Farmer Carry", 45, "w"]
  ];

  var KIND = { w: "Work", t: "Transition", s: "Section" };
  var COLOR = { w: "var(--work)", t: "var(--trans)", s: "var(--sect)" };

  var idx = 0, remaining = SEQ[0][1], running = false, tickId = null, wakeLock = null;
  var totalSecs = SEQ.reduce(function (a, s) { return a + s[1]; }, 0);

  var el = {
    stage: document.getElementById("cc-stage"),
    kind: document.getElementById("cc-kind"),
    name: document.getElementById("cc-name"),
    time: document.getElementById("cc-time"),
    next: document.getElementById("cc-next"),
    total: document.getElementById("cc-total"),
    bar: document.querySelector("#cc-bar > div"),
    start: document.getElementById("cc-start"),
    pause: document.getElementById("cc-pause"),
    skip: document.getElementById("cc-skip"),
    reset: document.getElementById("cc-reset"),
    list: document.querySelector("#cc-list ol")
  };

  function fmt(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }

  // build the exercise list once
  SEQ.forEach(function (s, i) {
    var li = document.createElement("li");
    li.className = s[2] === "t" ? "transition" : s[2] === "s" ? "section" : "";
    li.dataset.i = i;
    li.innerHTML = '<span class="n"></span><span class="d">' + fmt(s[1]) + "</span>";
    li.querySelector(".n").textContent = s[0];
    el.list.appendChild(li);
  });
  var liEls = el.list.querySelectorAll("li");

  // web audio beep, no assets needed
  var ac = null;
  function beep(freq, dur) {
    try {
      if (!ac) { ac = new (window.AudioContext || window.webkitAudioContext)(); }
      var o = ac.createOscillator(), g = ac.createGain();
      o.type = "sine"; o.frequency.value = freq;
      o.connect(g); g.connect(ac.destination);
      g.gain.setValueAtTime(0.001, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.3, ac.currentTime + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + dur);
      o.start(); o.stop(ac.currentTime + dur);
    } catch (e) {}
  }

  function elapsedBefore(i) {
    var t = 0;
    for (var k = 0; k < i; k++) { t += SEQ[k][1]; }
    return t;
  }

  function render() {
    var s = SEQ[idx];
    el.kind.textContent = KIND[s[2]];
    el.name.textContent = s[0];
    el.time.textContent = fmt(remaining);
    el.stage.className = s[2] === "t" ? "trans" : "";
    el.bar.style.background = COLOR[s[2]];
    el.bar.style.width = (100 * (s[1] - remaining) / s[1]) + "%";
    var nx = SEQ[idx + 1];
    el.next.textContent = nx ? "Next: " + nx[0] + "  (" + fmt(nx[1]) + ")" : "Last one";
    var doneSecs = elapsedBefore(idx) + (s[1] - remaining);
    el.total.textContent = fmt(doneSecs) + " / " + fmt(totalSecs)
      + "   ·   step " + (idx + 1) + " of " + SEQ.length;
    for (var i = 0; i < liEls.length; i++) {
      liEls[i].classList.toggle("active", i === idx);
      liEls[i].classList.toggle("done", i < idx);
    }
    var active = liEls[idx];
    if (active) { active.scrollIntoView({ block: "nearest" }); }
  }

  function advance() {
    if (idx < SEQ.length - 1) {
      idx++;
      remaining = SEQ[idx][1];
      beep(SEQ[idx][2] === "t" ? 660 : 880, 0.18);
      render();
    } else {
      finish();
    }
  }

  function finish() {
    stop();
    beep(988, 0.25);
    setTimeout(function () { beep(1319, 0.35); }, 200);
    el.kind.textContent = "Done";
    el.name.textContent = "Circuit complete";
    el.time.textContent = fmt(totalSecs);
    el.next.textContent = "Nice work.";
    el.start.textContent = "Start";
    el.start.classList.remove("running");
  }

  function tick() {
    remaining--;
    if (remaining <= 0) {
      advance();
    } else {
      if (remaining <= 3) { beep(remaining === 1 ? 784 : 523, 0.09); }
      render();
    }
  }

  async function requestWake() {
    try {
      if ("wakeLock" in navigator) { wakeLock = await navigator.wakeLock.request("screen"); }
    } catch (e) {}
  }
  function releaseWake() {
    if (wakeLock) { wakeLock.release().catch(function () {}); wakeLock = null; }
  }

  function play() {
    if (running) { return; }
    running = true;
    if (ac && ac.state === "suspended") { ac.resume(); }
    beep(880, 0.15);
    requestWake();
    tickId = setInterval(tick, 1000);
    el.start.textContent = "Running";
    el.start.classList.add("running");
    el.pause.textContent = "Pause";
  }

  function stop() {
    running = false;
    if (tickId) { clearInterval(tickId); tickId = null; }
    releaseWake();
  }

  function reset() {
    stop();
    idx = 0; remaining = SEQ[0][1];
    el.start.textContent = "Start";
    el.start.classList.remove("running");
    el.pause.textContent = "Pause";
    render();
  }

  el.start.addEventListener("click", function () {
    // ensure audio unlocked on first user gesture
    if (!ac) { beep(0.001, 0.001); }
    running ? (stop(), el.start.textContent = "Resume", el.start.classList.remove("running"))
            : play();
  });
  el.pause.addEventListener("click", function () {
    if (running) { stop(); el.pause.textContent = "Resume"; el.start.textContent = "Resume"; el.start.classList.remove("running"); }
    else { play(); el.pause.textContent = "Pause"; }
  });
  el.skip.addEventListener("click", function () { advance(); });
  el.reset.addEventListener("click", reset);

  // re-acquire wake lock when tab refocuses
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && running) { requestWake(); }
  });

  render();
})();
</script>
{% endraw %}
