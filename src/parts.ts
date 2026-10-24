function eTitle(input: string) {
    const headerText = input
        .trim()
        .split("title: \"")[1]
        .split("\"")[0];
    return({
        i: headerText.trim().length > 0 ? headerText : "",
        continue: input.split(`${headerText}\"`)[1]
    })
}

function eSubtitle(input: string) {
    const headerText = input
        .trim()
        .split("subtitle: \"")[1]
        .split("\"")[0];
    return({
        i: headerText.trim().length > 0 ? headerText : "",
        continue: input.split(`${headerText}\"`)[1]
    })
}

function eImage(input: string) {
    const x = input
        .trim()
        .split("image: \"")[1]
        .split("\"")[0];
    return {
        i: `<img src="${x}" alt="Image Alt Text">`,
        continue: input.split(`${x}\"`)[1]
    }
}   

// eLink was made using GitHub Copilot - GPT-5.6-Luna, only god and/or real software engineers know what this does
function eLink(input: string) {
    const start = input.indexOf('link: "') + 'link: "'.length;
    const textEnd = input.indexOf('"', start);
    const urlStart = input.indexOf('"', textEnd + 1) + 1;
    const urlEnd = input.indexOf('"', urlStart);
    const text = input.slice(start, textEnd);
    const url = input.slice(urlStart, urlEnd);
    const tag = `<a href="${url}">${text}</a>`;
    return {
        i: tag,
        continue: input.slice(urlEnd + 1)
    }
}

function eCode(input: string) {
    const x = input
        .trim()
        .split("code: \"")[1]
        .split("\"")[0];
    return({
        i: `<span style="font-family: monospace; color: #076300;">${x}</span>`,
        continue: input.split(`${x}\"`)[1]
    })
}

function eItalic(input: string) {
    const x = input
        .trim()
        .split("italic: \"")[1]
        .split("\"")[0];
    return({
        i: `<i>${x}</i>`,
        continue: input.split(`${x}\"`)[1]
    })
}

function eBold(input: string) {
    const x = input
        .trim()
        .split("italic: \"")[1]
        .split("\"")[0];
    return({
        i: `<strong>${x}</strong>`,
        continue: input.split(`${x}\"`)[1]
    })
}


export function extract(what: "title" | "subtitle" | "image" | "link" | "code" | "italic" | "bold", input: string): {i: string, continue: string} {
    try {
        switch(what) {
        case "title":
            return eTitle(input);
        case "subtitle":
            return eSubtitle(input);
        case "image":
            return eImage(input);
        case "link":
            return eLink(input);
        case "code":
            return eCode(input);
        case "italic":
            return eItalic(input);
        case "bold":
            return eBold(input);
        default:
            return {
                i: "",
                continue: input
            }
        }
    } catch (e) {
        console.error(e);
        return {
                i: "",
                continue: input
            };
    }
}
