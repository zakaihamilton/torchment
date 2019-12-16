const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");
const { handleModule } = require("./src/mgr/server");
const logger = require("./src/mgr/core/logger");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const port = process.env.PORT || 3000;
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        if (pathname === "/service-worker.js" || pathname === "/sw.js") {
            const filePath = join(__dirname, ".next", pathname);

            app.serveStatic(req, res, filePath);
        } else if (!handleModule(pathname, req, res)) {
            handle(req, res, parsedUrl);
        }
    }).listen(port, () => {
        logger.log(`Ready on http://localhost:${port}`);
    });
});
