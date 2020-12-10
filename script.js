var points = 0;
var inc = 1;
var rest = false;
var count = 0;
var studyTime;
var restTime;
var paused = true;
var intense = false;
var costs = Array(
  10,
  100,
  5000,
  100000,
  5000000,
  10000000,
  500000000,
  1000000000,
  5000000000
);

var costAbbrev = Array(
  10,
  100,
  5000,
  100000,
  "5M",
  "10M",
  "500M",
  "1B",
  "5B"
);
var prestige = 0;
var colors = [
  ["#A9EAFF", "#CADAED", "#f7f4f4", "#000000"],
  ["#717744", "#BCBD8B","#D4EAC8", "#000000"],
  ["#5ADB71", "#3B8F4A", "#252B2B", "#ffffff"],
  ["#8A817C", "#BCB8B1", "#F4F3EE", "#000000"]
]
var messages = Array(
  "You've made your first prestige! Three mor to go",
  "You've made it to USC, you totally deserve it! Now grind those leetcode challenges and get that dream job",
  "In your leetcode haze, you forgot to make any friends or connections, and end up jobless. It's okay though, you're a self starter!",
  "You wake up. No one actually passes CS104, that's impossible."
);
var names = [
  [
    "ok-ish",
    "ok",
    "gud",
    "gudr",
    "better",
    "gr8",
    "best",
    "pro",
    "proest"
  ],
  [
    "Volunteer",
    "Create Club",
    "Add AP Class",
    "Buy Stolen Answers",
    "Forge Essay",
    "Find Cancer Cure",
    "Have Legacy Relative",
    "Donate $500,000",
    '"Join" Rowing Team'
  ],
  [
    "Hire Asswin",
    "Hire Hertzog",
    "Hire Judy",
    "Hire Gandhi",
    "Hire Cote",
    "Hire JeffreyMillerPHD",
    "Hire Everyone in SAL",
    "Hire Redekopp",
    "0 Offers, Start a Startup"
  ],
  [
    "Hire Intern",
    "Find Investors",
    "Create Sweatshops",
    "Takeover Companies",
    "Buyout Politicians",
    "Topple Governments",
    "Enslave Countries",
    "Pass 104 w/ a C-",
    "Wake Up"
  ]
];
var pointName = Array("points", "% Admission Chance", " Leetcode Challenges Done", " $");

function Timer(funct, delayMs, times) {
  if (times == undefined) {
    times = -1;
  }
  if (delayMs == undefined) {
    delayMs = 10;
  }
  this.funct = funct;
  var times = times;
  var timesCount = 0;
  var ticks = (delayMs / 10) | 0;
  var count = 0;

  Timer.instances.push(this);

  this.tick = function() {
    if (count >= ticks) {
      this.funct();
      count = 0;
      if (times > -1) {
        timesCount++;
        if (timesCount >= times) {
          this.stop();
        }
      }
    }
    count++;
  };

  this.stop = function() {
    var index = Timer.instances.indexOf(this);
    Timer.instances.splice(index, 1);
  };
}

Timer.instances = [];

Timer.ontick = function() {
  for (var i in Timer.instances) {
    Timer.instances[i].tick();
  }
};

var t = window.setInterval(Timer.ontick, 10);

var timer = new Timer(startTimer, 1000, -1);
var timer2 = new Timer(increment, 10000.0/inc, -1);

function intenseMode() {
  intense = document.getElementById("defaultUnchecked2").checked;
}

function initTimer() {
  var queryString = decodeURIComponent(window.location.search);
  queryString = queryString.substring(1);
  var queries = queryString.split("&");
  studyTime = queries[0] * 60;
  restTime = queries[1] * 60;
  intense = queries[2];
  count = studyTime;
  document.getElementById("ppm").innerHTML =
    (inc / 10).toFixed(2) + " " + pointName[prestige] + " / s";
  document.getElementById("points").innerHTML =
    points + " " + pointName[prestige];
  document.getElementById("timer").innerHTML =
    Math.trunc(count / 60) + "m " + (count % 60) + "s ";
  for (var i = 0; i < 8; i++) {
    document.getElementById(i).innerHTML =
      names[prestige][i] + "(" + costAbbrev[i] + ")";
  }
  document.getElementById("time").style = "background-color: " + colors[prestige][0];
  document.getElementById("pp").style = "color: " + colors[prestige][3];
  //document.getElementById('btn btn-light btns').style = "background-color: " + colors[prestige][0];
  document.body.style.background = colors[prestige][2];
  document.getElementById(8).innerHTML = names[prestige][8] + "(Prestige)";
  if(intense === "true"){  
    window.addEventListener(
      "focus",
      function(event) {
        if (!rest && intense === "true" && paused) {
          paused = false;
        }
      },
      false
    );

    window.addEventListener(
      "blur",
      function(event) {
        if(!rest && intense === "true" && !paused) {
          paused = true;
        }
      },
      false
    );
  }
}

function startTimer() {
  if (!paused) {
    document.getElementById("timer").innerHTML =
      Math.trunc(count / 60) + "m " + (count % 60) + "s";
    if (count == 0) {
      if (rest) {
        rest = !rest;
        count = studyTime;
        alert("Study!");
        document.getElementById("time").style = "background-color: " + colors[prestige][0];
      } else {
        rest = !rest;
        count = restTime;
        alert("Break Time!");
        document.getElementById("time").style = "background-color:  " + colors[prestige][1];
      }
    } else {
      count--;
    }
  }
}

function pauseTimer() {
  paused = !paused;
  if (!paused) document.getElementById("pause").innerHTML = "Pause";
  else document.getElementById("pause").innerHTML = "Start";
}

function resetTimer() {
  paused = false;
  pauseTimer();
  if (!rest) {
    count = studyTime;
  } else {
    count = restTime;
  }
  document.getElementById("timer").innerHTML =
    Math.trunc(count / 60) + "m " + (count % 60) + "s";
}

function increment() {
  if (!paused) {
    points++;
    document.getElementById("points").innerHTML = points + pointName[prestige];
  }
  if (points >= costs[8]) {
    document.getElementById("8").style.visibility = "visible";
  } else {
    document.getElementById("8").style.visibility = "hidden";
  }
}

function upgrade(num, val) {
  if (points >= costs[num]) {
    timer2 = null;
    window.clearInterval(t);
    inc += val * Math.pow(1.4, prestige);
    points -= costs[num];
    costs[num] = Math.trunc(costs[num] * 1.6);
    document.getElementById(num).innerHTML =
      names[prestige][num] + "(" + costs[num] + ")";
    t = window.setInterval(Timer.ontick, 10);
    timer2 = new Timer(increment, 10000.0/inc, -1);

  }
  document.getElementById("ppm").innerHTML =
    (inc / 3).toFixed(2) + " " + pointName[prestige] + " / s";
  document.getElementById("points").innerHTML =
    points + " " + pointName[prestige];

}

function prestigeUp() {
  if (points >= costs[8]) {
    alert(messages[prestige]);
    prestige += 1;
    points = 0;
    inc = 10;
    rest = false;
    count = 0;
    costs[8] *= 2;
    if (prestige == 4) {
      prestige = 0;
      costs[8] /= 8;
    }
    document.getElementById("8").style.visibility = "hidden";
    initTimer();
  }
}

function autoprestige() {
  points = 5000000000 * Math.pow(2, prestige);
  document.getElementById("points").innerHTML = points + pointName[prestige];
  if (points >= costs[8]) {
    document.getElementById("8").style.visibility = "visible";
  } 
}

function add(){
  points += 10000000;
  document.getElementById("points").innerHTML = points + pointName[prestige];

}


