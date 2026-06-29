import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import "./Checkout.css";
import toast from "react-hot-toast";

const Checkout = () => {

    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem("user"));
    const userId = currentUser?.id;

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [pincode, setPincode] = useState("");

    const [loading, setLoading] = useState(false);

    const placeOrder = async () => {

        if (!userId) {

            navigate("/login");

            return;

        }

        if (

            !name ||

            !phone ||

            !address ||

            !city ||

            !state ||

            !pincode

        ) {

            toast.error("Please fill all the fields.");

            return;

        }

        try {

            setLoading(true);

            /*
             * Create Pending Order
             */

            const response = await axios.post(

                "/orders/checkout",

                null,

                {

                    params: {

                        userId

                    }

                }

            );

            const order = response.data;

            /*
             * Razorpay Options
             */

            const options = {

    key: order.key,

    amount: order.amount,

    currency: order.currency,

    name: "Synora",

    description: "Secure Payment",

    image: "/favicon.svg",

    order_id: order.razorpayOrderId,

    prefill: {

        name: name,

        contact: phone

    },

    notes: {

        address: address,

        city: city,

        state: state,

        pincode: pincode

    },

    theme: {

        color: "#2563eb"

    },

    handler: async function (paymentResponse) {

        try {

            await axios.post(

                "/payment/verify",

                {

                    razorpay_order_id:
                        paymentResponse.razorpay_order_id,

                    razorpay_payment_id:
                        paymentResponse.razorpay_payment_id,

                    razorpay_signature:
                        paymentResponse.razorpay_signature

                }

            );

            toast.success("🎉 Payment Successful!");

            navigate("/orders");

        }

        catch (error) {

            console.error(error);

            toast.error("Payment Verification Failed.");

        }

        finally {

            setLoading(false);

        }

    },

    modal: {

        ondismiss: function () {

            setLoading(false);

            toast.error(

                "Payment cancelled. Your order is still pending and your cart has been preserved."

            );

        }

    }

};

const razorpay = new window.Razorpay(options);

razorpay.on("payment.failed", function (response) {

    console.error(response.error);

    toast.error(

        "Payment Failed : " +

        response.error.description

    );

    setLoading(false);

});

razorpay.open();

}

catch(error){

    console.error(error);

    toast.error("Unable to initiate payment.");

}

finally{

    setLoading(false);

}

};
        
    

return (

    <div className="checkout-page">

        <div className="checkout-left">

            <div className="checkout-card">

                <h2>📦 Shipping Address</h2>

                <p>

                    Enter your delivery details carefully.

                </p>

                <input

                    type="text"

                    placeholder="Full Name"

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                />

                <input

                    type="text"

                    placeholder="Phone Number"

                    value={phone}

                    onChange={(e)=>setPhone(e.target.value)}

                />

                <textarea

                    rows="4"

                    placeholder="House No, Street, Area"

                    value={address}

                    onChange={(e)=>setAddress(e.target.value)}

                />

                <input

                    type="text"

                    placeholder="City"

                    value={city}

                    onChange={(e)=>setCity(e.target.value)}

                />

                <input

                    type="text"

                    placeholder="State"

                    value={state}

                    onChange={(e)=>setState(e.target.value)}

                />

                <input

                    type="text"

                    placeholder="Pincode"

                    value={pincode}

                    onChange={(e)=>setPincode(e.target.value)}

                />

            </div>

        </div>

        <div className="checkout-right">

            <div className="checkout-card">

                <h2>💳 Payment Summary</h2>

                <hr />

                <div className="summary-item">

                    <span>Payment Method</span>

                    <strong>Razorpay</strong>

                </div>

                <div className="summary-item">

                    <span>Accepted</span>

                    <strong>

                        UPI • Cards • Wallet • NetBanking

                    </strong>

                </div>

                <div className="summary-item">

                    <span>Delivery</span>

                    <strong style={{color:"#16a34a"}}>

                        FREE

                    </strong>

                </div>

                <div className="summary-item">

                    <span>Security</span>

                    <strong>

                        🔒 100% Secure

                    </strong>

                </div>

                <button

                    className="payment-btn"

                    disabled={loading}

                    onClick={placeOrder}

                >

                    {

                        loading

                        ?

                        "Opening Razorpay..."

                        :

                        "Proceed to Payment"

                    }

                </button>

            </div>

        </div>

    </div>

);}

    


export default Checkout;