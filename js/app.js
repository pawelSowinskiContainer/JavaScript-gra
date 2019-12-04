document.addEventListener('DOMContentLoaded', function () {
    const Game = require('./game');
    const newGame = new Game();
 
    newGame.showFurry();
    newGame.showCoin();
    newGame.startGame();

    document.addEventListener('keydown', function(event) {
        newGame.turnFurry(event);
    });

    
})
