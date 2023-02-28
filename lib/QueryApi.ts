import openai from "./Chatgpt";

const Query = async (prompt: string, chatId: string, model: string) => {

    const res = await openai.createCompletion({
            model,
            prompt,
            temperature: 0.6,
            top_p: 1,
            max_tokens: 1000,
            frequency_penalty: 0,
            presence_penalty: 0, 
        })
        .then((res) => {
            res.data.choices[0].text
        })
        .catch((err) => `Something went wrong! ${err.message}`);
    
    
    return res;
}

export default Query;