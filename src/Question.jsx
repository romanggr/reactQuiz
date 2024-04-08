import React from 'react'
import { useQuiz } from './context/QuizContext'

const Question = () => {
    const { questions, dispatch, answer, index } = useQuiz()
    const question = questions[index]
    const hasAnswer = answer !== null
    return (
        <div className='options'>
            <h4>{question.question}</h4>
            {question.options.map((option, index) =>
                <button
                    className={`btn btn-option ${index === answer ? "answer" : ""} ${hasAnswer
                        ? index === question.correctOption
                            ? "correct"
                            : "wrong"
                        : ""
                        }`}
                    key={option}
                    disabled={hasAnswer}
                    onClick={() => {
                        dispatch({ type: "newAnswer", payload: index })

                    }}>
                    {option}
                </button>)}
        </div>
    )
}

export default Question