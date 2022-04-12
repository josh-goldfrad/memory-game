let cards = ["A", "B", "C", "D", "E", "A", "B", "C", "D", "E"];

// stolen from internet-Generate random number
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        debugger
        let rand_num = Math.floor(Math.random() * (i + 1));

        let temp = arr[i];
        arr[i] = arr[rand_num];
        arr[rand_num] = temp;
    }

    return
}

shuffleArray(cards)
function start_game() {
    let gameboard = document.createElement("div");
    gameboard.className=("gameboard")
    
    gameboard.innerHTML = '<p>memory game</p>';
    document.body.appendChild(gameboard);
    for (i of cards) {
        let elem = document.createElement("div");
        elem.className = ("card")
        gameboard.appendChild(elem)
        elem.innerText = (i);
        // if(elem.innerText="A"){
        //     elem.classList.add("A")
        // }
    }

}
start_game(shuffleArray(cards))







