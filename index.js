/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}



/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let game of games) {
        // create a new div element, which will become the game card
        let game_el = document.createElement("div");
        
        // add the class game-card to the list
        game_el.classList.add("game-card");
        
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        game_el.innerHTML = `<div>
                <img class="game-img" src=${game.img} />
                <h3>${game.name}</h3>
                <p>${game.description}</p>
            </div>`;
            
        // append the game to the games-container
        gamesContainer.appendChild(game_el);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);



/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const total_contrib = GAMES_JSON.reduce((a, b) => a + b.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `<div>${total_contrib.toLocaleString('en-US')}</div>`



// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const total_raised = GAMES_JSON.reduce((a, b) => a + b.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `<div>$${total_raised.toLocaleString('en-US')}</div>`



// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

const total_card = GAMES_JSON.reduce((a) => a + 1, 0);

gamesCard.innerHTML = `<div>${total_card}</div>`



/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfunded = GAMES_JSON.filter((a) => a.pledged < a.goal);
    // console.log(unfunded.length)
    
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfunded);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    
    // use filter() to get a list of games that have met or exceeded their goal
    const funded = GAMES_JSON.filter((a) => a.pledged >= a.goal);
    // console.log(funded.length)

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(funded);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);



/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const num_unfunded = GAMES_JSON.reduce((a, b) => b.pledged < b.goal ? a+1 : a, 0);

// create a string that explains the number of unfunded games using the ternary operator
const display_str = `A total of $${total_raised.toLocaleString('en-US')} has been raised for ${total_card} games. Currently, ${num_unfunded} ${num_unfunded > 1 ? "games remain" : "game remain"} unfunded. Wee need your help to fund these amazing games!`

// create a new DOM element containing the template string and append it to the description container
const display_el = document.createElement("p");
display_el.innerHTML = display_str
descriptionContainer.appendChild(display_el);



/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [top1, top2, ...others] = sortedGames;
// console.log(top1, top2, others);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const top1_el = document.createElement("p");
top1_el.innerHTML = top1.name;
firstGameContainer.appendChild(top1_el);

// do the same for the runner up item
const top2_el = document.createElement("p");
top2_el.innerHTML = top2.name
secondGameContainer.append(top2_el);