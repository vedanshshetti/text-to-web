export const createHTMLStructure = (title: string, subtitle: string, styles: string, body: string) =>
`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    ${styles}
    </style>
    <title>${title}</title>
</head>
<body>
    <h1>${title}</h1>
    <span class="subtitle">${subtitle}</span>
    ${body}
</body>
</html>
`;

export const defaultStylesheet = 
`
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  min-height: 100vh;
  margin: 0;
}

.header {
    font-weight: 800;
}

.subtitle {
    font-size: 1rem;
}

img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

a {
    color: black;
}
` as const;