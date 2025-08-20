const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const port = 8000;
const host = 'localhost';

const server = http.createServer(async (req, res) => {
    let urlPath = req.url.replace(/\/$/, '') || '/';
    let filePath;

    if (urlPath === '/') {
        filePath = path.join(__dirname, 'index.html');
    } else {
        filePath = path.join(__dirname, urlPath);
        if (!path.extname(filePath)) {
            // Try serving index.html for directories
            filePath = path.join(filePath, 'index.html');
        }
    }

    try {
        const content = await fs.readFile(filePath);
        const ext = path.extname(filePath).toLowerCase();
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon'
        }[ext] || 'application/octet-stream';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>Check if the file exists or verify the URL.</p>');
        } else {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end('<h1>500 Server Error</h1><p>Something went wrong on the server.</p>');
        }
    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});