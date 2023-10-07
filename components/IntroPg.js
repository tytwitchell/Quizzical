import React from 'react'

export default function IntroPg(props) {

    return (
        <div className="intropg-container">
            <h1>Quizzical</h1>
            <p>Take a Quiz, have a good time!</p>
            {props.dropDownHtml}
            <button 
                className="btn-start" 
                onClick={props.onClick}>
                    Start Quiz
            </button>
        </div>
    )
}