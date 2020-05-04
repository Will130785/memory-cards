import "./scss/main.scss";
import battery from "./img/battery.png";
import camera from "./img/camera.png";
import cloud from "./img/cloud.png";
import compass from "./img/compass.png";
import heart from "./img/heart.png";
import phone from "./img/phone.png";
import star from "./img/star.png";
import television from "./img/television.png";


//UI variables
const startBtn = document.querySelector(".start");
const cards = document.querySelectorAll(".card-container");
const cardBox = document.querySelectorAll(".card");
const moveDisplay = document.querySelector(".move-display");
const minDisplay = document.querySelector(".mins");
const secDisplay = document.querySelector(".secs");
const statusDisplay = document.querySelector(".status");


//Gameplay variables
let cardDeck = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let compare = [];
let matchTracker = 0;
let moves = 0;
let gameActive = 0;

//Timer variables
let secs = 0;
let mins = 0;
let clock;

//Function to shuffle cards
const shuffle = array => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
    
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }
    return array;
};

//Timer function
const timer = () => {
    
    clock = setInterval(function() {
        //Check if seconds are equal to 50 and set to -1
        if(secs === 59) {
            secs = -1; // Next increment will display as 0
            //Add to minutes
            mins ++;

        }
        //add to seconds and display in UI
        secs++;
        secDisplay.innerHTML = secs;
        minDisplay.innerHTML = mins;

    }, 1000);
};






//Start button event listener
startBtn.addEventListener("click", e => {
    //Shuffle cards and reset all game UI's
    let deck = shuffle(cardDeck);
    gameActive = 1;
    compare = [];
    matchTracker = 0;
    moves = 0;
    secs = 0;
    mins = 0;
    secDisplay.innerHTML = secs;
    minDisplay.innerHTML = mins;
    statusDisplay.textContent = "Game commenced!!";
    moveDisplay.innerHTML = moves;
    clearInterval(clock);
    timer();

    //Loop through card container and apply styles
    cardBox.forEach((card, index) => {
        card.style.backgroundColor = "#2e3d49";
        card.style.visibility = "visible";
        card.style.boxShadow = "0 .2rem .2rem .2rem rgba(0, 0, 0, .5)"
    });

    //Loop through inner card and apply styles and images
    cards.forEach((card, index) => {

        card.style.display = "flex";
        card.style.opacity = "0";
        
        //Declare html variable
        let html;

        //Test which deck index is assigned to each card
        if(deck[index] === 1) {

        html = `
            <img class="icon" src="${battery}">
            <span class="card-id">1</span>
            `
        } else if(deck[index] === 2) {
            html = `
            <img class="icon" src="${camera}">
            <span class="card-id">2</span>
             `
        } else if(deck[index] === 3) {
            html = `
            <img class="icon" src="${cloud}">
            <span class="card-id">3</span>
             `
        } else if(deck[index] === 4) {
            html = `
            <img class="icon" src="${compass}">
            <span class="card-id">4</span>
             `
        } else if(deck[index] === 5) {
            html = `
            <img class="icon" src="${heart}">
            <span class="card-id">5</span>
             `
        } else if(deck[index] === 6) {
            html = `
            <img class="icon" src="${phone}">
            <span class="card-id">6</span>
             `
        } else if(deck[index] === 7) {
            html = `
            <img class="icon" src="${star}">
            <span class="card-id">7</span>
             `
        } else if(deck[index] === 8) {
            html = `
            <img class="icon" src="${television}">
            <span class="card-id">8</span>
             `
        };


        //Apply html to card
        card.innerHTML = html;
    });
});


//Event listener for cards
cards.forEach((card, index) => {

    card.addEventListener("click", e => {

        //Check game is active
        if(gameActive === 1) {

            //Chaeck all cards have not been matched
            if(matchTracker < 8) {
            //Create card object and take card number and index number from selected card
            let cardObj = {
                card: card.textContent.trim(),
                id: index
          }
            //Push card object to comparrison array
            compare.push(cardObj);
            card.style.opacity = "1";


        //Test to see if there has been a match
        if(compare.length === 2 && compare[0].card === compare[1].card) {

            //If user clicks same card, alert that they can not do this and pop the card off the compare array
            if(compare[0].id === compare[1].id) {
                statusDisplay.innerHTML = "You can't pick the same card twice";
                compare.pop();
            } else {
            //If match
            //Alert that there has been a match
            statusDisplay.innerHTML = "You matched a pair!!";

            //Set time to hide cards
            setTimeout(() => {
                //Hide the matched cards
                cards[compare[0].id].style.display = "none";
                cards[compare[1].id].style.display = "none";
                cardBox[compare[0].id].style.backgroundColor = "none";
                cardBox[compare[1].id].style.backgroundColor = "none";
                cardBox[compare[0].id].style.background = "none";
                cardBox[compare[1].id].style.background = "none";
                cardBox[compare[0].id].style.boxShadow = "none";
                cardBox[compare[1].id].style.boxShadow = "none";
                cardBox[compare[0].id].style.visibility = "hidden";
                cardBox[compare[1].id].style.visibility = "hidden";

            //Set compare array back to empty
            compare = [];
            }, 1000)
            //Add one to the matchTracker
            matchTracker += 1;
            //Add one to the moveTracker
            moves += 1;

            //Check if all matches have been found
            if(matchTracker === 8) {
                statusDisplay.innerHTML = `All matches found, you won in ${mins} minute ${secs} seconds and in ${moves} moves`;
                //Stop clock
                clearInterval(clock);
                //Change game to inactive
                gameActive = 0;
            }
                
            }
    
        } else if(compare.length === 2 && compare[0].card !== compare[1].card) {
            //If not match
            //Alert that there has been no match
            statusDisplay.innerHTML = "No match, try again!!";
            
            //Set time to fade images away
            setTimeout(() => {
                cards[compare[0].id].style.opacity = "0";
                cards[compare[1].id].style.opacity = "0";
                //Set compare array back to empty
                compare = [];
            }, 1000);

            //Add to moves counter
            moves += 1;
        
        }

        //Display moves in UI
        moveDisplay.textContent = moves;

        }

       

        } else {
            statusDisplay.innerHTML = "You need to click start to play!!";
        }
    });        
        

});