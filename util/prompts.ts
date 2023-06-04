export type Subject = {
	data: string;
	index: number;
	matching_image: Prompt;
}
export type Prompt = string;
export const adjectives:Prompt[] = [
"intresting",
"terriable",
"depressaing",
"exciting",
"angry",
"sad",
"emotional"
]
export const img_subjects:Prompt[] = [
	"an img of a man or woman eating ice cream",
	"an image of a goverment building",
	"a picture of multiple USA dollars",
	"a picture of a stock img of stocks",
	"A picture of a crypto coin",
	"a picture of the replit logo",
	"a picture of google",
	"a picture of amazon the company",
	"a picture of any type of spanish food",
	"a picture of aged beef",
	"a picture of a ski slope with someone on it",
	"a picture of the open ai logo"
]
export function createSubject(item: string, index: number):Subject {
	return {
		data: item,
		index,
		matching_image: img_subjects[index]
	} as Subject
}
export const subjects :Subject[] = [
	"ice cream",
	"goverment",
	"economics",
	"stock market",
	"crypto",
	"replit",
	"google",
	"amazon",
	"spanish food",
	"aged beef",
	"steak",
	"skiing",
	"openai"
].map((e, ind) => createSubject(e, ind))

export function createStatement(adj:Prompt = getAdj(), subject:Subject= getSubject()) {
	return `Create ${["e", "a", "i"].some(e => adj.startsWith(e)) ? "an " : " a "} ${adj} article on the topic of ${subject.data}. include a title and a body. Format the body in html. Format in 
 the following parsable json format:
 {
 "T": "title",
 "B": "body"
 }`
}
export function getRandom(arr: any[]): any {
	const length:number = arr.length;
	const index = Math.round(Math.random() * length);
	return arr[index];
}
export function getAdj(): Prompt {
	return getRandom(adjectives);
}
export function getSubject(): Subject {
	return getRandom(subjects);
}