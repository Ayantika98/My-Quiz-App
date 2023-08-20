import React, { useEffect, useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { getQuizs } from './store/services';
import { useDispatch, useSelector } from 'react-redux';
import { setCorrectAnswer, setIndex, setMarks, setQuestion, setSelectedAnswer } from './store/quizSlice';

function App() {

  // Display Controlling States
  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuizs());
    return () => dispatch(setQuestion([]))
  }, []);

  const quizs = useSelector((state) => state.quizReducer.quizs);
  const question = useSelector((state) => state.quizReducer.question);
  const questionIndex = useSelector((state) => state.quizReducer.questionIndex);
  const selectedAnswer = useSelector((state) => state.quizReducer.selectedAnswer);
  const correctAnswer = useSelector((state) => state.quizReducer.correctAnswer);
  const marks = useSelector((state) => state.quizReducer.marks);


  // Set a Single Question
  useEffect(() => {
    if (quizs.length > questionIndex) {
      dispatch(setQuestion(quizs[questionIndex]));
    }
  }, [quizs, questionIndex])

  // Start Quiz
  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  }

  const reset = () => {
    dispatch(setCorrectAnswer(''));
    dispatch(setSelectedAnswer(''));
  }

  // Check Answer
  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      dispatch(setCorrectAnswer(question?.correctAnswer));
      dispatch(setSelectedAnswer(selected));

      if (selected === question?.correctAnswer) {
        event.target.classList.add('bg-success');
        dispatch(setMarks(marks + 5));
      } else {
        event.target.classList.add('bg-danger');
      }
    }
  }

  // Next Quesion
  const nextQuestion = () => {
    reset();
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
    dispatch(setIndex(questionIndex + 1));
  }

  // Show Result
  const showTheResult = () => {
    setShowResult(true);
    setShowStart(false);
    setShowQuiz(false);
  }

  // Start Over
  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    dispatch(setCorrectAnswer(''));
    dispatch(setSelectedAnswer(''));
    dispatch(setIndex(0));
    dispatch(setMarks(0));
    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');
    const rightBtn = document.querySelector('button.bg-success');
    rightBtn?.classList.remove('bg-success');
  }

  return (
    <>
      {/* Welcome Page */}
      <Start
        startQuiz={startQuiz}
        showStart={showStart}
      />

      {/* Quiz Page */}
      <Quiz
        showQuiz={showQuiz}
        checkAnswer={checkAnswer}
        nextQuestion={nextQuestion}
        showTheResult={showTheResult}
      />

      {/* Result Page */}
      <Result
        showResult={showResult}
        quizs={quizs}
        marks={marks}
        startOver={startOver} />
    </>
  );
}

export default App;
