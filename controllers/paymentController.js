const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  console.log(req.params.id,"wekhrne    ",req.params);
  const user1 = await User.findOne({_id:req.params.id});
  const Price = req.params.amount;
  console.log(Price);
  const { id } = req.params;
  const transformedItems = {
    quantity: 1,
    price_data: {
      currency: 'usd',
      unit_amount: Math.round(Price * 100),
      product_data: {
        name: user1.name,
      }
    }
  };
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/paymentSuccess?userId=${user1.id}&amount=${Price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/?user=${req.params.id}`,
    customer_email: "qwkhe;w3@gmail.cfcvmv",
    client_reference_id: req.params.tourId,
    line_items: [transformedItems],
    mode: 'payment'
  });
  // 3) Create session as response
  res.status(200).json({
    status: 'success',
    session
  });
});

exports.contrinuteForm=async(req,res)=>{


    return res.status(200).render('account_contribute');

}

exports.showSuccessPage=async(req,res)=>{

    console.log(req.query);
    let {userId, amount}=req.query;
    amount=parseInt(amount);
    console.log(userId,typeof amount,amount)
    const user=await User.findOne({_id:userId});
   
    const updatedUser=await User.updateOne({_id:userId},{contributedAmount:user.contributedAmount+amount});
    

    return res.status(200).render('success_page');

}


// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//   const { user, price } = req.query;

//   if (!user && !price) return next();
//   await Booking.create({  user, price });

//   res.redirect(req.originalUrl.split('?')[0]);
// });

// exports.myBookings = catchAsync(async (req, res, next) => {
//   const userId = req.user.id;
//   const result = await Booking.find({ user: userId });
//   console.log(result);
//   res.status(200).json({
//     status: 'success',
//     result
//   });
// });

// exports.createBooking = factory.createOne(Booking);
// exports.getBooking = factory.getOne(Booking);
// exports.getAllBookings = factory.getAll(Booking);
// exports.updateBooking = factory.updateOne(Booking);
// exports.deleteBooking = factory.deleteOne(Booking);
