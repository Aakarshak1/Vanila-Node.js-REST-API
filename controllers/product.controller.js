const Product = require('../modals/product.model');
const { getPostData, writeDataToFile } = require('../utility/utill');

async function getProducts(req, res) {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(products));
    res.end();
  } catch (error) {
    console.log(error);
  }
}

async function getProductById(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Product Not Found' }));
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (error) {
    console.log(error);
  }
}

async function createProduct(req, res) {
  try {
    const body = await getPostData(req);

    const { name, description, price } = JSON.parse(body);

    const product = {
      name,
      description,
      price,
    };

    const newProduct = await Product.create(product);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(newProduct));
  } catch (error) {
    console.log(error);
  }
}

async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      const body = await getPostData(req);

      const { title, description, price } = JSON.parse(body);

      const productData = {
        title: title || product.title,
        description: description || product.description,
        price: price || product.price,
      };

      const updatedProduct = await Product.update(id, productData);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: 'Product Not Found' }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify({ message: `Product ${id} removed` }));
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
