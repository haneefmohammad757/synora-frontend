import "./WhyChooseUs.css";
import {
    FaTruck,
    FaShieldAlt,
    FaUndo,
    FaHeadset
} from "react-icons/fa";

const WhyChooseUs = () => {

    const features = [
        {
            icon: <FaTruck />,
            title: "Free Shipping",
            text: "Free delivery on orders above ₹999."
        },
        {
            icon: <FaShieldAlt />,
            title: "Secure Payments",
            text: "100% secure and trusted payment gateway."
        },
        {
            icon: <FaUndo />,
            title: "Easy Returns",
            text: "7-day hassle-free replacement & returns."
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Support",
            text: "Friendly customer support anytime."
        }
    ];

    return (

        <section className="why-section">

            <div className="why-title">

                <h2>Why Shop With Synora?</h2>

                <p>
                    We make online shopping simple, secure and enjoyable.
                </p>

            </div>

            <div className="why-grid">

                {

                    features.map((item,index)=>(

                        <div
                            className="why-card"
                            key={index}
                        >

                            <div className="why-icon">

                                {item.icon}

                            </div>

                            <h3>

                                {item.title}

                            </h3>

                            <p>

                                {item.text}

                            </p>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default WhyChooseUs;