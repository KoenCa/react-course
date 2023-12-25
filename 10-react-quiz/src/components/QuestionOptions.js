import { useQuiz } from '../contexts/QuizContext'

export default function QuestionOptions({ currentQuestion }) {
  const { answer, dispatch } = useQuiz()

  const hasAnswered = answer !== null

  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? 'answer' : ''} ${
            hasAnswered
              ? index === currentQuestion.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
