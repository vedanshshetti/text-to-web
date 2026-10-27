import { extract } from "./parts.js";
import { createHTMLStructure, defaultStylesheet } from "./stuff.js";

interface Indices {
  imageIndex: number;
  linkIndex: number;
  italicIndex: number;
  boldIndex: number;
  textIndex: number;
}

function getExtractedContent(m: number, indices: Indices, input: string) {
  const { imageIndex, linkIndex, italicIndex, boldIndex, textIndex } = indices;
  return m === imageIndex
    ? extract("image", input)
    : m === italicIndex
      ? extract("italic", input)
      : m === linkIndex
        ? extract("link", input)
        : m === boldIndex
          ? extract("bold", input)
          : m === textIndex
            ? extract("text", input)
            : extract("code", input);
}

export default function parser(input: string): string {
  const title = extract("title", input).i;
  const subtitle = extract("subtitle", input).i;
  const body: string[] = [];
  const style = defaultStylesheet;
  while (
    input &&
    (input.includes('image: "') ||
      input.includes('link: "') ||
      input.includes('code: "') ||
      input.includes('italic: "') ||
      input.includes('bold: "') ||
      input.includes('text: "'))
  ) {
    const imageIndex = input.indexOf('image: "');
    const linkIndex = input.indexOf('link: "');
    const italicIndex = input.indexOf('italic: "');
    const boldIndex = input.indexOf('bold: "');
    const textIndex = input.indexOf('text: "');
    const indices = {
      imageIndex,
      linkIndex,
      italicIndex,
      boldIndex,
      textIndex,
    };
    const m = Math.min(...Object.values(indices).filter((i) => i !== -1));
    const temp = getExtractedContent(m, indices, input);
    body.push(temp.i);
    if (temp.continue === input) {
      break;
    }
    input = temp.continue;
  }
  return createHTMLStructure(title, subtitle, style, body.join("\n"));
}
