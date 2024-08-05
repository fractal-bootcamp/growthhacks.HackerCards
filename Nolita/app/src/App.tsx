import { useEffect, useState } from "react";
import "./App.css";

import { listenToStream } from "./lib/events";
import { CardInfo, fakeCardInfo } from "../../../Cards";
import Card from "./components/Card";
const fileTypeToPath = (fileType: string) => {
  return `/assets/icons/${fileType}.svg`;
};
//list of valid file types for looking up svg icons
// const fileTypes = [
//   "R",
//   "apple",
//   "argdown",
//   "asm",
//   "audio",
//   "babel",
//   "bazel",
//   "bicep",
//   "bower",
//   "bsl",
//   "c-sharp",
//   "c",
//   "cake",
//   "cake_php",
//   "checkbox-unchecked",
//   "checkbox",
//   "cjsx",
//   "clock",
//   "clojure",
//   "code-climate",
//   "code-search",
//   "coffee",
//   "coffee_erb",
//   "coldfusion",
//   "config",
//   "cpp",
//   "crystal",
//   "crystal_embedded",
//   "css",
//   "csv",
//   "cu",
//   "d",
//   "dart",
//   "db",
//   "default",
//   "deprecation-cop",
//   "docker",
//   "editorconfig",
//   "ejs",
//   "elixir",
//   "elixir_script",
//   "elm",
//   "error",
//   "eslint",
//   "ethereum",
//   "f-sharp",
//   "favicon",
//   "firebase",
//   "firefox",
//   "folder",
//   "font",
//   "git",
//   "git_folder",
//   "git_ignore",
//   "github",
//   "gitlab",
//   "go",
//   "go2",
//   "godot",
//   "gradle",
//   "grails",
//   "graphql",
//   "grunt",
//   "gulp",
//   "hacklang",
//   "haml",
//   "happenings",
//   "haskell",
//   "haxe",
//   "heroku",
//   "hex",
//   "html",
//   "html_erb",
//   "ignored",
//   "illustrator",
//   "image",
//   "info",
//   "ionic",
//   "jade",
//   "java",
//   "javascript",
//   "jenkins",
//   "jinja",
//   "js_erb",
//   "json",
//   "julia",
//   "karma",
//   "kotlin",
//   "less",
//   "license",
//   "liquid",
//   "livescript",
//   "lock",
//   "lua",
//   "makefile",
//   "markdown",
//   "maven",
//   "mdo",
//   "mustache",
//   "new-file",
//   "nim",
//   "notebook",
//   "npm",
//   "npm_ignored",
//   "nunjucks",
//   "ocaml",
//   "odata",
//   "pddl",
//   "pdf",
//   "perl",
//   "photoshop",
//   "php",
//   "pipeline",
//   "plan",
//   "platformio",
//   "powershell",
//   "prisma",
//   "project",
//   "prolog",
//   "pug",
//   "puppet",
//   "purescript",
//   "python",
//   "rails",
//   "react",
//   "reasonml",
//   "rescript",
//   "rollup",
//   "ruby",
//   "rust",
//   "salesforce",
//   "sass",
//   "sbt",
//   "scala",
//   "search",
//   "settings",
//   "shell",
//   "slim",
//   "smarty",
//   "spring",
//   "stylelint",
//   "stylus",
//   "sublime",
//   "svelte",
//   "svg",
//   "swift",
//   "terraform",
//   "tex",
//   "time-cop",
//   "todo",
//   "tsconfig",
//   "twig",
//   "typescript",
//   "vala",
//   "video",
//   "vue",
//   "wasm",
//   "wat",
//   "webpack",
//   "wgt",
//   "windows",
//   "word",
//   "xls",
//   "xml",
//   "yarn",
//   "yml",
//   "zig",
//   "zip"
// ];
function App() {
  // You can change the URL to any website for the objective.
  const [url, setUrl] = useState("");
  const [clock, setClock] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setClock(clock + 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [clock]);
  const [cardInfo, setCardInfo] = useState<CardInfo>(fakeCardInfo);
  const [loading, setLoading] = useState(false);
  const start = async () => {
    setLoading(true);
    // setCardInfo(null);
    const cards = await listenToStream(url);
    setCardInfo(cards);
    setLoading(false);
  };

  return (
    <div className="items-center min-h-screen justify-center space-y-4 p-8">
      <div className="flex flex-col space-y-4 max-w-screen-md border p-4">
        <p> Enter a url to generate card: </p>
        <input
          className="border "
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
        <button
          className="bg-gray-200 p-1"
          disabled={loading}
          onClick={() => start()}
        >
          {loading ? "Working..." : "Start"}
        </button>
      </div>
      {cardInfo && (
        <Card
          {...cardInfo}
          // imageUrl={"/assets/charizard.png"}
          // svgPath={fileTypeToPath(fileTypes[clock % fileTypes.length])}
          svgPath={fileTypeToPath(cardInfo.fileType)}
        />
      )}
      {/* {cardInfo && <p>Card Info: {JSON.stringify(cardInfo)} </p>} */}
    </div>
  );
}

export default App;
