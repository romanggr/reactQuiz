import React from 'react'
import { useQuiz } from './context/QuizContext'

const Progress = () => {
    const { maxPosiblePoints, answer, index, points, numQuestions } = useQuiz()
    return (
        <header className='progress'>
            <progress max={numQuestions} value={index + Number(answer !== null)} />
            <p>Question {index + 1} / {numQuestions}</p>
            <p>{points} / {maxPosiblePoints} points</p>

        </header>
    )
}

export default Progress