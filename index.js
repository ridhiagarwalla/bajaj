import express from "express";

const app = express();
app.use(express.json());

// Your details
const FULL_NAME = "john_doe";
const DOB = "17091999"; // ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

// Function to process data
function processData(data) {
  let odd_numbers = [];
  let even_numbers = [];
  let alphabets = [];
  let special_characters = [];
  let sum = 0;
  let allAlphabets = [];

  data.forEach((item) => {
    if (/^-?\d+$/.test(item)) {
      let num = parseInt(item);
      if (num % 2 === 0) even_numbers.push(item);
      else odd_numbers.push(item);
      sum += num;
    } else if (/^[a-zA-Z]+$/.test(item)) {
      alphabets.push(item.toUpperCase());
      allAlphabets.push(item);
    } else {
      special_characters.push(item);
    }
  });

  let concat_string = allAlphabets
    .join("")
    .split("")
    .reverse()
    .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");

  return {
    is_success: true,
    user_id: `${FULL_NAME}_${DOB}`,
    email: EMAIL,
    roll_number: ROLL_NUMBER,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum: sum.toString(),
    concat_string,
  };
}

// Route
app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ is_success: false, error: "Invalid input" });
    }
    res.status(200).json(processData(data));
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// Local testing
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
