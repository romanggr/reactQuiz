import React, { createContext, useContext, useReducer } from 'react'

const QuizContext = createContext()

const SECS_PER_QUESTION = 30

const initialstate = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highScore: 0,
    seconds: null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "dataReceived":
            return {
                ...state,
                questions: action.payload,
                status: "ready"
            }
        case "dataFailed":
            return {
                ...state,
                status: "error"
            }
        case "start":
            return {
                ...state,
                status: "active",
                seconds: state.questions.length * SECS_PER_QUESTION
            }
        case "newAnswer":
            const question = state.questions.at(state.index)
            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption
                    ? state.points + question.points : state.points
            }
        case "nextQuestion":
            return {
                ...state,
                index: state.index++,
                answer: null
            }
        case "showResult":
            return {
                ...state,
                status: "finish",
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        case "restart":
            return {
                ...state,
                status: "ready",
                points: 0,
                index: 0,
                answer: null,
            }
        case "tik":
            return {
                ...state,
                seconds: state.seconds - 1,
                status: state.seconds === 0 ? "finish" : state.status
            }
        default:
            throw new Error("unknown action type")
    }
}

const QuizContextProvider = ({ children }) => {
    const [{ questions, status, index, answer, points, highScore, seconds }, dispatch] = useReducer(reducer, initialstate)
    const numQuestions = questions.length
    const maxPosiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0)
    return (
        <QuizContext.Provider value={{ questions, status, index, answer, points, highScore, seconds, dispatch, numQuestions, maxPosiblePoints }}>
            {children}
        </QuizContext.Provider>
    )
}

const useQuiz = () => {
    const context = useContext(QuizContext)
    if (context === undefined) throw new Error("You call useQuiz outside of provider")
    return context
}

export { QuizContextProvider, useQuiz }