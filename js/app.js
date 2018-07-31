let cards = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o", "fa fa-paper-plane-o", "fa fa-star", "fa fa-star", "fa fa-bolt", "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-anchor", "fa fa-anchor", "fa fa-leaf", "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle"];

const stars = document.querySelector('.stars');

const deck = document.getElementsByClassName("deck");

const card = document.getElementsByClassName('card');

let endcontent = document.createElement('p');

const ul = document.querySelector('.deck');

const sec = document.querySelector('section');

let starsNumber = 0;

let moves = 0;

let match = 0;

//move counter

function addMoves() {
    moves++;
    document.querySelector('.moves').innerHTML = moves;
}

// star rating function

function rating() {
    if (moves === 10) {
        stars.innerHTML = '<li><i class="fa fa-star"></i></li> ' + '<li><i class="fa fa-star"></i></li>';
        starsNumber = 2;
    } else if (moves === 15) {
        stars.innerHTML = '<li><i class="fa fa-star"></i></li> ';
        starsNumber = 1;
    } else if (moves < 9) {
        stars.innerHTML = '<li><i class="fa fa-star"></i></li> ' + '<li><i class="fa fa-star"></i></li> ' + '<li><i class="fa fa-star"></i></li>';
        starsNumber = 3;
    }
}

//MATCH num

function matchCounter() {
    match++;
}

//结束画面

function end() {
    if (match === 8) {
        ul.style.display = 'none';
        endcontent.innerHTML = 'CONGRADULATIONS! YOU WON!' + '\nwith ' + moves + ' Moves and ' + starsNumber + ' Stars ';
        sec.appendChild(endcontent);
    }
}
/*
 * 显示页面上的卡片
 *   - 使用下面提供的 "shuffle" 方法对数组中的卡片进行洗牌
 *   - 循环遍历每张卡片，创建其 HTML
 *   - 将每张卡的 HTML 添加到页面
 */

// 洗牌函数来自于 http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * 设置一张卡片的事件监听器。 如果该卡片被点击：
 *  - 显示卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 将卡片添加到状态为 “open” 的 *数组* 中（将这个功能放在你从这个函数中调用的另一个函数中）
 *  - 如果数组中已有另一张卡，请检查两张卡片是否匹配
 *    + 如果卡片匹配，将卡片锁定为 "open" 状态（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果卡片不匹配，请将卡片从数组中移除并隐藏卡片的符号（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 增加移动计数器并将其显示在页面上（将这个功能放在你从这个函数中调用的另一个函数中）
 *    + 如果所有卡都匹配，则显示带有最终分数的消息（将这个功能放在你从这个函数中调用的另一个函数中）
 */

// shuffle

function shuffleCard() {
    cards = shuffle(cards);
}

let opened = [];

//监听点击

document.querySelectorAll('li.card').forEach(function (card) {
        card.addEventListener('click', function() {
        opened.push(card);
        card.classList.add('open', 'show', 'disable');
        checkcard();
        })
})

//检查卡片

function checkcard() {
        if (opened.length === 2) {
            let firstCard = opened[0];
            let secondCard = opened[1];
            if (opened[0].querySelector('i').className === opened[1].querySelector('i').className) {
                setTimeout(function () {
                    firstCard.classList.add('match')
                    secondCard.classList.add('match')
                }, 500);
                matchCounter();
                
            } else {
                setTimeout(function () {
                    firstCard.classList.remove('show', 'open', 'disable')
                    secondCard.classList.remove('show', 'open', 'disable')
                }, 1000);
            }
            //clear the array
            opened = [];
            rating();
            addMoves();
            end();
        }
}

//RESTART

document.querySelector('.restart').addEventListener('click', function restart() {
    shuffleCard();
    match = 0;
    moves = 0;
    starsNumber = 0;
    ul.style.display = 'flex';
    endcontent.innerHTML= "";
    document.querySelector('.moves').innerHTML = 0;
    document.querySelector('.stars').innerHTML = '<li><i class="fa fa-star"></i></li> ' + '<li><i class="fa fa-star"></i></li> ' + '<li><i class="fa fa-star"></i></li>';
    document.querySelectorAll('li.card').forEach(function (card,index) {
        card.classList.remove('match', 'open', 'show', 'disable');
        card.querySelector('i').className = cards[index];
    })
})

//github https://github.com/Rayjy02087898/memory-game_zh.git