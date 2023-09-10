import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        products: {
            type: [
                {
                    id_prod: {
                        type: Schema.Types.ObjectId,
                        ref: 'products',
                        required: true
                    },
                    quantity: {
                        type: Number,
                        required: true
                    }
                }
            ],
            default: function () {
                return [];
            }
        }
    }

})

export const cartModel = model('carts', cartSchema)


// import { Schema, model } from "mongoose";

// const productSchema = new Schema({
//   id_prod: {
//     type: Schema.Types.ObjectId,
//     ref: 'products',
//     required: true
//   },
//   quantity: {
//     type: Number,
//     required: true
//   }
// });

// const cartSchema = new Schema({
//   products: {
//     type: [productSchema],
//     default: undefined
//   }
// }, { timestamps: true });

// cartSchema.index({ 'products.id_prod': 1 });

// export const cartModel = model('carts', cartSchema);
