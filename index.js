let cards = ["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H", "I", "I", "j", "j", "K", "K", "L", "L", "M", "M", "N", "N", "O", "O", "P", "P", "Q", "Q", "R", "R", "S", "S", "T", "T", "U", "U"];
let hasClickedCard = false;
let switch_off = true
let firstCard = 0, secondCard = 0, id_help = 0, point_to = 0, counter = 0;
let index_players_plus_one = 1;
let num1 = 0;
let clicked = [];
let player_list_v_1 = "";
let sons_of_gameboard = [];
let players = [];
let list_of_players = "";
let audio_match = new Audio('yeah.mp3');
let audio_nope = new Audio('nope-sound-effect.mp3');


let room = document.createElement("div");
room.className = ("room");
let gameboard = document.createElement("div");
gameboard.className = ("gameboard");
document.body.appendChild(room);
room.innerHTML = `<h2 ${classList="memory game"}> memory game</h2>`;
room.appendChild(gameboard);
let btn_num = document.createElement("Button");
room.appendChild(btn_num);
btn_num.innerText = ' press here to start game';
btn_num.classList = ("Button_num");
btn_num.onclick = () => enter_num_of_players();
let input_num = document.createElement("input");
input_num.placeholder = "enter amount of players between 2-8";
input_num.id = ("input_num");
room.appendChild(input_num);
let playerName = document.createElement("div");
playerName.classList = ("players");
room.appendChild(playerName);
let input_card_num = document.createElement("input");
input_card_num.placeholder = "enter amount of card pairs, between 2-20 ";
input_card_num.id = ("input_card_num");
room.appendChild(input_card_num);
let color_mode = document.createElement("div");
color_mode.classList = ("color_mode")
room.appendChild(color_mode);
color_mode.innerText = 'color theme switch'
let btn_color_theme = document.getElementById("color_theme");
color_mode.appendChild(btn_color_theme);
btn_color_theme.id = ("btn_color_theme");
btn_color_theme.onchange = () => change_color_theme();


function player_name_score() {
    for (i of players) {
        player_list_v_1 += `${i.name}\'s score-${i.score}, `;
    }
    list_of_players = player_list_v_1;

    playerName.innerHTML = `<div>${list_of_players} =>
it's now ${players[point_to].name}'s turn</div>`;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {

        let rand_num = Math.floor(Math.random() * (i + 1));
        let temp = arr[i];
        arr[i] = arr[rand_num];
        arr[rand_num] = temp;
    }
    return
}

function start_game() {
    for (i of cards) {
        let elem = document.createElement("div");
        elem.classList = ("card hidden ");
        gameboard.appendChild(elem);
        elem.innerText = (i);
        elem.id = i + id_help;
        elem.className += (i);
        elem.onclick = click1;
    }
}


let click1 = (event) => {

    event.target.classList.add("shown");
    event.target.onclick = "";
    if (!hasClickedCard) {
        hasClickedCard = true;
        firstCard = event.target;
    }
    else {
        secondCard = event.target;
        sons_of_game = document.querySelector(".gameboard").children;
        sons_of_gameboard = [...sons_of_game].map(v => Object.assign(v, { onclick: "" }));
        is_it_matched = match(firstCard, secondCard);
        if (is_it_matched == true) {
            secondCard.className += (" matched");
            firstCard.className += (" matched");
            audio_match.play();
            players[point_to].score++;
            player_list_v_1 = "";
            for (i of players) {
                player_list_v_1 += i.name + "'s " + "score- " + i.score + " ";
            }
            list_of_players = player_list_v_1;
            playerName.innerHTML = `<div>${list_of_players}
            it's now ${players[point_to].name}'s turn</div>`;
            neutralize_cards();
            hasClickedCard = false;
            point_to++;
            switch_player_turn(players);
            playerName.innerHTML = `<div>${list_of_players}
            it's now ${players[point_to].name}'s turn</div>`;
        }
        else {
            audio_nope.play();
            hasClickedCard = false;
            setTimeout(hide_cards, 1000);
            setTimeout(neutralize_cards, 1007);
            point_to++;
            switch_player_turn(players);
            playerName.innerHTML = `<div>${list_of_players}
            it's now ${players[point_to].name}'s turn</div>`;
        }
        setTimeout(return_click, 1008);
    }


}

function return_click() {
    sons_of_game = document.querySelector(".gameboard").children;
    sons_of_gameboard = [...sons_of_game].map(v => Object.assign(v, { onclick: click1 }));
}

function match(card1, card2) {
    if (card1 == card2) {
        return 0;
    }
    if (card2.className == card1.className) {
        return 1;
    }
    else {
        return 0;
    }
}

function neutralize_cards() {
    firstCard = 0;
    secondCard = 0;
}

function hide_cards() {
    secondCard.classList.remove("shown");
    firstCard.classList.remove("shown");
}

function switch_player_turn(players) {
    if (point_to % players.length == 0) {
        point_to = 0
    }
}

function how_many_players(num2) {
    let checking_num = num2
    let num_of_players = checking_num
    if (num_of_players < 9 && num_of_players > 1) {
        return player_creator(num_of_players)
    }
    else {
        return alert("enter amount of players, must be a number between 2-8")
    }
}

function player_creator(num_of_players) {
    for (counter = 0; counter < num_of_players; counter++) {
        new_player = {}
        new_player.name = prompt("please enter name")
        new_player.score = Number(0);
        players.push(new_player)
    }
    player_name_score()
    how_many_cards()
    start_game(shuffleArray(cards));
}




function enter_num_of_players() {
    let num1 = document.getElementById("input_num").value
    how_many_players(num1)
    return num1
}



function how_many_cards() {
    let num_of_cards = document.getElementById("input_card_num").value
    num_of_cards = num_of_cards * 2;
    if (num_of_cards < 41 && num_of_cards > 3) {
        return cards.length = (num_of_cards)
    }
    else {
        alert("the number you enterd is not within our guidelines the default of 10 sets will be set for you")
        return cards.length = 20
    }
}


function change_color_theme() {
    let temp = document.getElementsByClassName("card hidden")
    let classes = [...temp];
    if (switch_off == true) {
        switch_off = false
        room.classList = ("room dark");
        playerName.classList += ("players black");
        color_mode.classList = ("color_mode storm")
        // classes.map(item => item.classList += (" darker"))
        btn_num.classList=("Button_num very_dark");
        
    }
    else {
        switch_off = true
        room.classList = ("room")
        playerName.classList = ("players");
        color_mode.classList = ("color_mode")
        // classes.map(item => item.classList )
        btn_num.classList = ("Button_num");
    }
}