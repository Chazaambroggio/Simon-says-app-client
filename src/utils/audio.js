import blue from '../sounds/blue.wav';
import green from '../sounds/green.wav';
import red from '../sounds/red.wav';
import yellow from '../sounds/yellow.wav';
import gameOver from '../sounds/game-over.wav';


function getSound(color){

    if(color === 'blue') {
        return blue;
    } else if (color === 'green'){
        return green;
    } else if (color === 'red'){
        return red;
    } else if (color === 'yellow'){
        return yellow;
    } else if (color === 'game-over'){
        return gameOver;
    }
 
}

export default getSound;