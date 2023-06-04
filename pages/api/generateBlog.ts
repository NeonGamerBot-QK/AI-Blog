import { createStatement, Prompt, getAdj, getSubject, Subject } from "../../util/prompts"

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
type Data = {
	img: string,
	title: string;
	articleText: string,
	promptsUsed: Prompt[]
}

type ResponseInfo = {
	status: number,	
	data?: Data,
	error?: string
}

function handleServerSideAuth(req: NextApiRequest) {
	
	const authToken:string | null = req.query.auth ? req.query.auth as string : req.headers.authorization ? req.headers.authorization as string : null;
	const passwords = process.env.PASSWORDS ? process.env.PASSWORDS.split(":") : []
	if(!authToken) return false;
	
	if(!passwords.some(e => e.includes(authToken))) return false;
	return true;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseInfo>
) {
	if(!handleServerSideAuth(req)) {
		return res.status(401).send({ status:401, error: "Invalid authorisation" })
	}

	const adj = getAdj();
	const subject:Subject = getSubject()
	const statement = createStatement(adj, subject)
	const img_prompt = subject.matching_image // i forgo
	const {T: text, B:body} = await openai.createCompletion({
model: "text-davinci-003",
	prompt: statement,
	temperature: 1,
	max_tokens: 4000
	}).then(e=>JSON.parse(e.data.choices[0].text as string))
	const img_url = await openai.createImage({
  prompt: img_prompt,
  n: 1,
  size: "1024x1024",
}).then(response => response.data.data[0].url as string)
	res.send({
		status: 200,
	data: {
		title: text,
		promptsUsed: [adj, subject.data],
		articleText: body,
		img: img_url
	}	
	})
}
