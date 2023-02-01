import React from "react";
import Header from "./header";
import Footer from "./footer";
import Game from "./game";
import Records from "./records";


function App(){
    return(
        <div className="app">
            <Header />
            <div className="main-window">
                <Records />
                <Game />
            </div>
    
            <Footer />
        </div>
    );
}


export default App;