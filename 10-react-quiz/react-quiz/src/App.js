import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import Error from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'

const initialState = {
  questions: [],
  status: 'loading', // 'loading', 'error', 'ready', 'active', 'finished'
  index: 0,
}

function reducer(state, action) {
  switch (action?.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }
    case 'start':
      return {
        ...state,
        status: 'active',
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export default function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState)

  const numQuestions = questions.length

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch('http://localhost:8000/questions')
        const questions = await response.json()
        dispatch({ type: 'dataReceived', payload: questions })
      } catch (error) {
        dispatch({ type: 'dataFailed' })
      }
    }

    fetchQuestions()
  }, [])

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'active' && <Question question={questions[index]} />}
      </Main>
    </div>
  )
}
