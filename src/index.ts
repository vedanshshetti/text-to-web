import { extract } from "./parts.js";
import { createHTMLStructure, defaultStylesheet } from "./stuff.js";


export default function parser(input: string) {
    const title = extract("title", input).i;
    const subtitle = extract("subtitle", input).i;
    const body: string[] = [];
    const style = defaultStylesheet;
    while(input && (input.includes("image: \"") || input.includes("link: \"") || input.includes("code: \"") || input.includes("italic: \"") || input.includes("bold: \""))) {
        const imageIndex = input.indexOf('image: "');
        const linkIndex = input.indexOf('link: "');
        const codeIndex = input.indexOf('code: "');
        const italicIndex = input.indexOf('italic: "');
        const boldIndex = input.indexOf('bold: "');
        const m = Math.min(...([imageIndex, linkIndex, codeIndex, italicIndex, boldIndex].filter(i => i!==-1)));
        const temp = m !== imageIndex
            ? m !== linkIndex
                ? m !== italicIndex
                    ? m !== boldIndex
                        ? extract("code", input)
                        : extract("bold", input)
                    : extract("italic", input)
                : extract("link", input)
            : extract("image", input)
        body.push(temp.i);
        if (temp.continue === input) {
            break;
        }
        input = temp.continue;
    }
    return createHTMLStructure(title, subtitle, style, body.join("\n"));
}