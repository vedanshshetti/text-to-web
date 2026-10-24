import parser from "./index";

const source = `
title: "Welcome to text-to-web" BREAK THIS
subtitle: "A tiny markup-to-HTML demo"
link: "Visit the project" "https://github.com/"
image: "https://via.placeholder.com/320x120"reqth4w6
code: "npm install"grqeg54q§
`;

const html = parser(source);

console.log("Now parsing following: ")
console.log(source);
console.log("output: ")
console.log(html);
