import {Schema, model  } from "mongoose";

const orderSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now 
    }


})

export const orderModel = model(`order`, orderSchema)