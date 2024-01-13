import { Configuration, OpenAIApi } from "openai-api";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(Configuration);

export default openai;