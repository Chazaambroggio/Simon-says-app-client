import React, { useEffect, useState } from "react";
import ColorCard from "./colorCard";
import GameOver from "./gameOver";
import '../styles.css';
import timeout from "../utils/utils";
import getSound from "../utils/audio";


function Game() {

    const [isOn, setIsOn] = useState(false);
    const colorList = ['green', 'red', 'yellow', 'blue'];

    const initPlay = {
        isDisplay: false,
        colors: [],
        score: 0,
        userPlay: false,
        userColors: [],
    };

    const [play, setPlay] = useState(initPlay);
    const [flashColor, setFlashColor] = useState("");

    // Start Game.
    function startHandle() {
        setIsOn(true);
    }

    useEffect(()=> {
        if(isOn){
            setPlay({...initPlay, isDisplay:true })
        } else {
            setPlay(initPlay)
        }
    }, [isOn]);

    // Generate Color.
    useEffect(() => {
        if(isOn && play.isDisplay) {
            
            let newColorsList = [];

            for (let i=0; i < (play.score +1); i++){
                let newColor = colorList[Math.floor(Math.random()*4)];
                newColorsList.push(newColor);
            }

            setPlay({...play, colors:newColorsList});
           //const copyColors =[...play.colors];
           //copyColors.push(newColor);
           //setPlay({...play, colors:copyColors})
        }

    }, [isOn, play.isDisplay])

    // Display colors.
    useEffect(() => {
        if(isOn && play.isDisplay && play.colors.length){
            
            // Flash colors.
            async function displayColors() {
                
                await timeout(1000);

                for(let i=0; i < play.colors.length; i++) {
                    setFlashColor(play.colors[i]);
                    await timeout(250);
                    setFlashColor("");
                    await timeout(250);
                    
                    if (i === play.colors.length -1) {
                        
                        const copyColors = [...play.colors];
                        
                        // Activate user's turn to play.
                        setPlay({
                            ...play,
                            isDisplay: false,
                            userPlay: true,
                            userColors: copyColors.reverse(),
                        });
                    }
                }
            }

            displayColors()
        }
    }, [isOn, play.isDisplay, play.colors.length, play])

 

    // Color Clicked.
    async function cardClickHandle(color) {
        if(!play.isDisplay && play.userPlay) {
            
            const copyUserColors = [...play.userColors];
            const lastColor = copyUserColors.pop();

            setFlashColor(color);
            
            // Sound.
            let beat = new Audio(getSound(color));
	        beat.play()

            // Check color.
            if (color === lastColor) {
                if (copyUserColors.length) {
                    // Correct color
                    setPlay({...play, userColors: copyUserColors})

                } else {
                    //Next Level.
                    await timeout(150);
                    setFlashColor("");
                    await timeout(1500);

                    setPlay({
                        ...play,
                        isDisplay: true,
                        userPlay: false,
                        score: play.colors.length,
                        userColors:[],
                    });
                }

            } else {
                // Wrong color.
                await timeout(700);
                // Sound.
                let beat = new Audio(getSound('wrong'));
	            beat.play()

                // Restart play and set score.
                //setPlay({...initPlay, score:(play.colors.length)})
                let score = 1;
                if(play.score > 0) {
                    score = play.score;
                }

                setPlay({...initPlay, score: score})
            }
            
            // Flash duration.
            await timeout(150);
            setFlashColor("");
        }
    }

    // Close GameOver and re-start game.
    function closeHandle() {
        setIsOn(false);
    }

    return (
        <div className="game-area">
            
            {!isOn &&  (
                <div>
                    <h1>Simon Says</h1>
                    <button onClick={startHandle}>Start</button>
                </div>
            )}

            {isOn && (play.isDisplay || play.userPlay) && (
                <div>
                    <div className="score">Level: {play.score}</div>

                    <div className="color-area">
                        { colorList &&
                                colorList.map((colorValue, i) => ( <ColorCard key={colorValue} color={colorValue} flash={flashColor===colorValue} onClick={()=>cardClickHandle(colorValue)} ></ColorCard>))
                        }
                    </div>
                </div>

            )}

            {isOn && !play.isDisplay && !play.userPlay && play.score && (
                <GameOver score={play.score} onClick={()=>closeHandle()}/>
            )}

        </div>
    )
}

export default Game;