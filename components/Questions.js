import React from 'react';

export default function Questions(props) {
    return (
        <div className='question-container'>
            {props.questionHtml}
        </div>
    )
}