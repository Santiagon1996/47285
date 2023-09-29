import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2"

 const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        index: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    rol:{
        type: String,
        default: `user`
    }
})

userSchema.plugin(paginate)//implemento paginate en schema

export const userModel = model('users', userSchema)