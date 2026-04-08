var currentIndex = 0;
var bootRunning = false;

/* =========================
   GESTION SCROLL INTELLIGENT
========================= */

function updateScrollLock() {
  var screens = document.querySelectorAll(".screen");
  if (!screens.length || !screens[currentIndex]) return;

  var activeScreen = screens[currentIndex];
  var card = activeScreen.querySelector(".card") || activeScreen;

  var contentHeight = card.scrollHeight;
  var viewportHeight = window.innerHeight;

  if (contentHeight <= viewportHeight - 10) {
    document.documentElement.style.overflowY = "hidden";
    document.body.style.overflowY = "hidden";
  } else {
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
  }
}

function forceScrollTop() {
  window.scrollTo(0, 0);
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  requestAnimationFrame(() => window.scrollTo(0, 0));
}

/* =========================
   NAVIGATION
========================= */

function goTo(index) {
  var track = document.getElementById("track");
  if (!track) return;

  currentIndex = index;
  track.style.transform = "translateX(-" + (index * 25) + "%)";

  forceScrollTop();

  setTimeout(updateScrollLock, 60);
}

/* =========================
   LOADING
========================= */

function resetLoading() {
  var bar = document.getElementById("progressBar");
  if (bar) bar.style.width = "0%";

  var ids = ["line1", "line2", "line3", "line4", "line5"];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el) {
      el.classList.remove("visible");
      el.textContent = "";
    }
  }
}

function typeText(element, text, speed, callback) {
  if (!element) {
    if (callback) callback();
    return;
  }

  element.textContent = "";
  var i = 0;

  function step() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(step, speed);
    } else if (callback) {
      callback();
    }
  }

  step();
}

function bootTo(index) {
  if (bootRunning) return;
  if (index === currentIndex) return;

  var overlay = document.getElementById("loadingOverlay");
  var bar = document.getElementById("progressBar");

  if (!overlay || !bar) {
    goTo(index);
    return;
  }

  bootRunning = true;
  resetLoading();
  overlay.classList.add("active");

  var lines = [
    "INITIALIZING SECURE SESSION...",
    "VERIFYING ACCESS TOKEN...",
    "CONNECTING TO INTERNAL NODE...",
    "MOUNTING ARCHIVE REGISTRY...",
    "SESSION VALIDATED."
  ];

  var ids = ["line1", "line2", "line3", "line4", "line5"];
  var progress = [18, 39, 62, 84, 100];
  var currentLine = 0;

  function writeNextLine() {
    if (currentLine >= lines.length) {
      setTimeout(function () {
        goTo(index);
        overlay.classList.remove("active");
        bootRunning = false;

        forceScrollTop();
        updateScrollLock();

      }, 260);
      return;
    }

    var el = document.getElementById(ids[currentLine]);
    if (!el) {
      currentLine++;
      writeNextLine();
      return;
    }

    el.classList.add("visible");

    typeText(el, lines[currentLine], 14, function () {
      bar.style.width = progress[currentLine] + "%";
      currentLine++;
      setTimeout(writeNextLine, 90);
    });
  }

  writeNextLine();
}

/* =========================
   MISSIONS
========================= */

function openMission(key) {
  var mission = missions[key];
  if (!mission) return;

  document.getElementById("detailSystemLine").textContent = mission.system;
  document.getElementById("detailMainTitle").textContent = mission.title;
  document.getElementById("detailSub").textContent = mission.sub;
  document.getElementById("detailClearance").textContent = mission.clearance || "—";
  document.getElementById("detailTheatre").textContent = mission.theatre || "—";
  document.getElementById("detailRisk").textContent = mission.risk || "—";

  var contextEl = document.getElementById("detailContext");
  var outcomeEl = document.getElementById("detailOutcome");
  var timelineEl = document.getElementById("detailTimeline");

  contextEl.textContent = "";
  outcomeEl.textContent = "";
  timelineEl.innerHTML = "";

  bootTo(3);

  setTimeout(function () {
    forceScrollTop();
    updateScrollLock();

    typeText(contextEl, mission.context, 8, function () {

      var i = 0;

      function addNext() {
        if (i >= mission.timeline.length) {
          typeText(outcomeEl, mission.outcome, 8, updateScrollLock);
          return;
        }

        var li = document.createElement("li");
        timelineEl.appendChild(li);

        typeText(li, mission.timeline[i], 7, function () {
          i++;
          updateScrollLock();
          setTimeout(addNext, 60);
        });
      }

      addNext();
    });

  }, 500);
}

/* =========================
   INIT
========================= */

window.addEventListener("resize", updateScrollLock);

window.onload = function () {
  goTo(0);
  forceScrollTop();
  updateScrollLock();
};
