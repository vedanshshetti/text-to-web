import parser from "./index.js";

console.log(parser(
`
title: "My App"
subtitle: "something"
link: "this is google"@"https://google.com"
image: "https://avatars.githubusercontent.com/u/253360210?v=4&size=64" ${""/* This is just my profile picture, wasn't sure what to use as an example, feel free to change. */}
bold: "bold text"
`
))