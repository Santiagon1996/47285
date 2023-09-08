import { Router } from "express";
import ProductManager from "../../clases/ProductManager.js"
const prodsRouter = Router();

const productManager = new ProductManager();

prodsRouter.get("/", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);

    if (!limit) {
      return res.status(200).send(products);
    }

    const limitedProducts = products.slice(0, limit);
    res.status(200).send(limitedProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prodsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const products = await productManager.getProductById(Number(id));
    if (id) {
      return res.status(200).send(products);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prodsRouter.post("/", async (req, res) => {
  const { code } = req.body;
  const productExists = await productManager.getProductByCode(code);
  if (!productExists) {
    await productManager.addProduct(req.body)
    res.status(200).send(req.body)
  } else {
    res.status(400).send('Product Already Created')
  }
});


prodsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productExists = await productManager.getProductById(parseInt(id));

    if (productExists) {
      await productManager.updateProducts(id, req.body);
      res.status(200).send(`Product updated`);
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prodsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productExists = await productManager.getProductById(parseInt(id));

    if (productExists) {
      await productManager.deleteProductById(id);
      console.log(`Product ID ${id} Was Deleted`)
      res.status(200).send("Product deleted");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


export default prodsRouter