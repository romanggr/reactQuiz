import React from 'react'
import { useQuiz } from './context/QuizContext'

const FinishScreen = () => {
    const { maxPosiblePoints, points, highScore, dispatch } = useQuiz()
    const percentage = (points / maxPosiblePoints) * 100
    return (
        <>
            <p className='result'>
                You scored {points} out of {maxPosiblePoints} ({Math.ceil(percentage)}%)
            </p>
            <p className='highscore'>Hight score {highScore} points</p>
            <button className='btn btn-ui' onClick={() => dispatch({ type: "restart" })}>Restart</button>
        </>
    )
}

export default FinishScreen