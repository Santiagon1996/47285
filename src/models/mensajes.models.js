import { Schema, model } from "mongoose";

const messagesSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    message: {
        type: String,
        required: true
    },
    postTime: {
        type: Date,
        default: Date.now 
    }
})

export const messageModel = model('messages', messagesSchema)