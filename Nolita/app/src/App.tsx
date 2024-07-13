import React from "react";
import "./App.css";
import { listenToStream } from "./lib/events";
import charizard from "/assets/charizard.png";
import { CardInfo, defaultCardInfo } from "../../../Cards";
import Card from "./components/Card";

function App() {
  // You can change the URL to any website for the objective.
  const [url, setUrl] = React.useState("");
  const [cardInfo, setCardInfo] = React.useState<CardInfo>(defaultCardInfo);
  const [loading, setLoading] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const fileTypes = [
    "R",
    "apple",
    "argdown",
    "asm",
    "audio",
    "babel",
    "bazel",
    "bicep",
    "bower",
    "bsl",
    "c-sharp",
    "c",
    "cake",
    "cake_php",
    "checkbox-unchecked",
    "checkbox",
    "cjsx",
    "clock",
    "clojure",
    "code-climate",
    "code-search",
    "coffee",
    "coffee_erb",
    "coldfusion",
    "config",
    "cpp",
    "crystal",
    "crystal_embedded",
    "css",
    "csv",
    "cu",
    "d",
    "dart",
    "db",
    "default",
    "deprecation-cop",
    "docker",
    "editorconfig",
    "ejs",
    "elixir",
    "elixir_script",
    "elm",
    "error",
    "eslint",
    "ethereum",
    "f-sharp",
    "favicon",
    "firebase",
    "firefox",
    "folder",
    "font",
    "git",
    "git_folder",
    "git_ignore",
    "github",
    "gitlab",
    "go",
    "go2",
    "godot",
    "gradle",
    "grails",
    "graphql",
    "grunt",
    "gulp",
    "hacklang",
    "haml",
    "happenings",
    "haskell",
    "haxe",
    "heroku",
    "hex",
    "html",
    "html_erb",
    "ignored",
    "illustrator",
    "image",
    "info",
    "ionic",
    "jade",
    "java",
    "javascript",
    "jenkins",
    "jinja",
    "js_erb",
    "json",
    "julia",
    "karma",
    "kotlin",
    "less",
    "license",
    "liquid",
    "livescript",
    "lock",
    "lua",
    "makefile",
    "markdown",
    "maven",
    "mdo",
    "mustache",
    "new-file",
    "nim",
    "notebook",
    "npm",
    "npm_ignored",
    "nunjucks",
    "ocaml",
    "odata",
    "pddl",
    "pdf",
    "perl",
    "photoshop",
    "php",
    "pipeline",
    "plan",
    "platformio",
    "powershell",
    "prisma",
    "project",
    "prolog",
    "pug",
    "puppet",
    "purescript",
    "python",
    "rails",
    "react",
    "reasonml",
    "rescript",
    "rollup",
    "ruby",
    "rust",
    "salesforce",
    "sass",
    "sbt",
    "scala",
    "search",
    "settings",
    "shell",
    "slim",
    "smarty",
    "spring",
    "stylelint",
    "stylus",
    "sublime",
    "svelte",
    "svg",
    "swift",
    "terraform",
    "tex",
    "time-cop",
    "todo",
    "tsconfig",
    "twig",
    "typescript",
    "vala",
    "video",
    "vue",
    "wasm",
    "wat",
    "webpack",
    "wgt",
    "windows",
    "word",
    "xls",
    "xml",
    "yarn",
    "yml",
    "zig",
    "zip"
  ];
  const fileTypeToPath = (fileType: string) => {
    return `/assets/icons/${fileType}.svg`;
  };
  const start = async () => {
    setLoading(true);
    const cards = await listenToStream(url);
    setCardInfo(cards);
    setLoaded(true);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="items-center min-h-screen justify-center space-y-4 p-8">
        <div className="flex flex-col space-y-4 max-w-screen-md border p-4">
          <p> Enter a url to generate card: </p>
          <input className="border " type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button className="bg-gray-200 p-1" disabled={loaded} onClick={() => start()}>
            {loading ? "Loading..." : "Start"}
          </button>
        </div>

        {/* {cardInfo && <p>Card Info: {JSON.stringify(cardInfo)} </p>} */}
        <div className="flex justify-center items-center">
          {loaded ? <Card {...cardInfo} imageUrl={loaded ? charizard : ""} svgPath={fileTypeToPath(fileTypes[Math.floor(Math.random() * fileTypes.length)])} /> :
            loading ? <div className="loading loading-spinner loading-lg"></div> : ""
          }
        </div>
      </div> </div>
  );
}

export default App;
