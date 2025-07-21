export function buildHtml(reactHtml: string, data: any) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Hydration Test</title>
        <script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>
      </head>
      <body>
        <div id="root">${reactHtml}</div>
        <script type="module" src="/client.js" defer></script>
      </body>
    </html>
  `;
}
