require('dotenv').config();

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public')); 

app.get('/getAdvice', async (req, res) => {
    const userQuestion = req.query.question || "You are the all-knowing Egg God, mighty haughty and impatient. Admonish me then give me one piece of practical, eclectic, herbal, natural, or exotic hangover advice in less than 60 words"
    //if you just click egg image, there will be no req.query.question, it's just 
    // a plain /getAdvice request, and it will default to the string above

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userQuestion}],
            max_tokens: 60
        },{
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });

        res.json({ advice: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("Error calling OpenAI API from server.js", error);
        res.status(500).json({ advice: "EggBot is scrambled... :( Try again later. [[backend error catch]]" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})