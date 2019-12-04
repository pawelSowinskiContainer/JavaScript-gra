const Coin = require('./coin.js');
const Furry = require('./furry.js');
 
function Game () {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry(0,0, 'right');
    this.coin = new Coin();
    this.score = 0;
    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function() {
        this.hideVisibleFurry();
        if (this.board[this.index(this.furry.x, this.furry.y)] != null) {
            this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
        }
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };

    this.startGame = function () {
        let self = this;
        this.idSetInterval = setInterval(function () {
            self.moveFurry();
        },250);
    };

    this.moveFurry = function () {
        if (this.furry.direction === 'right') {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction === 'left') {
            this.furry.x = this.furry.x -1;
        } else if (this.furry.direction === 'up') {
            this.furry.y = this.furry.y + 1;
        } else if (this.furry.direction === 'down') {
            this.furry.y = this.furry.y - 1;
        }
        this.showFurry();
        this.checkCoinCollision();
        this.gameOver();
    };

    this.hideVisibleFurry = function () {
        let visilibleFurry = document.querySelector('.furry');
        if (visilibleFurry != null) {
            visilibleFurry.classList.remove('furry');
        }
    };

    this.turnFurry = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'down';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'up';
                break;
            default:
                break;
        }
    };

    this.checkCoinCollision = function () {
        if (this.index(this.furry.x, this.furry.y) === this.index(this.coin.x, this.coin.y)) {
            console.log('punkt');
            this.board[this.index(this.coin.x, this.coin.y)].classList.remove('coin');
            this.score += 1;
            document.querySelector('strong').innerText = this.score.toFixed(2);
            this.coin = new Coin();
            this.showCoin();
        }
    };

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.y < 0 || this.furry.x > 9 || this.furry.y > 9 ) {
            clearInterval(this.idSetInterval);
            this.hideVisibleFurry();
            alert('Game Over!!!');
        }
    };
 
}
 
module.exports = Game;