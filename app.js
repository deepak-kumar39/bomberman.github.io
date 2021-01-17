//creating of cells for grid and adding event listeners for them 
var count = 0;
for(var i = 1;i<=81;i++){
    var cell = document.createElement("div");
    cell.setAttribute("class", "box");
    cell.setAttribute("id", "cell_" +i);
    
    cell.addEventListener("click", blockClick);
    document.getElementById("grid").appendChild(cell);
}

//block clicked
function blockClick(e){
    var currentBlock = Number(e.target.getAttribute("id").slice(5));
    var lost = clicked(currentBlock);
    if(lost){
        lose();
    }
    else{
        count++;
        document.getElementById("gameScore").innerText = count;
        blockColorChange(currentBlock);
    }

    if(count == 71){
        win();
    }
}

var random = [];
//spawning bombs at random locations
var rnd;
do { 
    do { 
        rnd=Math.floor(Math.random()*81+1); 
    }
    while(random.includes(rnd))
    random.push(rnd);
} while(random.length<10)

//reset button clicked
function resetButtonHit(){
    resetBomb();
    resetBombLocation();
    scoreReset();
    resetBlocks();
    addListner();
    document.getElementById("resultDisplay").innerText = "";
}

//add listner to blocks again
function addListner(){
    for(var i = 1;i<=81;i++){
        var cell = document.getElementById("cell_"+i);
        cell.addEventListener("click", blockClick);
    }
}

//resets the placements of bombs
function resetBomb(){
    for(var i =1;i<=81;i++){
        document.getElementById("cell_" + i).style.backgroundImage = "";
    }
}

//reset bomb locations
function resetBombLocation(){
    random = [];
    var rnd;
    do { 
        do { 
            rnd=Math.floor(Math.random()*81+1); 
        }
        while(random.includes(rnd))
        random.push(rnd);

    } while(random.length<10)
    console.log(random);
}

//removing previous clicks
function resetBlocks(){
    for(var i=1;i<=81;i++){
        document.getElementById("cell_"+i).removeAttribute('style');
    }
}

//show bomb(after player has lost or won)
function showBomb(){
    for(var i =0;i<10;i++){
        document.getElementById("cell_" + random[i]).style.backgroundImage = "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
        document.getElementById("cell_" + random[i]).style.backgroundSize = "cover";
        document.getElementById("cell_" + random[i]).style.backgroundColor = "rgb(255, 0, 0)";
    }
}
//any block clicked
function clicked(i){
    for(var j = 0;j<10;j++){
        if(random[j] === i){
            return true;
        }
    }
    return false;
}

//changing color when clicked a safe block
function blockColorChange(i){
    document.getElementById("cell_"+i).style["background-color"] = "rgb(66, 230, 26)";
    document.getElementById("cell_"+i).removeEventListener("click",blockClick);
}

//making game unplayable until hit reset
function removeClick(){
    for(var i=1;i<=81;i++){
        document.getElementById("cell_"+i).removeEventListener("click",blockClick);
    }
}

//user wins
function win(){
    showBomb();
    removeClick();
    document.getElementById("resultDisplay").innerText = "win";
}

//user loses
function lose(){
    showBomb();
    removeClick();
    document.getElementById("resultDisplay").innerText = "Oops!! You Lost buddy";
}

//score reset
function scoreReset(){
    count = 0;
    document.getElementById("gameScore").innerText = count;
}

