import React, { useEffect, useState } from "react";

import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useSearchParams, useNavigate } from "react-router-dom";

import { FiClock, FiCheck, FiX, FiArrowRight, FiAward } from "react-icons/fi";

import Navbar from "../components/common/Navbar";

import "./Quiz.css";

const Quiz = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const category = searchParams.get("category") || "gaming";

  /* =========================================
     STATES
  ========================================= */

  const [questions, setQuestions] = useState([]);

  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [showAnswer, setShowAnswer] = useState(false);

  const [score, setScore] = useState(0);

  const [timeLeft, setTimeLeft] = useState(15);

  /* =========================================
     FETCH QUESTIONS
  ========================================= */

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
         `${API_BASE_URL}/questions/category/${category}`,
      );

      setQuestions(res.data.questions || []);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  /* =========================================
     TIMER
  ========================================= */

  useEffect(() => {
    if (loading || showAnswer || questions.length === 0) return;

    if (timeLeft <= 0) {
      setShowAnswer(true);

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showAnswer, loading, questions]);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="quiz-loading-screen">
        <div className="quiz-loader"></div>

        <h2>Loading Quiz...</h2>
      </div>
    );
  }

  /* =========================================
     NO QUESTIONS
  ========================================= */

  if (questions.length === 0) {
    return (
      <div className="quiz-loading-screen">
        <h2>No Questions Found</h2>
      </div>
    );
  }

  /* =========================================
     CURRENT QUESTION
  ========================================= */

  const question = questions[currentQuestion];

  /* =========================================
     HANDLE ANSWER
  ========================================= */

  const handleAnswer = (index) => {
    if (showAnswer) return;

    setSelectedAnswer(index);

    setShowAnswer(true);

    if (Number(index) === Number(question.correctOption)) {
      setScore((prev) => prev + (question.points || 10));
    }
  };

  /* =========================================
     NEXT QUESTION
  ========================================= */

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);

      setSelectedAnswer(null);

      setShowAnswer(false);

      setTimeLeft(question.timeLimit || 15);
    } else {
      navigate("/result", {
        state: {
          score,

          totalQuestions: questions.length,

          category,
        },
      });
    }
  };

  /* =========================================
     OPTION CLASS
  ========================================= */

  const getOptionClass = (index) => {
    if (!showAnswer) return "quiz-option";

    if (Number(index) === Number(question.correctOption)) {
      return "quiz-option correct";
    }

    if (selectedAnswer === index) {
      return "quiz-option wrong";
    }

    return "quiz-option";
  };

  /* =========================================
     TIMER COLOR
  ========================================= */

  const timerClass = timeLeft <= 5 ? "danger" : timeLeft <= 10 ? "warning" : "";

  return (
    <div className="quiz-page">
      <Navbar />

      <div className="quiz-wrapper">
        {/* TOP */}

        <div className="quiz-top">
          <div>
            <div className="quiz-category">{category}</div>

            <h2>
              Question {currentQuestion + 1}/{questions.length}
            </h2>
          </div>

          <div className={`quiz-timer ${timerClass}`}>
            <FiClock />

            {timeLeft}
          </div>
        </div>

        {/* PROGRESS */}

        <div className="quiz-progress">
          <div
            className="quiz-progress-fill"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* SCORE */}

        <div className="quiz-score">
          <FiAward />
          Score:
          <span>{score}</span>
        </div>

        {/* QUESTION */}

        <div className="quiz-card">
          <h1 className="quiz-question">{question.question}</h1>

          {/* OPTIONS */}

          <div className="quiz-options">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={getOptionClass(index)}
                onClick={() => handleAnswer(index)}
              >
                <div className="option-left">
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span>{option.text}</span>
                </div>

                <div>
                  {showAnswer &&
                    Number(index) === Number(question.correctOption) && (
                      <FiCheck />
                    )}

                  {showAnswer &&
                    selectedAnswer === index &&
                    Number(index) !== Number(question.correctOption) && <FiX />}
                </div>
              </button>
            ))}
          </div>

          {/* EXPLANATION */}

          {showAnswer && (
            <div className="quiz-explanation">💡 {question.explanation}</div>
          )}

          {/* BUTTON */}

          {showAnswer && (
            <button className="next-btn" onClick={nextQuestion}>
              {currentQuestion + 1 === questions.length
                ? "Finish Quiz"
                : "Next Question"}

              <FiArrowRight />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
