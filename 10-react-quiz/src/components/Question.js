import { useQuiz } from '../contexts/QuizContext'
import QuestionOptions from './QuestionOptions'

export default function Question() {
  const { questions, index } = useQuiz()
  const currentQuestion = questions[index]

  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <QuestionOptions currentQuestion={currentQuestion} />
    </div>
  )
}
