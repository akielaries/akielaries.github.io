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

  if (!el.start) { return; }

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
      + "   -   step " + (idx + 1) + " of " + SEQ.length;
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

  function requestWake() {
    try {
      if ("wakeLock" in navigator) {
        navigator.wakeLock.request("screen").then(function (w) { wakeLock = w; }).catch(function () {});
      }
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
    if (!ac) { beep(0.001, 0.001); }
    if (running) {
      stop();
      el.start.textContent = "Resume";
      el.start.classList.remove("running");
    } else {
      play();
    }
  });
  el.pause.addEventListener("click", function () {
    if (running) {
      stop();
      el.pause.textContent = "Resume";
      el.start.textContent = "Resume";
      el.start.classList.remove("running");
    } else {
      play();
      el.pause.textContent = "Pause";
    }
  });
  el.skip.addEventListener("click", function () { advance(); });
  el.reset.addEventListener("click", reset);

  // re-acquire wake lock when tab refocuses
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && running) { requestWake(); }
  });

  render();
})();
