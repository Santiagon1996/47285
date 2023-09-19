import { Router } from "express";
import { productModel } from "../models/productos.models.js";
const prodsRouter = Router();



// prodsRouter.get("/", async (req, res) => {
//     let { limit } = req.query
//     let { page } = req.query
//     let { sort } = req.query
//     let { category } = req.query
//     limit = limit ?? 10
//     page = page ?? 1

//     try {
//         const prods = await productModel.paginate(category ? { category: category } : {}, { limit: limit, page: page, sort: { price: sort } })
//         res.status(200).send({ respuesta: 'OK', mensaje: prods })
//     } catch (error) {
//         res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error })
//     }
// })
prodsRouter.get("/", async (req, res) => {
    let { limit = 10, page = 1, sort, category } = req.query;
    limit = Number(limit);
    page = Number(page);

    if (!Number.isInteger(limit) || limit <= 0) {
        return res.status(400).send({ respuesta: 'Error', mensaje: 'Limit debe ser un número positivo' });
    }

    if (!Number.isInteger(page) || page <= 0) {
        return res.status(400).send({ respuesta: 'Error', mensaje: 'Page debe ser un número positivo' });
    }

    try {
        const prods = await productModel.paginate(category ? { category: category } : {}, { limit: limit, page: page, sort: { price: sort } });
        res.status(200).send({ respuesta: 'OK', mensaje: prods });
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consultar productos', mensaje: error.message });
    }
});

prodsRouter.get("/:id", async (req, res) => {
  const { id } = req.params

    try {
        const prod = await productModel.findById(id)
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: prod })
        else
            res.status(404).send({ respuesta: 'Error en consultar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta producto', mensaje: error })
    }
});

prodsRouter.post("/", async (req, res) => {
  const { title, description, stock, code, price, category } = req.body
    try {
        const prod = await productModel.create({ title, description, stock, code, price, category })
        res.status(200).send({ respuesta: 'OK', mensaje: prod })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear productos', mensaje: error })
    }
});


prodsRouter.put("/:id", async (req, res) => {
  const { id } = req.params
    const { title, description, stock, status, code, price, category } = req.body

    try {
        const prod = await productModel.findByIdAndUpdate(id, { title, description, stock, status, code, price, category })
        if (prod)
            res.status(200).send({ respuesta: 'OK', mensaje: 'Producto actualizado' })
        else
            res.status(404).send({ respuesta: 'Error en actualizar Producto', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en actualizar producto', mensaje: error })
    }
});

prodsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params

  try {
      const prod = await productModel.findByIdAndDelete(id)
      if (prod)
          res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado' })
      else
          res.status(404).send({ respuesta: 'Error en eliminar Producto', mensaje: 'Not Found' })
  } catch (error) {
      res.status(400).send({ respuesta: 'Error en eliminar producto', mensaje: error })
  }
});


export default prodsRouter