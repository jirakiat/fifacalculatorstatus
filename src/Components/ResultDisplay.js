import React from 'react';
import './Scoreboard.css';

const ResultDisplay = ({ calculatedValue }) => {
    return (
        <div className="scoreboard">
            <h3 className="score-text">ค่าสเตตัสนักเตะ</h3>
            <div className="score-value">{calculatedValue}</div>
        </div>
    );
};

export default ResultDisplay;
