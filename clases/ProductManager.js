// import { promises as fs } from "fs"



// const path = "../data/productos.json";

// class ProductManager {
//     constructor(path) {
//         this.path = path;
//         this.products = null;
//         this.initializeIdIncrement();
//     }
//     async initializeIdIncrement() {
//         try {
//             const info = await fs.readFile(this.path, "utf-8");
//             const products = JSON.parse(info);
//             if (products.length > 0) {
//                 const maxId = Math.max(...products.map(p => p.id));
//                 Productos.idIncrement = maxId;
//             }
//         } catch (error) {
//             console.error('Error reading the products file:', error);
//         }
//     }

//     async addProduct(productData) {
//         const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock","status"];
//         if (!requiredFields.every(field => field in productData)) {
//             throw new Error("All fields are required");
//         }

//         const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
//         const newProduct = new Productos(productData.title, productData.description, productData.price, productData.thumbnail, productData.code, productData.stock);
//         const productExists = products.some(p => p.id === newProduct.id);

//         if (productExists) {
//             throw new Error("Product already exists");
//         } else {
//             products.push(newProduct);
//             await fs.writeFile(this.path, JSON.stringify(products));
//         }
//     }
//     async getProducts() {
//         if (!this.products) {
//             try {
//                 const info = await fs.readFile(this.path, "utf-8");
//                 this.products = JSON.parse(info);
//             } catch (error) {
//                 this.products = [];
//             }
//         }
//         return this.products;
//     }
  
//     async getProductById(id) {
//         const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
//         const product = products.find(p => p.id === id);

//         if (!product) {
//             throw new Error("Product not found");
//         }

//         return product;
//     }
//     async getProductByCode(code) {
//         const products = JSON.parse(await fs.readFile(this.path, "utf-8"));
//         const product = products.find(p => p.code === code);
    
//         if (!product) {
//           throw new Error("Product not found");
//         }
    
//         return product;
//       }

//       async updateProducts(id, product) {
//         const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
//         const productIndex = products.findIndex((p) => p.id === id)

//         if (productIndex === -1) {
//             throw new Error("Product not found");
//         } else {
//             products[productIndex] = { ...products[productIndex], ...product };
//             await fs.writeFile(this.path, JSON.stringify(products))
//         }
//     }
//     async deleteProducts(id) {
//         const products = JSON.parse(await fs.readFile(this.path, `utf-8`))
//         const productExists = products.some((p) => p.id === id)

//         if (productExists) {
//             await fs.writeFile(this.path, JSON.stringify(products.filter(el => el.id != id)))
//         } else {
//             throw new Error("Product not found");
//         }
//     }
// }
// class Productos {
//     static idIncrement = 0;
  
//     constructor(title, description, price, thumbnail, code, stock) {
//         this.title = title;
//         this.description = description;
//         this.price = price;
//         this.thumbnail = thumbnail;
//         this.code = code;
//         this.stock = stock;
//         this.id = Productos.incrementarId();
//     }
  
//     static incrementarId() {
//         Productos.idIncrement++;
//         return Productos.idIncrement;
//     }
//   }

// export const productManager = new ProductManager(path);
import { promises as fs } from "fs";

const path= './data/productos.json';

export default class ProductManager {
    constructor() {
        this.path = path
        this.products = null;
        this.initializeIdIncrement();
    }
    
    async readProductsFile() {
        try {
            const info = await fs.readFile(this.path, "utf-8");
            return JSON.parse(info);
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.error('Products file not found');
            } else {
                console.error('Error reading the products file:', error);
            }
            return [];
        }
    }
    async initializeIdIncrement() {
        try {
            const products = await this.readProductsFile();
            if (products.length > 0) {
                const maxId = Math.max(...products.map(p => p.id));
                Productos.idIncrement = maxId;
            }
        } catch (error) {
            console.error('Error reading the products file:', error);
        }
    }


    async addProduct(productData) {
        const requiredFields = ["title", "description", "price", "thumbnail", "code", "stock", "status"];
        if (!requiredFields.every(field => field in productData)) {
            throw new Error("All fields are required");
        }

        const products = await this.readProductsFile();
        const newProduct = new Productos(productData.title, productData.description, productData.price, productData.thumbnail, productData.code, productData.stock);
        const productExists = products.some(p => p.id === newProduct.id);

        if (productExists) {
            throw new Error("Product already exists");
        } else {
            products.push(newProduct);
            await fs.writeFile(this.path, JSON.stringify(products));
        }
    }

    async getProducts() {
        if (!this.products) {
            this.products = await this.readProductsFile();
        }
        return this.products;
    }

    async getProductById(id) {
        const products = await this.readProductsFile();
        const product = products.find(p => p.id === id);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    async getProductByCode(code) {
        const products = await this.readProductsFile();
        const product = products.find(p => p.code === code);

        if (!product) {
            throw new Error("Product not found");
        }

        return product;
    }

    async updateProducts(id, product) {
        const products = await this.readProductsFile();
        const productIndex = products.findIndex((p) => p.id === id)

        if (productIndex === -1) {
            throw new Error("Product not found");
        } else {
            products[productIndex] = { ...products[productIndex], ...product };
            await fs.writeFile(this.path, JSON.stringify(products));
        }
    }

    async deleteProducts(id) {
        const products = await this.readProductsFile();
        const productExists = products.some((p) => p.id === id)

        if (productExists) {
            await fs.writeFile(this.path, JSON.stringify(products.filter(el => el.id != id)));
        } else {
            throw new Error("Product not found");
        }
    }
}

class Productos {
    static idIncrement = 0;

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Productos.incrementarId();
    }
    
    static incrementarId() {
        Productos.idIncrement++;
        return Productos.idIncrement;
    }
}


   