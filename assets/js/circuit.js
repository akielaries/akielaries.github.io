(function () {
  // one-line plain descriptions so you always know the move
  var DESC = {
    "Cat Cow": "On all fours; alternate arching your back up and letting it drop, moving with your breath.",
    "Pelvic Tilts": "On your back, knees bent; rock your pelvis to flatten then arch your lower back.",
    "Thread the Needle": "On all fours; reach one arm under the other and rotate your upper back, then switch.",
    "Banded Side Steps": "Band around your legs; stay in a half-squat and step side to side.",
    "Banded Monster Walks": "Band around your legs; walk forward and back in a partial squat, keeping tension.",
    "Standing Hip Circles": "Hold a support; lift one knee and draw big circles with the hip (swing it around), switch legs halfway.",
    "Bodyweight Squats": "Feet shoulder-width; sit back and down until thighs near parallel, then stand tall.",
    "Walking Lunges": "Step forward into a lunge until both knees bend about 90 degrees, then step through onto the other leg.",
    "Calf Raises": "Rise up onto the balls of your feet, then lower slowly. Hold a wall if you need balance.",
    "Glute Bridges": "On your back, knees bent; drive your hips up squeezing your glutes, then lower.",
    "Push-ups": "Hands under shoulders; lower your chest toward the floor and press up. Drop to knees if needed.",
    "Mountain Climbers": "In a plank, quickly drive your knees toward your chest one at a time.",
    "Plank": "Forearms and toes down; hold a straight line from head to heels, brace your core.",
    "Jumping Jacks": "Jump your feet out while raising your arms overhead, then back in.",
    "Child's Pose": "Kneel and sit back onto your heels, reaching your arms forward on the floor. Breathe.",
    "Standing Forward Fold": "Hinge at the hips and hang toward your toes, letting your neck relax.",
    "Quad Stretch": "Stand tall, pull one heel toward your glute; hold, then switch. Hold a wall for balance.",
    "Thread the Needle": "On all fours; reach one arm under the other and rotate your upper back, then switch."
  };

  // reference diagrams: real start/end photos from free-exercise-db, plus one animation
  var PHOTO_DB = "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/";
  var PHOTOS = {
    "Cat Cow": { db: "Cat_Stretch" },
    "Pelvic Tilts": { db: "Pelvic_Tilt_Into_Bridge" },
    "Banded Side Steps": { db: "Monster_Walk" },
    "Banded Monster Walks": { db: "Monster_Walk" },
    "Standing Hip Circles": { db: "Standing_Hip_Circles" },
    "Bodyweight Squats": { db: "Bodyweight_Squat" },
    "Walking Lunges": { db: "Bodyweight_Walking_Lunge" },
    "Calf Raises": { db: "Standing_Calf_Raises" },
    "Glute Bridges": { db: "Butt_Lift_Bridge" },
    "Push-ups": { db: "Pushups" },
    "Mountain Climbers": { db: "Mountain_Climbers" },
    "Plank": { db: "Plank" },
    "Jumping Jacks": { gif: "https://commons.wikimedia.org/wiki/Special:FilePath/Vitruvian%20jumping%20jacks.gif?width=400" },
    "Child's Pose": { db: "Childs_Pose" },
    "Standing Forward Fold": { db: "Standing_Toe_Touches" },
    "Quad Stretch": { db: "Quad_Stretch" }
  };

  function W(name, secs) { return { name: name, secs: secs, kind: "w" }; }
  function R(secs) { return { name: "Rest", secs: secs, kind: "r" }; }

  // build the full sequence: warm-up, 3 rounds, cool-down
  var SEQ = [];
  function push(items, section) {
    items.forEach(function (it) { it.section = section; SEQ.push(it); });
  }

  push([
    W("Cat Cow", 60),
    W("Pelvic Tilts", 45),
    W("Thread the Needle", 60),
    W("Banded Side Steps", 45),
    W("Banded Monster Walks", 45),
    W("Standing Hip Circles", 60)
  ], "Warm-up");

  var round = [
    W("Bodyweight Squats", 45),
    W("Walking Lunges", 45),
    W("Calf Raises", 40),
    W("Glute Bridges", 40),
    W("Push-ups", 35),
    W("Mountain Climbers", 40),
    W("Plank", 40),
    W("Jumping Jacks", 40)
  ];
  for (var r = 1; r <= 3; r++) {
    var items = [];
    round.forEach(function (ex, i) {
      items.push(W(ex.name, ex.secs));
      if (i < round.length - 1) { items.push(R(10)); }
    });
    if (r < 3) { items.push(R(45)); }
    push(items, "Round " + r + " of 3");
  }

  push([
    W("Child's Pose", 45),
    W("Standing Forward Fold", 45),
    W("Quad Stretch", 60)
  ], "Cool-down");

  var KIND = { w: "Work", r: "Rest" };

  var idx = 0, remaining = SEQ[0].secs, running = false, tickId = null, wakeLock = null;
  var totalSecs = SEQ.reduce(function (a, s) { return a + s.secs; }, 0);

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
    voice: document.getElementById("cc-voice"),
    list: document.querySelector("#cc-list ol")
  };

  if (!el.start) { return; }

  function fmt(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }
  function ytSearch(name) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent("how to " + name + " exercise");
  }

  var canSpeak = "speechSynthesis" in window;
  function say(text, interrupt) {
    if (!canSpeak || !el.voice.checked) { return; }
    try {
      if (interrupt) { window.speechSynthesis.cancel(); }
      var u = new SpeechSynthesisUtterance(text);
      u.rate = 1.05;
      window.speechSynthesis.speak(u);
    } catch (e) {}
  }

  // build the list, grouped by section, with a description on every move
  var lastSection = null;
  SEQ.forEach(function (s, i) {
    if (s.section !== lastSection) {
      lastSection = s.section;
      var h = document.createElement("li");
      h.className = "sec";
      h.textContent = s.section;
      el.list.appendChild(h);
    }
    var li = document.createElement("li");
    li.className = s.kind === "r" ? "rest" : "work";
    li.dataset.i = i;
    if (s.kind === "r") {
      li.innerHTML = '<span class="rlabel">Rest</span><span class="d"></span>';
      li.querySelector(".d").textContent = fmt(s.secs);
    } else {
      var head = document.createElement("div");
      head.className = "head";
      var n = document.createElement("span");
      n.className = "n";
      n.textContent = s.name;
      var d = document.createElement("span");
      d.className = "d";
      d.textContent = fmt(s.secs);
      head.appendChild(n);
      head.appendChild(d);
      li.appendChild(head);
      if (DESC[s.name]) {
        var p = document.createElement("div");
        p.className = "desc";
        p.textContent = DESC[s.name];
        li.appendChild(p);
      }
      var ph = PHOTOS[s.name];
      if (ph) {
        var media = document.createElement("div");
        media.className = "media" + (ph.gif ? " single" : "");
        if (ph.gif) {
          var g = document.createElement("img");
          g.loading = "lazy"; g.alt = s.name; g.src = ph.gif;
          media.appendChild(g);
        } else {
          [["0", "start"], ["1", "end"]].forEach(function (k) {
            var fig = document.createElement("figure");
            var img = document.createElement("img");
            img.loading = "lazy"; img.alt = s.name + " " + k[1];
            img.src = PHOTO_DB + ph.db + "/" + k[0] + ".jpg";
            var cap = document.createElement("figcaption");
            cap.textContent = k[1];
            fig.appendChild(img); fig.appendChild(cap);
            media.appendChild(fig);
          });
        }
        li.appendChild(media);
      }
      var a = document.createElement("a");
      a.className = "demo";
      a.target = "_blank";
      a.rel = "noopener";
      a.href = ytSearch(s.name);
      a.textContent = "watch demo";
      li.appendChild(a);
    }
    el.list.appendChild(li);
  });
  var rowFor = {};
  el.list.querySelectorAll("li[data-i]").forEach(function (li) { rowFor[li.dataset.i] = li; });

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
    for (var k = 0; k < i; k++) { t += SEQ[k].secs; }
    return t;
  }
  function nextWork(i) {
    for (var k = i + 1; k < SEQ.length; k++) { if (SEQ[k].kind === "w") { return SEQ[k]; } }
    return null;
  }
  function announceCurrent() {
    var s = SEQ[idx];
    if (s.kind === "r") {
      var nx = nextWork(idx);
      say(nx ? "Next, " + nx.name : "Almost done", true);
    } else {
      say(s.name, true);
    }
  }

  function render() {
    var s = SEQ[idx];
    el.kind.textContent = s.kind === "r" ? "Rest" : s.section;
    el.name.textContent = s.name;
    el.time.textContent = fmt(remaining);
    el.stage.className = s.kind === "r" ? "trans" : "";
    el.bar.style.background = s.kind === "r" ? "#9ca3af" : "#22d3a6";
    el.bar.style.width = (100 * (s.secs - remaining) / s.secs) + "%";
    var nx = SEQ[idx + 1];
    el.next.textContent = nx ? "Next: " + nx.name + "  (" + fmt(nx.secs) + ")" : "Last one";
    var doneSecs = elapsedBefore(idx) + (s.secs - remaining);
    el.total.textContent = fmt(doneSecs) + " / " + fmt(totalSecs)
      + "   -   step " + (idx + 1) + " of " + SEQ.length;
    for (var i = 0; i < SEQ.length; i++) {
      var li = rowFor[i];
      if (!li) { continue; }
      li.classList.toggle("active", i === idx);
      li.classList.toggle("done", i < idx);
    }
  }

  function advance() {
    if (idx < SEQ.length - 1) {
      idx++;
      remaining = SEQ[idx].secs;
      beep(SEQ[idx].kind === "r" ? 660 : 880, 0.18);
      announceCurrent();
      render();
    } else {
      finish();
    }
  }

  function finish() {
    stop();
    beep(988, 0.25);
    setTimeout(function () { beep(1319, 0.35); }, 200);
    say("Workout complete. Nice work.", true);
    el.kind.textContent = "Done";
    el.name.textContent = "Workout complete";
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
      if (remaining <= 5) {
        beep(remaining === 1 ? 784 : 523, 0.09);
        say(String(remaining), false);
      }
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
    announceCurrent();
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
    if (canSpeak) { window.speechSynthesis.cancel(); }
    idx = 0; remaining = SEQ[0].secs;
    el.start.textContent = "Start";
    el.start.classList.remove("running");
    el.pause.textContent = "Pause";
    render();
  }

  el.start.addEventListener("click", function () {
    if (!ac) { beep(0.001, 0.001); }
    if (canSpeak && el.voice.checked) { say(" ", true); }
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

  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible" && running) { requestWake(); }
  });

  render();
})();
