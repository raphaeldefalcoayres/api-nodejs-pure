export function extendResponse(response) {
  response.json = (data, statusCode = 200) => {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
  };
}
