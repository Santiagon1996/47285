import { Router } from "express";
import {  productManager } from "../ProductManager.js";


export const prodsRouter = Router();


prodsRouter.get("/test", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    const limit = Number(req.query.limit);

    if (!limit) {
      return res.status(400).send(products);
    }

    const limitedProducts = products.slice(0, limit);
    res.status(200).send(limitedProducts);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prodsRouter.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const products = await productManager.getProducts();

    if (!id) {
      return res.status(400).send(products);
    }

    const product = products.find(p => p.id === id);
    res.status(200).send(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prodsRouter.post("/", async (req, res) => {
  try {
    const { code } = req.body;
    const productExists = await productManager.getProductsByCode(code);

    if (productExists) {
      return res.status(400).send("Product already exists");
    }

    const productAdded = await productManager.addProduct(req.body);
    if (productAdded) {
      res.status(200).send("Product created");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

prodsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const productExists = await productManager.getProductsById(parseInt(id));

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
    const productExists = await productManager.getProductsById(parseInt(id));

    if (productExists) {
      await productManager.deleteProductsProducts(id);
      res.status(200).send("Product deleted");
    } else {
      res.status(404).send("Product not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});


