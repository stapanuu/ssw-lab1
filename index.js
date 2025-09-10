const http = require('http');
const url = require('url');

const { handleProducts } = require('./routes/products');
const handleAdmin = require('./routes/admin');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Try public routes
  if (handleProducts(req, res, pathname, query)) return;

  // Try admin routes
  if (handleAdmin(req, res, pathname)) return;

  // Endpoint invalid
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: "Endpoint invalid" }));
});

server.listen(3000, () => console.log('Server running on http://localhost:3000'));
