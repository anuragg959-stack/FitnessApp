import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT || 8080);
const ROOT = process.cwd();

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
};

function safePath(urlPath) {
  const withoutQuery = urlPath.split("?")[0].split("#")[0];
  const cleanPath = withoutQuery === "/" ? "/index.html" : withoutQuery;
  const normalized = normalize(cleanPath).replace(/^([.][.][/\\])+/, "");
  return join(ROOT, normalized);
}

const server = createServer((req, res) => {
  const filePath = safePath(req.url || "/");

  if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
    return;
  }

  const ext = extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || "application/octet-stream";

  res.writeHead(200, { "Content-Type": contentType });
  createReadStream(filePath).pipe(res);
});

server.listen(PORT, () => {
  console.log(`Fitness Pal is running at http://localhost:${PORT}`);
});
