var currentIndex = 0;
var bootRunning = false;
var terminalLocked = false;

var loadingPresets = {
  login: {
    title: "BOOT SEQUENCE // SESSION AUTHENTICATION",
    lines: [
      "INITIALIZING SECURE SESSION...",
      "VERIFYING ACCESS TOKEN...",
      "CONNECTING TO INTERNAL NODE...",
      "MOUNTING OPERATOR FILE...",
      "SESSION VALIDATED."
    ]
  },

  operations: {
    title: "ARCHIVE ACCESS // OPERATIONS REGISTRY",
    lines: [
      "CLOSING OPERATOR FILE VIEW...",
      "REQUESTING ARCHIVE ACCESS...",
      "VERIFYING CLEARANCE LEVEL...",
      "MOUNTING OPERATIONS REGISTRY...",
      "ARCHIVE READY."
    ]
  },

  operationsReturn: {
    title: "ARCHIVE ACCESS // OPERATIONS REGISTRY",
    lines: [
      "CLOSING MISSION FILE...",
      "RETURNING TO ARCHIVE INDEX...",
      "VERIFYING SESSION INTEGRITY...",
      "RESTORING OPERATIONS REGISTRY...",
      "ARCHIVE READY."
    ]
  },

  operator: {
    title: "PROFILE ACCESS // OPERATOR FILE",
    lines: [
      "CLOSING ARCHIVE VIEW...",
      "RESTORING OPERATOR FILE...",
      "VERIFYING LOCAL SESSION...",
      "LOADING PERSONNEL RECORD...",
      "OPERATOR FILE READY."
    ]
  },

  missionDefault: {
    title: "FILE ACCESS // OPERATION DOSSIER",
    lines: [
      "REQUESTING MISSION FILE...",
      "DECRYPTING ARCHIVED ENTRY...",
      "VERIFYING DOCUMENT INTEGRITY...",
      "LOADING FIELD REPORT...",
      "MISSION FILE READY."
    ]
  },

  mission_nightfall: {
    title: "FILE ACCESS // NIGHTFALL",
    lines: [
      "REQUESTING NIGHTFALL ARCHIVE...",
      "VERIFYING BLACK CLEARANCE...",
      "DECRYPTING URBAN FIELD REPORT...",
      "RESTORING EXFILTRATION TIMELINE...",
      "NIGHTFALL FILE READY."
    ]
  },

  mission_blackridge: {
    title: "FILE ACCESS // BLACKRIDGE",
    lines: [
      "REQUESTING BLACKRIDGE ARCHIVE...",
      "VERIFYING RESTRICTED CLEARANCE...",
      "MOUNTING MOUNTAIN SURVEILLANCE LOGS...",
      "RESTORING SITE NEUTRALIZATION REPORT...",
      "BLACKRIDGE FILE READY."
    ]
  },

  mission_silent_echo: {
    title: "FILE ACCESS // SILENT ECHO",
    lines: [
      "REQUESTING SILENT ECHO ARCHIVE...",
      "VERIFYING BLACK CLEARANCE...",
      "DECRYPTING SEALED SUBTERRANEAN ENTRY...",
      "RESTORING COMPARTMENTED INCIDENT LOG...",
      "SILENT ECHO FILE READY."
    ]
  },

  mission_cold_veil: {
    title: "FILE ACCESS // COLD VEIL",
    lines: [
      "REQUESTING COLD VEIL ARCHIVE...",
      "VERIFYING MARITIME ACCESS CHANNEL...",
      "DECRYPTING PORT INTERCEPTION REPORT...",
      "RESTORING COASTAL EXTRACTION TIMELINE...",
      "COLD VEIL FILE READY."
    ]
  },

  mission_iron_harbor: {
    title: "FILE ACCESS // IRON HARBOR",
    lines: [
      "REQUESTING IRON HARBOR ARCHIVE...",
      "VERIFYING RESTRICTED CLEARANCE...",
      "MOUNTING LOGISTICS SURVEILLANCE RECORDS...",
      "RESTORING INTERCEPTION AND SEIZURE LOG...",
      "IRON HARBOR FILE READY."
    ]
  },

  mission_ember_fall: {
    title: "FILE ACCESS // EMBER FALL",
    lines: [
      "REQUESTING EMBER FALL ARCHIVE...",
      "VERIFYING BLACK CLEARANCE...",
      "DECRYPTING INDUSTRIAL SABOTAGE REPORT...",
      "RESTORING DELAYED FAILURE ASSESSMENT...",
      "EMBER FALL FILE READY."
    ]
  },

  default: {
    title: "BOOT SEQUENCE // SESSION AUTHENTICATION",
    lines: [
      "INITIALIZING SECURE SESSION...",
      "VERIFYING ACCESS TOKEN...",
      "CONNECTING TO INTERNAL NODE...",
      "MOUNTING ARCHIVE REGISTRY...",
      "SESSION VALIDATED."
    ]
  }
};

function getMissionPresetName(key) {
  var presetName = "mission_" + key;
  if (loadingPresets[presetName]) return presetName;
  return "missionDefault";
}

function getScrollBox(index) {
  var screens = document.querySelectorAll(".screen");
  if (!screens[index]) return null;
  return screens[index].querySelector(".screen-scroll");
}

function scrollScreenTop(index) {
  var scrollBox = getScrollBox(index);
  if (!scrollBox) return;

  scrollBox.scrollTop = 0;

  requestAnimationFrame(function () {
    scrollBox.scrollTop = 0;
  });

  setTimeout(function () {
    scrollBox.scrollTop = 0;
  }, 60);
}

function goTo(index) {
  if (terminalLocked) return;

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

function resetShutdown() {
  var ids = ["shutdownLine1", "shutdownLine2", "shutdownLine3", "shutdownLine4", "shutdownLine5"];
  for (var i = 0; i < ids.length; i++) {
    var el = document.getElementById(ids[i]);
    if (el) {
      el.classList.remove("visible");
      el.textContent = "";
    }
  }

  var finalEl = document.getElementById("shutdownFinal");
  if (finalEl) {
    finalEl.classList.remove("visible");
  }
}

function ensureCrtFlash() {
  var viewport = document.querySelector(".viewport");
  if (!viewport) return null;

  var existing = document.getElementById("crtFlash");
  if (existing) return existing;

  var flash = document.createElement("div");
  flash.id = "crtFlash";
  flash.className = "crt-flash";
  viewport.appendChild(flash);
  return flash;
}

function playCrtShutdownEffect() {
  var viewport = document.querySelector(".viewport");
  var flash = ensureCrtFlash();

  if (!viewport || !flash) return;

  flash.classList.remove("active");
  viewport.classList.remove("crt-off");

  void flash.offsetWidth;

  flash.classList.add("active");

  setTimeout(function () {
    viewport.classList.add("crt-off");
  }, 120);
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

function bootTo(index, presetName) {
  if (terminalLocked) return;
  if (bootRunning) return;
  if (index === currentIndex) return;

  var overlay = document.getElementById("loadingOverlay");
  var bar = document.getElementById("progressBar");
  var titleEl = document.getElementById("loadingTitle");

  if (!overlay || !bar) {
    goTo(index);
    return;
  }

  var preset = loadingPresets[presetName] || loadingPresets.default;
  var lines = preset.lines;
  var ids = ["line1", "line2", "line3", "line4", "line5"];
  var progress = [18, 39, 62, 84, 100];
  var currentLine = 0;

  if (titleEl) {
    titleEl.textContent = preset.title;
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

  function writeNextLine() {
    if (currentLine >= lines.length) {
      setTimeout(function () {
        if (!terminalLocked) {
          goTo(index);
        }
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
  if (terminalLocked) return;

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
  bootTo(3, getMissionPresetName(key));

  setTimeout(function () {
    if (terminalLocked) return;

    scrollScreenTop(3);

    typeText(contextEl, mission.context, 8, function () {
      var i = 0;

      function addNext() {
        if (terminalLocked) return;

        if (i >= mission.timeline.length) {
          typeText(outcomeEl, mission.outcome, 8);
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

function lockTerminalPermanently() {
  terminalLocked = true;
  document.body.classList.add("terminal-dead");

  var app = document.querySelector(".app");
  if (app) {
    app.style.pointerEvents = "none";
  }
}

function terminateSession() {
  if (terminalLocked || bootRunning) return;

  var shutdownOverlay = document.getElementById("shutdownOverlay");
  if (!shutdownOverlay) return;

  lockTerminalPermanently();
  resetShutdown();

  shutdownOverlay.classList.add("active");
  shutdownOverlay.setAttribute("aria-hidden", "false");

  var lines = [
    "CLOSING ACTIVE SESSION...",
    "REVOKING OPERATOR ACCESS...",
    "UNMOUNTING ARCHIVE REGISTRY...",
    "SEALING INTERNAL NODE...",
    "SYSTEM SHUTDOWN CONFIRMED."
  ];

  var ids = ["shutdownLine1", "shutdownLine2", "shutdownLine3", "shutdownLine4", "shutdownLine5"];
  var currentLine = 0;

  function writeNextShutdownLine() {
    if (currentLine >= lines.length) {
      var finalEl = document.getElementById("shutdownFinal");
      if (finalEl) {
        setTimeout(function () {
          finalEl.classList.add("visible");
        }, 120);
      }

      setTimeout(function () {
        playCrtShutdownEffect();
      }, 1200);

      return;
    }

    var el = document.getElementById(ids[currentLine]);
    if (!el) {
      currentLine++;
      writeNextShutdownLine();
      return;
    }

    el.classList.add("visible");

    typeText(el, lines[currentLine], 18, function () {
      currentLine++;
      setTimeout(writeNextShutdownLine, 180);
    });
  }

  writeNextShutdownLine();
}

window.addEventListener("resize", function () {
  if (!terminalLocked) {
    scrollScreenTop(currentIndex);
  }
});

document.addEventListener("click", function (event) {
  if (!terminalLocked) return;

  var shutdownOverlay = document.getElementById("shutdownOverlay");
  if (shutdownOverlay && shutdownOverlay.contains(event.target)) {
    event.preventDefault();
    event.stopPropagation();
  }
}, true);

document.addEventListener("keydown", function (event) {
  if (!terminalLocked) return;
  event.preventDefault();
}, true);

window.onload = function () {
  goTo(0);
  scrollScreenTop(0);
};