const mongoose = require("mongoose");

require("dotenv").config();

const Question = require("./models/Question");

const questionsData = require("./data/questions.json");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // DELETE OLD

    await Question.deleteMany();

    console.log("Old Questions Removed");

    let allQuestions = [];

    // LOOP ALL CATEGORIES

    Object.keys(questionsData.categories).forEach((category) => {
      const categoryQuestions = questionsData.categories[category];

      categoryQuestions.forEach((q) => {
        allQuestions.push({
          category,

          difficulty: q.difficulty || "easy",

          question: q.question,

          options: q.options,

          correctOption: q.correctOption,

          explanation: q.explanation,

          points: q.points || 10,

          timeLimit: q.timeLimit || 15,

          isActive: true,
        });
      });
    });

    await Question.insertMany(allQuestions);

    console.log(`✅ ${allQuestions.length} Questions Inserted`);

    process.exit();
  })
  .catch((err) => {
    console.log(err);
  });
