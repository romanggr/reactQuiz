import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QuizContextProvider } from './context/QuizContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QuizContextProvider>
      <App />
    </QuizContextProvider>

  </StrictMode>
  ,

)
