type Extraction = {
    i: string;
    continue: string;
};

function extractQuoted(input: string, marker: string): { value: string; rest: string } | undefined {
    const start = input.indexOf(marker);
    if (start === -1) {
        return undefined;
    }

    const valueStart = start + marker.length;
    const valueEnd = input.indexOf('"', valueStart);
    if (valueEnd === -1) {
        return undefined;
    }

    return {
        value: input.slice(valueStart, valueEnd),
        rest: input.slice(valueEnd + 1)
    };
}

function eTitle(input: string): Extraction {
    const result = extractQuoted(input, 'title: "');
    return {
        i: result?.value.trim() ?? "",
        continue: result?.rest ?? input
    };
}

function eSubtitle(input: string): Extraction {
    const result = extractQuoted(input, 'subtitle: "');
    return {
        i: result?.value.trim() ?? "",
        continue: result?.rest ?? input
    };
}

function eImage(input: string): Extraction {
    const result = extractQuoted(input, 'image: "');
    return {
        i: result ? `<img src="${result.value}" alt="Image Alt Text">` : "",
        continue: result?.rest ?? input
    };
}

function eLink(input: string): Extraction {
    const text = extractQuoted(input, 'link: "');
    if (!text) {
        return { i: "", continue: input };
    }

    const url = extractQuoted(text.rest, '"');
    if (!url) {
        return { i: "", continue: input };
    }

    return {
        i: `<a href="${url.value}">${text.value}</a>`,
        continue: url.rest
    };
}

function eText(input: string): Extraction {
    const result = extractQuoted(input, 'text: "');
    return {
        i: result ? `<p>${result.value.replaceAll("\n", "<br>")}</p>` : "",
        continue: result?.rest ?? input
    };
}

function eCode(input: string): Extraction {
    const result = extractQuoted(input, 'code: "');
    return {
        i: result ? `<span style="font-family: monospace; color: #076300;">${result.value}</span>` : "",
        continue: result?.rest ?? input
    };
}

function eItalic(input: string): Extraction {
    const result = extractQuoted(input, 'italic: "');
    return {
        i: result ? `<i>${result.value}</i>` : "",
        continue: result?.rest ?? input
    };
}

function eBold(input: string): Extraction {
    const result = extractQuoted(input, 'bold: "');
    return {
        i: result ? `<strong>${result.value}</strong>` : "",
        continue: result?.rest ?? input
    };
}

export function extract(
    what: "title" | "subtitle" | "image" | "link" | "code" | "italic" | "bold" | "text",
    input: string
): Extraction {
    switch (what) {
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
        case "text":
            return eText(input);
    }
}
