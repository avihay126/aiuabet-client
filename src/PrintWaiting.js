import React from 'react';
import aiuabetlogo from './Styles/aiuabetlogo.jpg'


function PrintWaiting() {
    return (
        <div className="App-waiting">
            <img src={aiuabetlogo} className="App-logo" alt="logo" />
            <div className="App-waiting-text">
                Please Wait...
            </div>
        </div>
    );
}

export default PrintWaiting;
