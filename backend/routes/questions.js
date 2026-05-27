const express = require("express");

const router = express.Router();

const data = require("../data/questions.json");

/* =========================================
   GET ALL CATEGORIES
========================================= */

router.get("/categories", (req, res) => {
  try {
    const categories = Object.keys(data.categories);

    res.json({
      success: true,
      total: categories.length,
      categories,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
    });
  }
});

/* =========================================
   GET QUESTIONS BY CATEGORY
========================================= */

router.get("/category/:category", (req, res) => {
  try {
    const category = req.params.category.toLowerCase();

    console.log("Requested Category:", category);

    /* CATEGORY QUESTIONS */

    const questions = data.categories[category];

    /* CATEGORY NOT FOUND */

    if (!questions || questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found",
      });
    }

    /* SHUFFLE QUESTIONS */

    const shuffled = [...questions].sort(() => Math.random() - 0.5);

    /* SEND 10 QUESTIONS */

    const selected = shuffled.slice(0, 10);

    res.json({
      success: true,
      category,
      total: selected.length,
      questions: selected,
    });
  } catch (error) {
    console.log("Questions Route Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

module.exports = router;
