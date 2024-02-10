import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Prompt } from '../util/prompts';
import { Parser } from 'html-to-react'
let called = false
const htmlToReactParser = new Parser();
type Data = {
	img: string,
	title: string;
	articleText: string,
	promptsUsed: Prompt[]
}

const Home: NextPage = () => {
	const [info, setInfo] =useState<null | Data>()
	const [error,setError]=useState<null | string>()
	const [reqStart, setReqStart] = useState<boolean>(false)
	
	console.log("excg")
	function startEvent() {
if((!info && !reqStart)) {
		
		console.log("start")
			setReqStart(true);
		fetch("/api/generateBlog", {
		// headers: {
		// 	Authorization: process.env.NEXT_PUBLIC_PASSWORDS.split(":")[0]
		// }	
		}).then(async r => {
   const txt = await r.text();
				console.log("request tzt", txt)

		return JSON.parse(txt)	}).then(json => {
	if(info) return;			console.log("fetch")
//alert(JSON.stringify(json));
			
	if(json.status === 200) setInfo(json.data as Data)
else setError(json.error)
		})
	}		
	}
	useEffect(() => {
	if (process.browser && !called) {
console.log("loaded")
		called = true;
		startEvent()
	} 
	}, [])
if(process.browser) window.onerror = e => setError(e as string)
 if(error) {
	 return (
		<div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Error</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-4xl font-bold">
	Error
	</h1>
<p className="mt-3 text-2xl text-red-500 text-bold">
         {error}
        </p>
	      </main>
			</div>
	 )
 }
	return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>{info?info.title : "Loading"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
	      {info ? <img src={info.img} /> : null}
        <h1 className="text-4xl font-bold">
		{info ? info.title : "Loading..."}
        </h1>

        <p className="mt-3 text-2xl text-gray-500">
          {info ? "This article is a(n) " + info.promptsUsed[0] + " " + info.promptsUsed[1] + " article. (info is used via GPT info is latest of 2021)" : "Loading..."}
        </p>
<div className="m-2 text-black rounded-xl shadow-lg hover:min-w-screen duration-500 transition ease text-center sm:w-full h-full md:w-full ">
	{
info ? htmlToReactParser.parse(info.articleText) : <p>Loading...</p>

	}
</div>
	      {/* <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-around sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and its API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://replit.com/site/hosting"
            className="mt-6 w-96 rounded-xl border p-6 text-left hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Your repl is deployed automatically on replit.com!
            </p>
          </a>
        </div>
	*/}
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://replit.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/replit.svg" alt="Replit Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home