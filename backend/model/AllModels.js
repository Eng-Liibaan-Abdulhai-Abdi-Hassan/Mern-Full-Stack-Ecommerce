const mongoose = require('mongoose')
const { Schema, model } = mongoose;
const userschema = new Schema({
    username: String,
    email: String,
    password: String,
    avator: Array,
    newpassword: String,
    role: { type: String, default: 'user', enum: ['user', 'admin'] }
}, { timestamps: true })

const productschema = new Schema({
    productname: String,
    productbrand: String,
    productimage: Array,
    category: String,
    price: Number,
    sellingprice: Number,
    description: String,
}, { timestamps: true })

const addcartschema = new Schema({
    productid: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: false
    },
    userid: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: false

    },
    quantity: {
        type: Number,
        default: 1
    }
})
const categoryschema = new Schema({
    Category: String
})


const orderschema = new Schema(
    {
        productDetails: {
            type: Array,
            default: [],
        },
        email: {
            type: String,
            default: "",
        },
        userId: {
            type: String,
            default: "",
        },
        paymentDetails: {
            paymentId: {
                type: String,
                default: "",
            },
            payment_method_type: [],
            payment_status: {
                type: String,
                default: "",
            },
        },
        TotalAmount: {
            type: Number,
            default: "",
        },
        SubTotalAmount: {
            type: Number,
            default: "",
        },
        shipping_options: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);
const order = model("order", orderschema);
const user = model('user', userschema)
const category = model('category', categoryschema)
const AddCartModel = model('addcart', addcartschema)
const product = model('product', productschema)
module.exports = { order, user, product, AddCartModel, category }