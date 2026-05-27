import React, { createContext, useContext, useState } from "react";

import API from "../api/axios";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [score, setScore] = useState(0);

  const [quizResult, setQuizResult] = useState(null);

  /* =====================================
     FETCH QUESTIONS
  ===================================== */

  const fetchQuestions = async (category, difficulty = "medium") => {
    const res = await API.get(
      `/questions/category/${category}?difficulty=${difficulty}&limit=10`,
    );

    setQuestions(res.data.questions);

    return res.data.questions;
  };

  /* =====================================
     SUBMIT QUIZ
  ===================================== */

  const submitQuiz = async (payload) => {
    const res = await API.post("/quizzes/submit", payload);

    setQuizResult(res.data.result);

    return res.data;
  };

  /* =====================================
     RESET
  ===================================== */

  const resetQuiz = () => {
    setQuestions([]);

    setCurrentQuestion(0);

    setScore(0);

    setQuizResult(null);
  };

  return (
    <QuizContext.Provider
      value={{
        questions,

        setQuestions,

        currentQuestion,

        setCurrentQuestion,

        score,

        setScore,

        quizResult,

        fetchQuestions,

        submitQuiz,

        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  return useContext(QuizContext);
};
