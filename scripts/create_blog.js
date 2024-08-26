const openai = require("openai");
const fs = require("fs");
const path = require("path");

const gpt = new openai.OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

(async () => {
  const response = await gpt.chat.completions
    .create({
      messages: [
        {
          role: "system",
          content:
            "Create an AI article on any topic that is SFW. Respond in JSON. Schema the json with properties artcle which is the artcle content structured in paragraphs and titles. tags which is an array with tags related to the article.  Title related to the article.  topic which tells me what the topic of the article is. No code block.",
        },
      ],
      model: "gpt-4o",
    })
    .then((r) => JSON.parse(r.choices[0].message.content));
  console.log(response);
  const img_response = await gpt.images.generate({
    model: "dall-e-3",
    prompt: "an image for an article about: " + response.topic,
    n: 1,
    size: "1792x1024",
  });
  let image_url = img_response.data[0].url;
  console.log(image_url);
  response.img = "/blog.png";
  fetch(image_url)
    .then((r) => r.arrayBuffer())
    .then((abuff) =>
      fs.writeFileSync(
        process.env.OUT_DIR
          ? path.resolve(process.env.OUT_DIR, "blog.png")
          : path.resolve(__dirname, "../public/blog.png"),
        Buffer.from(abuff),
      ),
    );
  response.generated_at = Date.now();
  response.expires_at = Date.now() + 1000 * 60 * 60 * 24 * 7;
  fs.writeFileSync(
    process.env.OUT_DIR
      ? path.resolve(process.env.OUT_DIR, "blog.json")
      : path.resolve(__dirname, "../public/blog.json"),
    Buffer.from(JSON.stringify(response, null, 2)),
  );
})().catch(console.error);
