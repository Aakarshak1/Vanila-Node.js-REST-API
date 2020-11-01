const http = require('http');

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./controllers/product.controller');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/api/products/' && req.method === 'GET') {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'GET'
  ) {
    const id = req.url.split('/')[3];
    getProductById(req, res, id);
  } else if (req.url === '/api/products/' && req.method === 'POST') {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'PUT'
  ) {
    const id = req.url.split('/')[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === 'DELETE'
  ) {
    const id = req.url.split('/')[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify({ message: 'Route Not Found' }));
    res.end();
  }
});

server.listen(PORT, () => console.log(`server running on ${PORT}`));
