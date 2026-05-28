const Razorpay = require('razorpay');
const crypto = require('crypto');


const razorpay = new Razorpay({
  key_id: "rzp_test_Sqo9g3Cr3A1vtI",
  key_secret: "Se6FYsM15VsLoL0ocxfROtZB"
});

exports.createOrder = async (req, res) => {
  try {
    
    const finalAmount = Math.round(Number(req.body.amount) * 100);

    if (!finalAmount || isNaN(finalAmount)) {
      return res.status(400).json({ success: false, error: "Invalid amount received" });
    }

    const options = {
      amount: finalAmount,
      currency: "INR",
      receipt: `receipt_order_${Date.now()}`
    };

    console.log("Creating Razorpay Order with Options:", options);
    const order = await razorpay.orders.create(options);

    
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: "rzp_test_Sqo9g3Cr3A1vtI"
    });

  } catch (err) {
    console.error("RAZORPAY BACKEND ERROR:", err);
    res.status(500).json({ success: false, error: err.message || err });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id;

    
    const expectedSign = crypto
      .createHmac("sha256", "Se6FYsM15VsLoL0ocxfROtZB") 
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      res.json({ success: true, message: 'Payment Verified' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid Signature' });
    }
  } catch (err) {
    console.error("Verification Catch Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};