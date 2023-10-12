import React from 'react';
import { decode } from 'html-entities'

export default function Questions({
    questionArr, 
    checkAnswers, 
    handleAnsClick, 
    btnBgColor, 
    btnOpacity, 
    btnBorder,
    nanoid
}) {
    
    const questions = questionArr.map(data => {
        const answerBtns = data.allAnswers.map(answer => (
            
            <button 
                className="btn-answer" 
                onClick={() => checkAnswers ? '' : handleAnsClick(data.id, answer)}
                style={
                    {
                        backgroundColor: btnBgColor(data, answer),
                        opacity: btnOpacity(data, answer),
                        border: btnBorder(data, answer)
                    }
                }
                key={nanoid()}
            >
                {decode(answer)}
            </button>
        ))
        
        return (
            <div key={data.id}>
                <h4 className="question">{decode(data.question)}</h4>
                <div className="answer-container">
                    {answerBtns}
                </div>
                <hr />
            </div>
        )
        
    })
        
    return (
        <div className='question-container'>
            {questions}
        </div>
    )



}