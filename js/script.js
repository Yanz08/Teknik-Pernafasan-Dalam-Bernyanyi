/* ====================================
   ELEMENTS
==================================== */

const slider =
document.querySelector(
".slider"
);

const slides =
document.querySelectorAll(
".slide"
);

const navbarItems =
document.querySelectorAll(
".navbar li"
);

const indicator =
document.getElementById(
"indicator"
);

const progress =
document.getElementById(
"progress"
);

const timer =
document.getElementById(
"timer"
);

let currentSlide = 0;

const totalSlides =
slides.length;

/* ====================================
   UPDATE SLIDE
==================================== */

function updateSlide(){

slider.style.transform =
`translateX(-${currentSlide * 100}vw)`;

slides.forEach(
slide =>
slide.classList.remove(
"active"
)
);

slides[currentSlide]
.classList.add(
"active"
);

navbarItems.forEach(
item =>
item.classList.remove(
"active"
)
);

if(navbarItems[currentSlide]){

navbarItems[currentSlide]
.classList.add(
"active");

}

indicator.innerHTML =
`${currentSlide + 1} / ${totalSlides}`;

progress.style.width =
`${((currentSlide + 1) / totalSlides) * 100}%`;

if(window.bgManager){

bgManager.update(
currentSlide
);

}

}

/* ====================================
   NEXT
==================================== */

function nextSlide(){

if(
currentSlide <
totalSlides - 1
){

currentSlide++;

updateSlide();

}

}

/* ====================================
   PREVIOUS
==================================== */

function prevSlide(){

if(
currentSlide > 0
){

currentSlide--;

updateSlide();

}

}

/* ====================================
   CLICK SCREEN
==================================== */

document.addEventListener(
"click",
(e)=>{

if(
e.target.closest(".navbar")
) return;

nextSlide();

}
);

/* ====================================
   KEYBOARD
==================================== */

document.addEventListener(
"keydown",
(e)=>{

switch(e.key){

case "ArrowRight":

nextSlide();

break;

case "ArrowDown":

nextSlide();

break;

case " ":

nextSlide();

break;

case "PageDown":

nextSlide();

break;

case "ArrowLeft":

prevSlide();

break;

case "ArrowUp":

prevSlide();

break;

case "PageUp":

prevSlide();

break;

case "Home":

currentSlide = 0;

updateSlide();

break;

case "End":

currentSlide =
totalSlides - 1;

updateSlide();

break;

case "f":

toggleFullscreen();

break;

case "F":

toggleFullscreen();

break;

}

}
);

/* ====================================
   NAVBAR
==================================== */

navbarItems.forEach(
(item,index)=>{

item.addEventListener(
"click",
()=>{

currentSlide =
index;

updateSlide();

}
);

}
);

/* ====================================
   TIMER
==================================== */

let seconds = 0;

function updateTimer(){

seconds++;

const mins =
Math.floor(
seconds / 60
);

const secs =
seconds % 60;

timer.innerHTML =

`${String(mins)
.padStart(2,"0")}
:
${String(secs)
.padStart(2,"0")}`;

}

setInterval(
updateTimer,
1000
);

/* ====================================
   BREATHING TIMER
   SLIDE 8
==================================== */

const breathingCircle =
document.querySelector(
".breathing-timer"
);

let breathingValue = 4;

setInterval(()=>{

if(!breathingCircle)
return;

breathingValue--;

if(
breathingValue < 1
){

breathingValue = 4;

}

breathingCircle.innerHTML =
breathingValue;

},1000);

/* ====================================
   TOUCH SWIPE
==================================== */

let startX = 0;

document.addEventListener(
"touchstart",
e=>{

startX =
e.touches[0].clientX;

}
);

document.addEventListener(
"touchend",
e=>{

const endX =
e.changedTouches[0]
.clientX;

const diff =
startX - endX;

if(diff > 60){

nextSlide();

}

if(diff < -60){

prevSlide();

}

}
);

/* ====================================
   FULLSCREEN TOGGLE
==================================== */

function toggleFullscreen(){

if(
!document.fullscreenElement
){

launchFullscreen();

}
else{

document.exitFullscreen();

}

}

/* ====================================
   FULLSCREEN
==================================== */

function launchFullscreen(){

const elem =
document.documentElement;

if(
elem.requestFullscreen
){

elem.requestFullscreen();

}
else if(
elem.webkitRequestFullscreen
){

elem.webkitRequestFullscreen();

}
else if(
elem.msRequestFullscreen
){

elem.msRequestFullscreen();

}

}

/* ====================================
   INITIALIZE
==================================== */

window.addEventListener(
"load",
()=>{

updateSlide();

});

/* ====================================
   RESTART OPTION
==================================== */

document.addEventListener(
"keydown",
(e)=>{

if(
e.key === "r" ||
e.key === "R"
){

currentSlide = 0;

seconds = 0;

updateSlide();

}

}
);

/* ====================================
   PRESENTATION MODE
==================================== */

console.log(
"Micro Teaching Presentation Ready"
);