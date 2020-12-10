var points = 0;
var inc = 1;
var rest = false;
var count = 0;
var studyTime;
var restTime;
var paused = true;
var intense = true;

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
var timer2 = new Timer(increment, 1000 / inc, -1);

window.addEventListener("focus", function(event) 
{ 
   if(!rest && intense){
      paused = false;
   }
}, false);

window.addEventListener("blur", function(event) 
{ 
   if(!rest && intense){
      paused = true;
   }
}, false);

function intenseMode(){
   intense = !intense;
}

function initTimer(study, rest) {
  studyTime = study * 60;
  restTime = rest * 60;
  document.getElementById("ppm").innerHTML = (inc/10).toFixed(2) + " points/sec";
  count = studyTime;
  document.getElementById("timer").innerHTML =
    Math.trunc(count / 60) + "m " + (count % 60) + "s ";
}

function startTimer() {
  if (!paused) {
   document.getElementById("timer").innerHTML =
    Math.trunc(count / 60) + "m " + (count % 60) + "s ";
    if (count <= 0) {
      if (rest) {
        rest != rest;
        count = studyTime;
        document.getElementById("rest").innerHTML = "Study Time";
         alert("Study!");
      } else {
        rest != rest;
        count = restTime;
        document.getElementById("rest").innerHTML = "Resting Time";
        alert("Take a nice walk");
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
  paused = false
  pauseTimer();
  if (rest) {
    count = studyTime;
    rest = false;
  } else {
    count = restTime;
    rest = true;
  }
  document.getElementById("timer").innerHTML =
    Math.trunc(count / 60) + "m " + (count % 60) + "s ";
}

function increment() {
  if(!paused){
    points++;
    document.getElementById("points").innerHTML = points + " points";
  }
}

function upgrade(cost, num) {
  if (points >= cost) {
    inc += num;
    points -= cost;
    timer2 = new Timer(increment, 1000 / inc, -1);
  }
  document.getElementById("ppm").innerHTML = (inc/10).toFixed(2) + " points/sec";
  document.getElementById("points").innerHTML = points + " points";
}

