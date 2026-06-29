import "./CategorySection.css";

import {
    FaThLarge,
    FaMale,
    FaFemale,
    FaMobileAlt,
    FaShoePrints,
    FaClock,
    FaGem,
    FaShoppingBag
} from "react-icons/fa";

const CategorySection = ({ selected, setSelected }) => {

    const categories = [

        {
            name: "All",
            icon: <FaThLarge />
        },

        {
            name: "Men",
            icon: <FaMale />
        },

        {
            name: "Women",
            icon: <FaFemale />
        },

        {
            name: "Electronics",
            icon: <FaMobileAlt />
        },

        {
            name: "Footwear",
            icon: <FaShoePrints />
        },

        {
            name: "Watches",
            icon: <FaClock />
        },

        {
            name: "Accessories",
            icon: <FaGem />
        },

        {
            name: "Bags",
            icon: <FaShoppingBag />
        }

    ];

    return (

        <section className="category-section">

            <div className="category-header">

                <h2>

                    Shop By Category

                </h2>

                <p>

                    Explore products across your favourite collections.

                </p>

            </div>

            <div className="category-container">

                {

                    categories.map((category) => (

                        <button

                            key={category.name}

                            className={

                                selected === category.name

                                    ?

                                    "category-card active"

                                    :

                                    "category-card"

                            }

                            onClick={() =>

                                setSelected(category.name)

                            }

                        >

                            <div className="category-icon">

                                {category.icon}

                            </div>

                            <span>

                                {category.name}

                            </span>

                        </button>

                    ))

                }

            </div>

        </section>

    );

};

export default CategorySection;