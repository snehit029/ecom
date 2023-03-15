const router = require("express").Router();
const Stripe = require('stripe');
require('dotenv').config();
const Key = process.env.STRIPE_KEY;
const stripe = Stripe(Key);
const User = require("../models/User")

router.post('/create-checkout-session', async (req, res) => {
  const {cartItems} = req.body;

   const line_items = cartItems.map((product)=>{
    return {
      price_data: {
        currency: "inr",
        product_data: {
          name: product.title,
          images: [product.img],
          description: product.desc,
        },
        unit_amount: product.price*100,
      },
      quantity: product.cartQuantity,
    }
  })
 console.log(req.body);



  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
       allowed_countries: ["IN", "BD"],
    },
      shipping_options: [ {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {amount: 0, currency: 'inr'},
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {unit: 'business_day', value: 5},
            maximum: {unit: 'business_day', value: 7},
          },
        },
      },],
      line_items,
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: `http://localhost:3000/cart`,
    });
  
    res.json({url: session.url});
  });

module.exports = router;