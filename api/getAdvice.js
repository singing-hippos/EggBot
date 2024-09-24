import axios from 'axios';

export default async function handler(req, res) {
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

        res.status(200).json({ advice: response.data.choices[0].message.content.trim() });
    } catch (error) {
        console.error("Error calling OpenAI API from getAdvice.js", error.response?.data || error.message);
        res.status(500).json({ advice: "EggBot is scrambled... :( Try again later. [[backend error catch]]" });
    }
}
