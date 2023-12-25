import { useQuiz } from '../contexts/QuizContext'
import QuestionOptions from './QuestionOptions'

export default function Question() {
  const { currentQuestion } = useQuiz()

  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <QuestionOptions />
    </div>
  )
}
