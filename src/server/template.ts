export function buildHtml(html: string, initialData: any) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Rupyx</title>
        <link rel="stylesheet" href="/index.css" />
        <link rel="stylesheet" href="/styles/tailwind.css" />
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
        </script>
        <script src="/index.js" type="module"></script>
      </body>
    </html>
  `;
}
