var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
});

function newgame(){
    // 初始化棋盘格    
    init();
    // 随机生成数字s
    generateNewNumber();
    generateNewNumber();
}

function init(){
    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getPosTop(i, j)); 
            gridCell.css('left', getPosLeft(i, j)); 
        }
    }


    for(let i = 0; i < 4; i++){
        board[i] = new Array();
        for(let j = 0; j < 4; j++){            
            board[i][j] = 0;
        }
    }


    updateBoardView()
    score = 0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for(let i = 0; i < 4; i++)
        for(let j = 0; j < 4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            // 是'+i+'   '+j+'
            var theNumberCell = $("#number-cell-" + i + "-" + j);
            
            if(board[i][j] === 0){
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
            }
            else{                
            theNumberCell.css('top', getPosTop(i, j));
            theNumberCell.css('left', getPosLeft(i, j));
            theNumberCell.css('width', '100px');
            theNumberCell.css('height', '100px');
            theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]))
            theNumberCell.css('color', getNumberColor(board[i][j]))
            theNumberCell.text(board[i][j])
            }
        }
}

function generateNewNumber(){
    if(nospace()){
        return false;
    }
    // 随机一个位置
    var randx = parseInt(Math.floor(Math.random() * 4))
    var randy = parseInt(Math.floor(Math.random() * 4))

    let time = 0;
    while(time < 50){
        if(board[randx][randy] == 0) break
        randx = parseInt(Math.floor(Math.random() * 4))
        randy = parseInt(Math.floor(Math.random() * 4))
        time++;
    }

    if(time == 50){
        for(let i = 0; i < 4; i++)
            for(let j = 0; j < 4; j++){
                if(board[i][j] === 0){
                    randx = i;
                    randy = j;
                }
            }
    }
    // 随机一个数字
    var randNumber = Math.random() < 0.5? 2 : 4;
    // 在随机的位置放上数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);
    return true;
}

$(document).keydown(function(event){
    switch(event.keyCode){
        // left
        case 65:
            if(moveLeft()){
                setTimeout(`generateNewNumber();`,210);
                setTimeout(`isGameOver()`,300);
            }
            break;
        // up
        case 87:
            if(moveUp()){
                setTimeout(`generateNewNumber();`,210);
                setTimeout(`isGameOver()`,300);
            }
            break;
        // right
        case 68:
            if(moveRight()){
                setTimeout(`generateNewNumber();`,210);
                setTimeout(`isGameOver()`,300);
            }
            break;
        // down
        case 83:
            if(moveDown()){
                setTimeout(`generateNewNumber();`,210);
                setTimeout(`isGameOver()`,300);
            }
            break;
        default:
            break;
    }
})
function isGameOver(){
    if(nospace(board) && nomove(board)){
        gameOver()
    }
}

function gameOver(){
    alert(`gameover!`)
}

function moveLeft(){
    if(!canMoveLeft(board)) 
        return false;

    // move
    for(var i = 0; i < 4; i++)
        for(var j = 1; j < 4; j++){
            if(board[i][j] != 0){
                for(let k = 0; k < j; k++){
                    if(board[i][k] === 0 && noBlockHorizontal(i, k, j, board)){
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        showMovewithAnimation(i, j, i, k)
                        continue;
                    }
                    else if(board[i][j] === board[i][k] && noBlockHorizontal(i, k, j, board)){
                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        score += board[i][k];

                        updateScoreWithAnimation(score);
                        showMovewithAnimation(i, j, i, k)
                        continue
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    if(!canMoveRight(board))
        return false;
    
    for(let i = 0; i < 4; i++)
        for(let j = 2; j >= 0; j--){
            if(board[i][j] != 0){

                for(let k = 3; k > j; k--){
                    if(board[i][k] === 0 && noBlockHorizontal(i, j, k, board)){
                        showMovewithAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][j] === board[i][k] && noBlockHorizontal(i, j, k, board)){

                        board[i][k] += board[i][k];
                        board[i][j] = 0;
                        score += board[i][k];

                        updateScoreWithAnimation(score);
                        showMovewithAnimation(i, j, i, k);
                        continue;
                    }
                }
            }
        }
    setTimeout(" updateBoardView()",200);
    return true
}

function moveUp(){
    if(!canMoveUP(board))
        return false;

    for(let j = 0; j < 4; j++)    
        for(let i = 1; i < 4; i++){
            if(board[i][j] != 0){
                for(let k = 0; k < i; k++){
                    if(board[k][j] === 0 && noBlockPerpendicular(j, k, i, board)){
                        showMovewithAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] === board[i][j] && noBlockPerpendicular(j, k, i, board)){
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];

                        updateScoreWithAnimation(score);
                        showMovewithAnimation(i, j, k, j);
                        continue;
                    }
                }
            }
        }
        
    setTimeout(" updateBoardView()",200);
    return true;
}

function moveDown(){
    if(!canMoveDown(board))
        return false;

    for(let j = 0; j < 4; j++)   
        for(let i = 2; i >= 0; i--){
            if(board[i][j] != 0){
                for(let k = 3; k > i; k--){
                    if(board[k][j] === 0 && noBlockPerpendicular(j, i, k, board)){
                        showMovewithAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[k][j] === board[i][j] && noBlockPerpendicular(j, i, k, board)){
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];

                        updateScoreWithAnimation(score);
                        showMovewithAnimation(i, j, k, j);
                        continue;
                    }
                }
            }
        }
        
    setTimeout("updateBoardView()",200);
    return true;
}