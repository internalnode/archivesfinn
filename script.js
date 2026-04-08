var currentIndex = 0;
var bootRunning = false;

function getScreen(index) {
  var screens = document.querySelectorAll(".screen");
  return screens[index] || null;
}

function scrollScreenTop(index) {
  var screen = getScreen(index);
  if (!screen) return;

  screen.scrollTop = 0;

  requestAnimationFrame(function () {
    screen.scrollTop = 0;
  });

  setTimeout(function () {
    screen.scrollTop = 0;
  }, 60);
}

function goTo(index) {
  var track = document.getElementById("track");
  if (!track) return;

  currentIndex = index;
  track.style.transform = "translateX(-" + (index * 25) + "%)";

  scrollScreenTop(index);
}

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

  var glitchCount = 1 + Math.floor(Math.random() * 2);
  for (var g = 0; g < glitchCount; g++) {
    (function(delay) {
      setTimeout(function() {
        overlay.classList.remove("glitch");
        void overlay.offsetWidth;
        overlay.classList.add("glitch");
      }, delay);
    })(180 + Math.floor(Math.random() * 700));
  }

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
        scrollScreenTop(index);
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

function openMission(key) {
  var mission = missions[key];
  if (!mission) return;

  var systemEl = document.getElementById("detailSystemLine");
  var titleEl = document.getElementById("detailMainTitle");
  var subEl = document.getElementById("detailSub");
  var contextEl = document.getElementById("detailContext");
  var outcomeEl = document.getElementById("detailOutcome");
  var timelineEl = document.getElementById("detailTimeline");

  var clearanceEl = document.getElementById("detailClearance");
  var theatreEl = document.getElementById("detailTheatre");
  var riskEl = document.getElementById("detailRisk");

  if (systemEl) systemEl.textContent = mission.system;
  if (titleEl) titleEl.textContent = mission.title;
  if (subEl) subEl.textContent = mission.sub;
  if (clearanceEl) clearanceEl.textContent = mission.clearance || "—";
  if (theatreEl) theatreEl.textContent = mission.theatre || "—";
  if (riskEl) riskEl.textContent = mission.risk || "—";

  if (contextEl) contextEl.textContent = "";
  if (outcomeEl) outcomeEl.textContent = "";
  if (timelineEl) timelineEl.innerHTML = "";

  scrollScreenTop(3);
  bootTo(3);

  setTimeout(function () {
    scrollScreenTop(3);

    typeText(contextEl, mission.context, 8, function () {
      var i = 0;

      function addNext() {
        if (i >= mission.timeline.length) {
          typeText(outcomeEl, mission.outcome, 8, function () {
            scrollScreenTop(3);
          });
          return;
        }

        var li = document.createElement("li");
        timelineEl.appendChild(li);

        typeText(li, mission.timeline[i], 7, function () {
          i++;
          setTimeout(addNext, 60);
        });
      }

      addNext();
    });

  }, 500);
}

window.addEventListener("resize", function () {
  scrollScreenTop(currentIndex);
});

window.onload = function () {
  goTo(0);
  scrollScreenTop(0);
};
