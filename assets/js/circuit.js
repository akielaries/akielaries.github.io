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

  // exercise -> youtube video id for a demo clip (all verified live)
  var VIDEOS = {
    "Cat Cow": "MgDn34q4Hm8",
    "Pelvic Tilts": "JPaiq9wd7ko",
    "Thread The Needle": "oAQ_qycUj5o",
    "Open Books": "rDviWORCWEw",
    "Thoracic Extension w/ Foam Roller": "ulcHUrE37Kw",
    "Thoracic CARs Each Direction (slow)": "2lCochWaW9A",
    "90s / 90s": "_rzJ1RXhM90",
    "Hip CARs Each Direction": "PwxO_Zn4hI4",
    "Worlds Greatest Stretch": "-CiWQ2IvY34",
    "Deep Squat Holds (explore)": "0wzrgyAurT8",
    "Couch Stretch": "-rsIS-wl-ig",
    "Shoulder CARs": "2hyNG1U5wYs",
    "Scapular Push ups": "LeMk15TN0No",
    "Band Pull Aparts": "smSSXITNpCI",
    "External Rotation": "_UvmPNGtlPM",
    "Wrist CARs": "KdM1KlmVgek",
    "Forward Wrist Rocks": "V8X-LDd8HF8",
    "Backwards Wrist Rocks": "bh5yWtpst94",
    "Side 2 Side Wrist Rocks": "k-MdBk0L6yw",
    "ATG Squat Hold": "g6KrlrOq4mw",
    "Cossack Squat": "JaCbmoDqUc4",
    "Jefferson Curls": "YGlAdtSKQaU",
    "Hanging Scapular Shrug": "w6xP2MWfG78",
    "Spanish Squats": "3igyh6eqGvc",
    "Tibialis Raises": "mmLnKYwdDMM",
    "Standing Calf Raises": "EmyjIRHl3CU",
    "Single Leg Calf Raises": "u1Yc75YdiJA",
    "Wrist Flexor/Extensor Strength": "eOYwu-dHAD4",
    "Finger Extensions": "rbV3rOvKUZM",
    "Single Leg Balance": "Dtgh2_LFkBQ",
    "Eyes Closed Single Leg Balance": "4HtOeds_vyw",
    "Short Foot Exercise": "m1lkcg8p-48",
    "Toe Yoga": "QkrwfbtUzyU",
    "Farmer Carry": "lLAw6fUccKA"
  };

  // exercise -> free-exercise-db folder (real start/end position photos)
  var PHOTO_BASE = "https://cdn.jsdelivr.net/gh/yuhonas/free-exercise-db@main/exercises/";
  var PHOTOS = {
    "Cat Cow": "Cat_Stretch",
    "Pelvic Tilts": "Pelvic_Tilt_Into_Bridge",
    "Deep Squat Holds (explore)": "Bodyweight_Squat",
    "Band Pull Aparts": "Band_Pull_Apart",
    "External Rotation": "External_Rotation_with_Band",
    "Standing Calf Raises": "Standing_Calf_Raises",
    "Farmer Carry": "Farmers_Walk"
  };
  function photoUrl(name, n) { return PHOTO_BASE + PHOTOS[name] + "/" + n + ".jpg"; }

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
    voice: document.getElementById("cc-voice"),
    list: document.querySelector("#cc-list ol"),
    modal: document.getElementById("cc-modal"),
    mtitle: document.getElementById("cc-mtitle"),
    msub: document.getElementById("cc-msub"),
    mbody: document.getElementById("cc-mbody"),
    yt: document.getElementById("cc-yt"),
    close: document.getElementById("cc-close")
  };

  if (!el.start) { return; }

  function fmt(s) {
    var m = Math.floor(s / 60), r = s % 60;
    return (m < 10 ? "0" : "") + m + ":" + (r < 10 ? "0" : "") + r;
  }

  function ytSearch(name) {
    return "https://www.youtube.com/results?search_query=" + encodeURIComponent(name + " exercise how to");
  }

  // speech synthesis, muted via the voice checkbox
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

  // build the list; work rows are tappable and open the detail sheet
  SEQ.forEach(function (s, i) {
    var li = document.createElement("li");
    li.className = s[2] === "t" ? "transition" : s[2] === "s" ? "section" : "work";
    li.dataset.i = i;

    if (s[2] === "w") {
      var thumb;
      if (PHOTOS[s[0]]) {
        thumb = document.createElement("img");
        thumb.className = "thumb";
        thumb.loading = "lazy";
        thumb.alt = s[0];
        thumb.src = photoUrl(s[0], 0);
      } else {
        thumb = document.createElement("span");
        thumb.className = "thumb ph";
        thumb.textContent = VIDEOS[s[0]] ? "▶" : "·";
      }
      li.appendChild(thumb);
    }

    var n = document.createElement("span");
    n.className = "n";
    n.textContent = s[0];
    li.appendChild(n);

    var d = document.createElement("span");
    d.className = "d";
    d.textContent = fmt(s[1]);
    li.appendChild(d);

    if (s[2] === "w") {
      var go = document.createElement("span");
      go.className = "go";
      go.textContent = "›";
      li.appendChild(go);
      li.addEventListener("click", function () { openDetail(s[0]); });
    }

    el.list.appendChild(li);
  });
  var liEls = el.list.querySelectorAll("li");

  // detail sheet: big photos + inline video, plays inside the page
  function openDetail(name) {
    el.mtitle.textContent = name;
    el.msub.textContent = PHOTOS[name] ? "Start and end position, plus a demo." : "Demo video.";
    el.yt.href = ytSearch(name);
    el.mbody.innerHTML = "";

    if (PHOTOS[name]) {
      var wrap = document.createElement("div");
      wrap.id = "cc-photos";
      [["0", "start"], ["1", "end"]].forEach(function (p) {
        var fig = document.createElement("figure");
        var img = document.createElement("img");
        img.src = photoUrl(name, p[0]);
        img.alt = name + " " + p[1];
        var cap = document.createElement("figcaption");
        cap.textContent = p[1];
        fig.appendChild(img);
        fig.appendChild(cap);
        wrap.appendChild(fig);
      });
      el.mbody.appendChild(wrap);
    }

    var vid = VIDEOS[name];
    if (vid) {
      var iframe = document.createElement("iframe");
      iframe.id = "cc-video";
      iframe.src = "https://www.youtube-nocookie.com/embed/" + vid + "?playsinline=1&rel=0";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      el.mbody.appendChild(iframe);
    } else if (!PHOTOS[name]) {
      var p = document.createElement("div");
      p.className = "nomedia";
      p.textContent = "No demo saved for this one — use the search button below.";
      el.mbody.appendChild(p);
    }

    el.modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDetail() {
    el.modal.classList.remove("open");
    el.mbody.innerHTML = "";  // unloads the iframe so audio stops
    document.body.style.overflow = "";
  }

  el.close.addEventListener("click", closeDetail);
  el.modal.addEventListener("click", function (e) {
    if (e.target === el.modal) { closeDetail(); }
  });

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

  // cleaned-up spoken form for the announcer
  function spoken(name) {
    return name
      .replace("w/", "with")
      .replace("CARs", "cars")
      .replace("90s / 90s", "nineties")
      .replace("WGS", "world's greatest stretch")
      .replace("2", "to");
  }

  function announceCurrent() {
    var s = SEQ[idx];
    if (s[2] === "t") {
      var nx = SEQ[idx + 1];
      say(nx ? "Next up, " + spoken(nx[0]) : "Last one", true);
    } else {
      say(spoken(s[0]), true);
    }
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
  }

  function advance() {
    if (idx < SEQ.length - 1) {
      idx++;
      remaining = SEQ[idx][1];
      beep(SEQ[idx][2] === "t" ? 660 : 880, 0.18);
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
    say("Circuit complete. Nice work.", true);
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
    idx = 0; remaining = SEQ[0][1];
    el.start.textContent = "Start";
    el.start.classList.remove("running");
    el.pause.textContent = "Pause";
    render();
  }

  el.start.addEventListener("click", function () {
    if (!ac) { beep(0.001, 0.001); }
    // prime speech inside the user gesture so ios lets it talk later
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
