import { useState, useEffect, useCallback } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerRunning, setTimerRunning] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [powerUps, setPowerUps] = useState({
    "50-50": 1,
    skip: 1,
    hint: 2,
  });

  const currentQuestion = questions[currentQuestionIndex];

  // Timer
  useEffect(() => {
    let interval = null;

    if (timerRunning && timeLeft > 0 && !isAnswered) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isAnswered) {
      handleTimeUp();
    }

    return () => clearInterval(interval);
  }, [timerRunning, timeLeft, isAnswered]);

  const startQuiz = useCallback(
    async (category, mode = "classic", difficulty = null) => {
      try {
        const { data } = await API.post("/quizzes/start", {
          category,
          mode,
          difficulty,
          limit: 10,
        });

        setQuestions(data.questions);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setScore(0);
        setStreak(0);
        setTimeLeft(15);
        setTimerRunning(true);
        setQuizCompleted(false);
        setQuizResult(null);
        setPowerUps({ "50-50": 1, skip: 1, hint: 2 });

        toast.success(`Started ${category} quiz! 🎯`);
        return data;
      } catch (error) {
        toast.error(error.response?.data?.error || "Failed to start quiz");
        throw error;
      }
    },
    [],
  );

  const answerQuestion = useCallback(
    (optionIndex) => {
      if (isAnswered) return;

      setSelectedOption(optionIndex);
      setIsAnswered(true);
      setTimerRunning(false);

      const isCorrect = optionIndex === currentQuestion.correctOption;

      if (isCorrect) {
        const timeBonus = timeLeft >= 10 ? 5 : timeLeft >= 5 ? 3 : 1;
        const streakBonus = streak * 2;
        const points = currentQuestion.points + timeBonus + streakBonus;
        setScore((prev) => prev + points);
        setStreak((prev) => prev + 1);
        toast.success(`Correct! +${points} points`);
      } else {
        setStreak(0);
        toast.error("Wrong answer!");
      }

      // Auto advance after 2 seconds
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          nextQuestion();
        } else {
          completeQuiz();
        }
      }, 2000);
    },
    [
      isAnswered,
      currentQuestion,
      timeLeft,
      streak,
      currentQuestionIndex,
      questions.length,
    ],
  );

  const nextQuestion = useCallback(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(15);
    setTimerRunning(true);
    setCurrentQuestionIndex((prev) => prev + 1);
  }, []);

  const usePowerUp = useCallback(
    (type) => {
      if (powerUps[type] <= 0) {
        toast.error(`No ${type} power-ups left!`);
        return;
      }

      setPowerUps((prev) => ({ ...prev, [type]: prev[type] - 1 }));

      if (type === "50-50") {
        toast.success("50-50 activated! 2 wrong answers removed.");
      } else if (type === "skip") {
        toast.success("Skipped!");
        nextQuestion();
      } else if (type === "hint") {
        toast.success("Hint: Check the explanation after answering!");
      }
    },
    [powerUps, nextQuestion],
  );

  const handleTimeUp = useCallback(() => {
    setTimerRunning(false);
    setIsAnswered(true);
    setStreak(0);
    toast.error("Time up!");

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        nextQuestion();
      } else {
        completeQuiz();
      }
    }, 2000);
  }, [currentQuestionIndex, questions.length, nextQuestion]);

  const completeQuiz = useCallback(async () => {
    setTimerRunning(false);
    setQuizCompleted(true);

    try {
      const accuracy = (score / (currentQuestionIndex + 1) / 10) * 100;

      const { data } = await API.post("/quizzes/submit", {
        category: currentQuestion?.category,
        mode: "classic",
        score,
        accuracy: accuracy.toFixed(2),
        correctAnswers: questions.filter(
          (_, idx) =>
            idx === currentQuestionIndex &&
            selectedOption === currentQuestion.correctOption,
        ).length,
        totalQuestions: questions.length,
      });

      setQuizResult(data);
      toast.success(`Quiz completed! Score: ${score}`);
      return data;
    } catch (error) {
      toast.error("Failed to submit quiz");
    }
  }, [
    score,
    currentQuestionIndex,
    questions.length,
    selectedOption,
    currentQuestion,
  ]);

  const resetQuiz = useCallback(() => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setTimeLeft(15);
    setTimerRunning(false);
    setQuizCompleted(false);
    setQuizResult(null);
    setPowerUps({ "50-50": 1, skip: 1, hint: 2 });
  }, []);

  return {
    questions,
    currentQuestion,
    currentQuestionIndex,
    selectedOption,
    isAnswered,
    score,
    streak,
    timeLeft,
    timerRunning,
    quizCompleted,
    quizResult,
    powerUps,
    startQuiz,
    answerQuestion,
    nextQuestion,
    usePowerUp,
    completeQuiz,
    resetQuiz,
    totalQuestions: questions.length,
  };
};

export default useQuiz;
