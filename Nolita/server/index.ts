import express, { text } from "express";
import path from "path";
import agent from "../agent";
import { Browser, Logger } from "nolita";
import inventory from "../extensions/inventory";
import { CustomSchema } from "../extensions/schema";
import { nolitarc } from "../agent/config";
import "dotenv/config";
import { fileURLToPath } from "url";
import { z } from "zod";
// add dirname var for esm
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { hdrApiKey } = nolitarc();

const app = express();
const port = process.env.NODE_ENV === "production" ? 80 : 8080;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${8080}`);
});

const cors = {
  origin: ["http://localhost:5173"],
  default: "http://localhost:5173",
};

app.all("*", function (req, res, next) {
  const origin = cors.origin.includes(req?.headers?.origin?.toLowerCase() || "")
    ? req.headers.origin
    : cors.default;
  res.header("Access-Control-Allow-Origin", origin);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// In prod, serve the front-end
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "../app/dist")));
}

app.get("/api/browse", async (req, res) => {
  //this is where you can watch the Nolita do the browser searc
  const browser = await Browser.launch(true, agent, undefined, {
    inventory,
    ...(process.env.HDR_API_KEY || hdrApiKey
      ? {
          endpoint: process.env.HDR_ENDPOINT || "https://api.hdr.is",
          apiKey: process.env.HDR_API_KEY || hdrApiKey,
        }
      : {}),
  });
  const page = await browser.newPage({});
  await page.goto(req.query.url as string);
  // const answer = await page.browse(req.query.objective, {
  //   schema: CustomSchema,
  //   maxTurns: parseInt(req.query.maxIterations as string) || 10,
  // });\
  //page.do command in natural language to the page
  // await page.do(req.query.objective);
  //page.get retrieve structured data which we update at schema.ts

  //
  // const answer = await page.get(
  //   "give me the summary of the last five posts this author made",
  //   CustomSchema,
  //   { mode: "html" }
  // );

  const answer = await page.get(
    "tell me the urls for all authors on the page",
    z.object({
      urls: z.array(z.string().url().describe("the author profile urls")),
    })
  );
  const urlArr: string[] = answer.urls;
  const urls: string[] = urlArr.slice(0, 9);

  console.log(urls);

  urls.forEach(async (url: string) => {
    const newPage = await browser.newPage();
    await newPage.goto(url);
    const cardContent = await newPage.get(
      "Summarize the topics of the stories",
      z.object({
        name: z.string().describe("Find the author's name"),
        // profileDescription: z
        //   .string()
        //   .describe(
        //     "Provide a description of a few sentences summarizing what the author has written about"
        //   ),
        summary: z
          .string()
          .describe(
            "Describe the summary of the stories in two sentences as though you were writing a description for a collectible card based on this profile"
          ),
        // imageUrl: z
        //   .string()
        //   .describe(
        //     "return the URL for the image tag where the alt text includes 'profile picture' with the author's profile image "
        //   ),
        ability1: z
          .string()
          .describe(
            "Give the user a special ability based on the topics they write about in one pithy phrase no longer than 5 words"
          ),
        ability2: z
          .string()
          .describe(
            "Give the user a second special ability based on the topics they write about in one pithy phrase no longer than 5 words"
          ),
        specialattack: z
          .string()
          .describe(
            "Give the user a special attack based on the topics they write about in one pithy phrase no longer than 4 words"
          ),
        weakness: z
          .string()
          .describe(
            "Give the user a special weakness based on the topics they write about in one pithy phrase no longer than 4 words"
          ),
        HP: z
          .number()
          .describe(
            "determine a number based on the number of articles written by the author"
          ),
        topics: z.array(z.string()).describe("The list of topics"),
        // fileType: z
        //   .string()
        //   .describe(
        //     "pick a filetype to associate the user with based on their profile: R, apple, argdown, asm, audio, babel, bazel, bicep, bower, bsl, c-sharp, c, cake, cake_php, checkbox-unchecked, checkbox, cjsx, clock, clojure, code-climate, code-search, coffee, coffee_erb, coldfusion, config, cpp, crystal, crystal_embedded, css, csv, cu, d, dart, db, default, deprecation-cop, docker, editorconfig, ejs, elixir, elixir_script, elm, error, eslint, ethereum, f-sharp, favicon, firebase, firefox, folder, font, git, git_folder, git_ignore, github, gitlab, go, go2, godot, gradle, grails, graphql, grunt, gulp, hacklang, haml, happenings, haskell, haxe, heroku, hex, html, html_erb, ignored, illustrator, image, info, ionic, jade, java, javascript, jenkins, jinja, js_erb, json, julia, karma, kotlin, less, license, liquid, livescript, lock, lua, makefile, markdown, maven, mdo, mustache, new-file, nim, notebook, npm, npm_ignored, nunjucks, ocaml, odata, pddl, pdf, perl, photoshop, php, pipeline, plan, platformio, powershell, prisma, project, prolog, pug, puppet, purescript, python, rails, react, reasonml, rescript, rollup, ruby, rust, salesforce, sass, sbt, scala, search, settings, shell, slim, smarty, spring, stylelint, stylus, sublime, svelte, svg, swift, terraform, tex, time-cop, todo, tsconfig, twig, typescript, vala, video, vue, wasm, wat, webpack, wgt, windows, word, xls, xml, yarn, yml, zig, zip "
        //   ),
      }),
      { mode: "html" }
    );

    return res.json(cardContent);

    // console.log("Card Content: ", cardContent);

    // const limitedPosts = postUrls.slice(0, 2);

    // const textArray: string[] = [];
    // const limitedUrls = postUrls.urls.slice(0, 3);

    // for (const postUrl of limitedUrls) {
    //   const postPage = await browser.newPage();
    //   await postPage.goto("https://google.com");
    //   await page.do(` enter into ${url} into the search bar and click enter`);
    //   await page.do("click on the first link");
    //   console.log(await postPage.content());
    // }

    // console.log(JSON.stringify(textArray));
  });

  //sequential promise resolving to map over one at a time
  //do a map sequentially
  // const collatedAuthorStuff = answer.map((e) => {
  //   await page.goto("...");
  //   const authAnswer = await page.get(
  //     "click on [x]'s page and summarise their posts"
  //   );
  //   return authAnswer;
  // });
});
