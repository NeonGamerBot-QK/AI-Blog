import { createStatement } from "./util/prompts"

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const statement = createStatement()
openai.createCompletion({
	model: "text-davinci-003",
	prompt: statement,
	temperature: 1,
	max_tokens: 4000
}).then(result => {
//.. test statement here
let res = result.data.choices as any
// 
console.log(JSON.parse(res[0].text as string))
})
