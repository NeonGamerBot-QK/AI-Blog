import { formatUptime } from "@neongamerbot/utils";
import React, { useEffect, useState } from "react";
type Article = {
  title: string;
  content: string;
};
interface Blog {
  title: string;
  article: Article[];
  topic: string;
  tags: string[];
  img: string;
  created_at: number;
  expires_at: number;
}
function Countdown({ date }: { date: number }) {
  const ndate = Date.now();
  const [uptime, setUptime] = useState<number[]>(
    formatUptime(Math.round((date - ndate) / 1000))
      .split(/ +/)
      .map((w) => parseInt(w.replaceAll(/(d|s|h|m)/g, ""))),
  );
  useEffect(() => {
    const ti = setTimeout(() => {
      console.log(uptime);
      setUptime(
        formatUptime(Math.round((date - ndate) / 1000))
          .split(/ +/)
          .map((w) => parseInt(w.replaceAll(/(d|s|h|m)/g, ""))),
      );
    }, 1000);
    return () => clearTimeout(ti);
  });
  if (uptime[0] < 0) return <p></p>;
  return (
    <>
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div
          className="flex flex-col p-2  rounded-box  text-primary"
          style={{ background: "var(--surface0)" }}
        >
          <span className="countdown font-mono text-5xl text-primary ">
            {/* @ts-ignore */}
            <span style={{ "--value": uptime[0] }}></span>
          </span>
          days
        </div>
        <div
          className="flex flex-col p-2  rounded-box  text-primary"
          style={{ background: "var(--surface0)" }}
        >
          <span className="countdown font-mono text-5xl text-primary">
            {/* @ts-ignore */}
            <span style={{ "--value": uptime[1] }}></span>
          </span>
          hours
        </div>
        <div
          className="flex flex-col p-2  rounded-box  text-primary"
          style={{ background: "var(--surface0)" }}
        >
          <span className="countdown font-mono text-5xl text-primary">
            {/* @ts-ignore */}
            <span style={{ "--value": uptime[2] }}></span>
          </span>
          min
        </div>
        <div
          className="flex flex-col p-2  rounded-box  text-primary"
          style={{ background: "var(--surface0)" }}
        >
          <span className="countdown font-mono text-5xl text-primary">
            {/* @ts-ignore */}
            <span style={{ "--value": uptime[3] }}></span>
          </span>
          sec
        </div>
      </div>
    </>
  );
}
function App() {
  const [data, setData] = useState<null | Blog>(null);
  useEffect(() => {
    fetch("./blog.json")
      .then((res) => res.json())
      .then((d) => setData(d as Blog));
  }, []);
  if (data?.title) document.title = data.title;
  return (
    <div className="hero min-h-screen" style={{ background: "var(--base)" }}>
      <div className="hero-content text-center">
        <div className="max-w-md md:max-w-xl">
          {data ? (
            <>
              <figure>
                <img
                  src={"." + data.img}
                  alt="Blog"
                  className="rounded-lg shadow-lg"
                />
              </figure>
              <h1 className="text-5xl font-bold">{data.title}</h1>
              <div className="">
                {data.tags.map((t, i) => {
                  return (
                    <span key={i} className="badge badge-primary m-2">
                      {t}
                    </span>
                  );
                })}
              </div>
              <div className="grid">
                {data.article.map((article, i) => (
                  <div
                    key={i}
                    className="card shadow-lg bg-base-300 text-base-content mt-4"
                  >
                    <div className="card-body">
                      <h2 className="card-title">{article.title}</h2>
                      <p>{article.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <footer className="mt-10">
                <p>
                  <b>
                    <i>All content is AI generated !</i>
                  </b>
                </p>
                <p>
                  {" "}
                  Made by{" "}
                  <a
                    style={{
                      textDecoration: "underline",
                      color: "var(--blue)",
                    }}
                    href="https://saahild.com"
                  >
                    Saahil
                  </a>
                </p>
                <div className="items-center justify-center place-items-center ml-24 mt-2">
                  <Countdown date={data.expires_at || Date.now()} />
                </div>
                <p className="pt-2 pr-10">Till next article</p>
              </footer>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
