import openai from './chatgpt'

const query = async (prompt: string, chatId: string, model: string) => {
  const res = await openai.chat.completions({
    messages: [{"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
    {"role": "user", "content": `${prompt}`}],
    model: model
  })
  .then((res)=> res.choices[0].text)
  .catch(           
    (err) => 
    `Error: ${err, message}`
  );
  
  return res;
}

export default query;