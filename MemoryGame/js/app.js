// Get cards
let card = document.getElementsByClassName("card");
let cards = [...card]

// deck of all cards in game
const deck = document.getElementById("card-deck");

// Move variable
let moves = 0;
let counter = document.querySelector(".moves");

// Star icon
const stars = document.querySelectorAll(".fa-star");

// list of matched cards 
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon 
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("popup1")

 // array for opened cards
var cardsOpened = [];

let infoBtn=document.getElementById('info');

// shuffles cards
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// shuffels cards when page loads
window.onload = function() {
    document.getElementById("my_audio").play();
}
document.body.onload = startGame();


// start game
function startGame(){
    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    minute = 0;
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


// display card 
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// opened card match or unmatch
function openCard() {
    cardsOpened.push(this);
    var numberOfCardsOpened = cardsOpened.length;
    if(numberOfCardsOpened === 2){
        numberOfMoves();
        if(cardsOpened[0].type === cardsOpened[1].type){
            cardsMatch();
        } else {
            cardsUnMatch();
        }
    }
};


// when cards match keep the cards open
function cardsMatch(){
    cardsOpened[0].classList.add("match", "disabled");
    cardsOpened[1].classList.add("match", "disabled");
    cardsOpened[0].classList.remove("show", "open", "no-event");
    cardsOpened[1].classList.remove("show", "open", "no-event");
    cardsOpened = [];
}


//when cards don't match disbale and unambe the cards
function cardsUnMatch(){
    cardsOpened[0].classList.add("unmatched");
    cardsOpened[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        cardsOpened[0].classList.remove("show", "open", "no-event","unmatched");
        cardsOpened[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        cardsOpened = [];
    },1100);
}


// disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// enable cards which are unmatched
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// count players moves
function numberOfMoves(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// Game timer
var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// Congratulations message
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


//close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


//for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", openCard);
    card.addEventListener("click",congratulations);
};


// info button alert
infoBtn.addEventListener('click', info);
  function info() {
    alert('Grading System: \n\n\
    0-8 Moves = Great! \n\
    8-12 Moves = Average \n\
    12+ Moves = Poor...  \
    ');
  }


  function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}



