function showNumberWithAnimation(i, j, randNumber){
    var theNumberCell = $("#number-cell-" + i + "-" + j);

    theNumberCell.css('background-color', getNumberBackgroundColor(randNumber));
    theNumberCell.css('color', getNumberColor(randNumber));
    theNumberCell.text(randNumber);

    theNumberCell.animate({
        width: '100px',
        height: '100px',
        top:getPosTop(i, j),
        left:getPosLeft(i, j)
    },50);

}


function showMovewithAnimation(fromx, fromy, tox, toy){
    var theNumberCell = $("#number-cell-" + fromx + "-" + fromy);
    
    theNumberCell.animate({
        top:getPosTop(tox, toy),
        left:getPosLeft(tox, toy)
    }, 200);
}

function updateScoreWithAnimation(score){
    $(`#score`).text(score);
}