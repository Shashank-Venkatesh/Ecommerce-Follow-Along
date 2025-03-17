const mongoose = require('mongoose');
 
 const orderSchema = new mongoose.Schema(
     {
         user: {
             type: mongoose.Schema.Types.ObjectId,
             ref: 'User',
             required: true,
         },
         orderItems: [
             {
                 product: {
                     type: mongoose.Schema.Types.ObjectId,
                     ref: 'Product',
                     required: true,
                 },
                 name: {
                     type: String,
                     required: true,
                 },
                 quantity: {
                     type: Number,
                     required: true,
                     min: [1, 'Quantity cannot be less than 1'],
                 },
                 price: {
                     type: Number,
                     required: true,
                     min: [0, 'Price cannot be negative'],
                 },
                 image: {
                     type: String,
                     required: true,
                 },
             },
         ],
         shippingAddress: {
             country: { type: String, required: true },
             city: { type: String, required: true },
             address1: { type: String, required: true },
             address2: { type: String },
             zipCode: { type: Number, required: true },
             addressType: { type: String, required: true },
         },
         totalAmount: {
             type: Number,
             required: true,
             default: 0,
         },
         orderStatus: {
             type: String,
             enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
             default: 'Processing',
         },
         deliveredAt: {
             type: Date,
         },
     },
     { timestamps: true }
 );

 router.get('/my-orders', async (req, res) => {
    try {
        const { email } = req.query;


        // Validate the email parameter
        if (!email) {
            return res.status(400).json({ message: 'Email is required.' });
        }


        // Retrieve user _id from the user collection using the provided email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }


        // Find all orders associated with the user
        const orders = await Order.find({ user: user._id });


        res.status(200).json({ orders });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: error.message });
    }
});

 
 module.exports = mongoose.model('Order', orderSchema);