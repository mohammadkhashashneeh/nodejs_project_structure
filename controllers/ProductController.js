const Product = require('../models/ProductModel');

class ProductController {
    static async index(req, res) {
        const productModel = new Product()
        const products = await productModel.getAll()
        return res.status(200).json(products);
    }

    static async view(req, res) {
        try {
            const productModel = new Product();
            const product = await productModel.findOne(req.params.id) 
            if (!product) return res.status(404).json({ error: 'Product not found' });
            res.json(product);
        } catch (err) {
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async name(req, res) {
        try {
            const productModel = new Product();
            const name = await productModel.getName(req.params.id)
            res.json({name});
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: 'Something went wrong' });
        }
    }

    static async create(req, res) {
        try {
          const productData = req.body;
      
          if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
          }
      
          // Save array of image paths under the field `images`
          productData.image = req.files.map(file => `/uploads/${file.filename}`);
          console.log('Saved image paths:', productData.image);
      
          const productModel = new Product();
          const createdProduct = await productModel.create(productData);
      
          return res.status(201).json({
            message: 'Product created successfully',
            product: createdProduct,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
          });
        }
      }
      
    

    static async update(req, res) {
        const productModel = new Product()
        const product = await productModel.update(req.params.id, req.body)
        return res.status(200).json(product);
    }

    static async delete(req, res) {
        try {
            const productModel = new Product()
            const deletedProduct = await productModel.delete(req.params.id);

            if (!deletedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json({ message: 'Product deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
}


module.exports = ProductController;
