import React, { useEffect } from 'react'

import Header from "./Header"
import MainPage from './MainPage'
import Loader from './Loader'
import Error from './Error'
import StarterScreen from './StarterScreen'
import Question from './Question'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Timer from './Timer'
import { useQuiz } from './context/QuizContext'



const App = () => {

  useEffect(() => {
    fetch("http://localhost:8000/questions#")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }))
  }, [])
  const { questions, status, index, answer, points, highScore, seconds, dispatch, numQuestions, maxPosiblePoints } = useQuiz()
  return (
    <div className='app'>
      <Header />
      <MainPage>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StarterScreen />}
        {status === "active" &&
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>}
        {status === "finish" &&
          <FinishScreen />}
      </MainPage>
    </div>
  )
}

export default App