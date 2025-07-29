let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector(".reset");
let newBtn=document.querySelector(".new");
let newGame=document.querySelector(".msg");

const winPatt=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

let turn0=false;

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn0){
            box.innerText="O";
            box.style.color="#669BBC";
            turn0=false;
        }
        else{
            box.innerText="X";
            box.style.color="#074261ff";
            turn0=true;
        }
        box.disabled=true;
        checkWinner();
    });
});
const showWinner=(winner)=>{
    newGame.innerText=`Congratulations,the winner is player ${winner}`;
    newBtn.style.visibility="visible";
}
const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const checkWinner=()=>{
    for(let pattern of winPatt){
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;
        if(pos1!="" && pos2!="" && pos3!=""){
            if(pos1===pos2 && pos2===pos3){
                disableBoxes();
                showWinner(pos1);
                break;
            }
        }
    }
    
}
const enableBoxes=()=>{
    turn0=false;
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
    newGame.innerText="";
}
resetBtn.addEventListener("click",()=>{
    enableBoxes();
    newBtn.style.visibility="hidden";
})
newBtn.addEventListener("click",()=>{
    enableBoxes();
    newBtn.style.visibility="hidden";
})