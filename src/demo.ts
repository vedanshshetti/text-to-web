import parser from "./index.ts";

console.log(parser(
`
title: "My App"
subtitle: "something"
link: "this is google"@"https://google.com"
image: "https://avatars.githubusercontent.com/u/253360210?v=4&size=64" ${""/* This is just my profile picture, wasn't sure what to use as an example, feel free to change. */}
bold: "bold text"

text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Debitis sequi corrupti iure
fugit cupiditate molestias dicta nostrum soluta officia dolores eveniet optio a
eaque quia ipsam necessitatibus at, quisquam illo provident ab veniam commodi?
Officia quod nobis laboriosam tempora!
Eveniet maiores quisquam rerum dignissimos illo obcaecati unde nobis hic ipsam saepe, sunt,
similique aspernatur neque, nemo officiis magni. Soluta animi itaque doloribus ut cum,
ipsam quae veniam hic reiciendis modi quis possimus laboriosam adipisci, dolore corrupti
debitis tempora reprehenderit quas suscipit ullam! Minima accusantium ipsam dolorem placeat
reiciendis sed ut eligendi, eum assumenda odit mollitia, est dolores impedit quibusdam corrupti?"
`
))