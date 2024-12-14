const { user, product, AddCartModel, order, category } = require("../model/AllModels");
const bcrypt = require('bcryptjs');
const generatetoken = require("../token/generatetoken");
let secret_key = "sk_test_51Q8hzh01QyvmabRgTklJ54y0L5p9lJmu7FkMZAVreMssdFXI7Ktx5tsPdeTtEg59F5WplGcge1Vyj1APd8cUh05R00MU6Tg57a"
const stripe = require('stripe')(secret_key)
const signup = async (req, res) => {
    try {
        let { username, email, password, avator } = req.body;
        let userexist = await user.findOne({ email });
        if (userexist) return res.send('User Already Exist')
        let newuser = new user({ username, email, password: await bcrypt.hash(password, 10), avator })
        await newuser.save();
        // await generatetoken(userexist, res)
        res.send({
            status: true,
            message: "Successfully Created User",
            newuser
        })
    } catch (error) {
        res.send(error.message)
    }
}
const login = async (req, res) => {
    let { email, password } = req.body;
    let userexist = await user.findOne({ email });
    if (!userexist) return res.send('user not found')
    let checkpass = await bcrypt.compare(password, userexist.password)
    if (!checkpass) return res.send('credentials not found')
    let { password: pass, ...info } = userexist._doc
    await generatetoken(info, res)
    res.send({
        status: true,
        message: "Successfully Logged In",
        ...info
    })
}
const logout = (req, res) => {
    res.clearCookie('token')
    res.send({
        status: true,
        message: "Successfully Logout"
    })
}
const productsignup = async (req, res) => {
    let { productname, productbrand, productimage, category, price, sellingprice, description } = req.body;
    let newproduct = await product.create({ productbrand, productname, productimage, description, category, sellingprice, price })
    res.send({
        status: true,
        message: "Successfully Created Product",
        newproduct
    })


}
const categorysignup = async (req, res) => {
    let newproduct = await category.create(req.body)
    res.send({
        status: true,
        message: "Successfully Created Product",
        newproduct
    })


}
const getproductcategory = async (req, res) => {
    let productcategory = await product.distinct('category')
    let CategoryArray = []
    for (let category of productcategory) {
        let data = await product.findOne({ category })
        CategoryArray.push(data)
    }
    res.send(CategoryArray)
}
const getallproduct = async (req, res) => {
    let data = await product.find().sort({ updatedAt: -1 });
    res.send(data)
}
const getallcategory = async (req, res) => {
    let data = await category.find().sort({ updatedAt: -1 });
    res.send(data)
}
const getsingleproduct = async (req, res) => {
    let data = await product.findById(req?.params?.id).sort({ updatedAt: -1 })
    if (!data) return []
    res.send(data || []);
}
const searchproduct = async (req, res) => {
    let { search } = req.query;

    let RegEx = new RegExp(search, 'i', 'g')
    let searchproduct = await product.find({
        $or: [
            { category: RegEx },
            { productname: RegEx },
            { productbrand: RegEx },
            { productimage: RegEx },
        ]
    })
    res.send(searchproduct);
}
const filterproductcategory = async (req, res) => {
    let { category } = req.body
    let Search = req.query?.category?.split(',')
    let filtercategory = await product.find({ category: { $in: category || Search } });
    res.send(filtercategory)
}
const alladdcart = async (req, res) => {
    let getalladdcarts = await AddCartModel.find({ userid: req.user.id }).populate(['userid', 'productid'])
    res.send(getalladdcarts)
}
const addcart = async (req, res) => {
    let createaddcart = await AddCartModel.create(req.body)
    res.send({
        status: true,
        message: "Successfully Add Cart ",
        createaddcart
    })
}
const deleteaddcart = async (req, res) => {
    let Remove = await AddCartModel.findByIdAndDelete(req.params.id)
    res.send({
        status: true,
        message: "Successfully Add Cart ",
        Remove
    })
}
const updateaddcart = async (req, res) => {
    let Remove = await AddCartModel.findByIdAndUpdate(req.body.userid, { quantity: req.body.quantity })
    res.send({
        status: true,
        message: "Successfully Update User",
        Remove
    })
}
const updateuser = async (req, res) => {
    let { userid, username, email, newpassword, avator } = req.body;
    let Remove = await user.findByIdAndUpdate(userid, { newpassword, username, email, avator })
   

    if (newpassword) {
        Remove.password = await bcrypt.hash(newpassword, 10)
    }
    let {password,...info}=Remove._doc
    res.send({
        status: true,
        message: "Successfully Update Profile ",
        ...info
    })
}
const deleteproduct = async (req, res) => {
    let Remove = await product.findByIdAndDelete(req.params.id)
    res.send({
        status: true,
        message: "Successfully Add Cart ",
        Remove
    })
}
const updatecategory = async (req, res) => {
    let Remove = await category.findByIdAndUpdate(req.body.categoryid, req.body)
    res.send({
        status: true,
        message: "Successfully Add Cart ",
        Remove
    })
}
const deletecategory = async (req, res) => {
    let Remove = await category.findByIdAndDelete(req.params.id)
    res.send({
        status: true,
        message: "Successfully Add Cart ",
        Remove
    })
}
const updateproduct = async (req, res) => {
    let Remove = await product.findByIdAndUpdate(req.body.productid, req.body)
    res.send({
        status: true,
        message: "Successfully Add Cart ",
        Remove
    })
}
const productcount = async (req, res) => {
    let count = await AddCartModel.countDocuments({
        userid: req.params.id
    })
    res.send({
        count
    })


}
const paymentmethod = async (req, res) => {
    let { item } = req.body;
    const User = await user.findOne({ _id: item[0].userid._id });


    let line_items = item.map((item) => {
        return {
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.productid.productname,
                    images: item.productid.productimage,
                    metadata: {
                        productid: item.productid._id,
                    },
                },

                unit_amount: item.productid.sellingprice,
            },

            adjustable_quantity: {
                enabled: true,
                minimum: 1,
            },

            quantity: item.quantity,
        };
    })
    let params = {
        mode: "payment",
        billing_address_collection: "auto",
        payment_method_types: ["card"],
        line_items,
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel",
        customer_email: User.email,
        shipping_options: [
            {
                shipping_rate: 'shr_1QGTzN01QyvmabRgfdCZui4I'
            }
        ],
        metadata: {
            userid: item[0].userid._id
        },
    }

    const session = await stripe.checkout.sessions.create(params)
    res.send(session.url)

}
const getpaymentmethod = async (req, res) => {
    let secret = "whsec_d8713849020838cf95f13dfe956aea28e8ea2cea8d1e972f1e0ba7546d1daae6"
    let payload = JSON.stringify(req.body)
    const header = stripe.webhooks.generateTestHeaderString({
        payload,
        secret
    })

    let event;
    try {
        event = stripe.webhooks.constructEvent(payload, header, secret)
    } catch (error) {
        console.log(error.message)
    }
    if (event.type === "checkout.session.completed") {
        let session = event.data.object
        let userId = session.metadata.userid
        let email = session.customer_email
        let TotalAmount = session.amount_total
        let SubTotalAmount = session.amount_subtotal
        let line_items = await stripe.checkout.sessions.listLineItems(session.id)
        let productDetails = []
        if (line_items.data.length > 0) {
            for (let item of line_items.data) {
                const product = await stripe.products.retrieve(item.price.product)
                let productinfo = {
                    productid: product.metadata.productid,
                    image: product.images,
                    name: product.name,
                    quantity: item.quantity,
                    price: item.amount_total
                }

                productDetails.push(productinfo)
            }
        }

        let paymentDetails = {
            paymentId: session.payment_intent,
            payment_method_type: session.payment_method_types,
            payment_status: session.payment_status,
        }

        let OrderDetails = {
            productDetails,
            email,
            userId,
            paymentDetails,
            TotalAmount,
            SubTotalAmount,
            shipping_options: session.shipping_options.map((data) => { return { shipping_amount: data.shipping_amount } })

        };

        await order.create(OrderDetails);

        await AddCartModel.deleteMany({ userid: userId });

        res.send({
            status: true,
            error: false,
            message: "Payment Successful",
            OrderDetails,
        });
    }


}
const GetAllpaymentmethod = async (req, res) => {
    const GetOrders = await order.find().sort({ updatedAt: -1 });
    res.send(GetOrders);
};
const Getpaymentmethod = async (req, res) => {
    const GetOrders = await order.find({ userId: req.params.id }).sort({ updatedAt: -1 });
    res.send(GetOrders);
};

module.exports = { updateuser, Getpaymentmethod, GetAllpaymentmethod, getpaymentmethod, paymentmethod, getallcategory, updatecategory, deletecategory, categorysignup, deleteproduct, updateproduct, alladdcart, updateaddcart, deleteaddcart, productcount, addcart, getsingleproduct, filterproductcategory, searchproduct, getallproduct, signup, login, logout, productsignup, getproductcategory }