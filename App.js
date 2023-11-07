import React, { useState, useEffect } from 'react';
import IntroPg from './components/IntroPg'
import Questions from './components/Questions'
import { nanoid } from 'nanoid'
import categoriesArr from './categories'
import ReactConfetti from './components/Confetti'

export default function App() {
    
    const [categories, setCategories] = useState(categoriesArr)
    const [quizStarted, setQuizStarted] = useState(false)
    const [questionArr, setQuestionArr] = useState([])
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [quizResults, setQuizResults] = useState('')


    useEffect(() => {
        newQuiz()
    },[])


    function newQuiz(categoryValue) {
        setQuizStarted(false);
        setQuestionArr([]);
        setCheckAnswers(false);
        setQuizResults('');

        fetch(
          `https://opentdb.com/api.php?amount=5&difficulty=easy${
            categoryValue ? "&category=" + categoryValue : ""
          }`
        )
          .then((res) => res.json())
          .then((data) => {
            const newQuestionArr = data.results.map((item) => {
              const incorrectAnswersArr = [...item.incorrect_answers];
              const correctAnswer = item.correct_answer;
              const allAnswersArr = [...incorrectAnswersArr, correctAnswer];
              const shuffledAnswers = shuffleArray(allAnswersArr);

              return {
                question: item.question,
                correct: correctAnswer,
                incorrect: incorrectAnswersArr,
                allAnswers: shuffledAnswers,
                clickedAnswer: "",
                id: nanoid(),
              };
            });

            setQuestionArr(newQuestionArr);
          });
    }

    function handleCategoryChange(event) {
        newQuiz(event.target.value)
    }

    function dropDownHtml() {
    
        const options = categories.map(category => (
                <option key={category.value} value={category.value}>
                    {category.label}
                </option>
            )
        )

       return (
            <div className='option-container'>
                <select 
                    name="Category Options" 
                    id="select-category"
                    onChange={handleCategoryChange}
                >
                    {options}
                </select>
            </div>
       )
         
    }
    
    function handleStartBtn() {
        setQuizStarted(true)   
    }

    function handleAnsClick(questionId, answer) { 
        setQuestionArr(prevQuestionArr => prevQuestionArr.map(item => {
            if (item.id === questionId) {
                return (
                    {
                        question: item.question,
                        correct: item.correct,
                        incorrect: item.incorrect,
                        allAnswers: item.allAnswers,
                        clickedAnswer: answer,
                        id: item.id
                    }
                );
            } else {
                return item;
            }
        }))
    }

    function handleCheckAnswers() {
        const correctAns = questionArr.filter( q => q.clickedAnswer === q.correct )
        setCheckAnswers(prevCheckAnswers => !prevCheckAnswers)
        setQuizResults(correctAns.length) 
    }

    function btnBgColor(data, answer) {
  
        if (checkAnswers) {
             if (data.correct === answer) {
                return '#94D7A2'
             } else if (data.clickedAnswer !== answer){
                return '#F5F7FB'
             } else {
                return  '#F8BCBC'
             }
                    
        } else {
            return data.clickedAnswer === answer ? 
                    '#D6DBF5' : 
                    '#F5F7FB'

        }
    }

    function btnOpacity(data, answer) {

        if (checkAnswers) {
             if (data.correct === answer) {
                return ''
             }  else {
                return  '.6'
             }
                    
        } else {
            return ''

        }
    }

    function btnBorder(data, answer) {

            if (data.clickedAnswer === answer || checkAnswers && data.correct === answer) {
               return 'none'
            }  
                   
      
    }

    function shuffleArray(array) {
        // Fisher–Yates shuffle
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
        return array;
      }

    return (
        <main>
            {quizResults > 3 && <ReactConfetti />}
            <img 
                src="./images/blob-1.png"
                className="img-blob-1"></img>
            <img 
                src="./images/blob-2.png"
                className="img-blob-2"></img>
            <div className="content-container">
                {
                    quizStarted ? 
                        <Questions 
                            questionArr={questionArr}
                            checkAnswers={checkAnswers}
                            handleAnsClick={handleAnsClick}
                            btnBgColor={btnBgColor}
                            btnOpacity={btnOpacity}
                            btnBorder={btnBorder}
                            nanoid={nanoid}
                        /> : 
                        <IntroPg 
                            dropDownHtml={dropDownHtml()}
                            onClick={handleStartBtn}
                        />
                }
                <div className="score-container">
                    {checkAnswers ?
                        <p className="score">You scored {quizResults}/5 correct answers</p> : ''}
                    {
                        quizStarted ? 
                            <button 
                                className='btn-submit'
                                style={{width: checkAnswers ? '125px' : '200px'}}
                                onClick={checkAnswers ? () => newQuiz() : handleCheckAnswers}
                            >
                                {checkAnswers ? 'Play Again' : 'Check Answers'}
                            </button> :
                            ''
                    }
                </div>
            </div>
        </main>
    )
}