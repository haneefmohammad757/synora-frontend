import "./Categories.css";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const categoryImages = {
    Electronics: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    Fashion: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    Men: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400",
    Women: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400",
    Shoes: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    Watches: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    Accessories: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    Bags: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
    Default: "https://placehold.co/400x300?text=Category"
};

const Categories = ({ onSelectCategory }) => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        try {

            const res = await axios.get("/products");

            const counts = {};

            res.data.forEach(product => {

                const category = product.category || "General";

                counts[category] = (counts[category] || 0) + 1;

            });

            const data = Object.keys(counts).map(category => ({

                name: category,

                count: counts[category],

                image: categoryImages[category] || categoryImages.Default

            }));

            setCategories(data);

        }

        catch (err) {

            console.log(err);

        }

    };

    return (

        <section className="categories">

            <div className="category-header">

                <h2>Shop by Category</h2>

                <p>
                    Explore products by category
                </p>

            </div>

            <div className="category-grid">

                <div
                    className="category-card"
                    onClick={() => onSelectCategory("All")}
                >

                    <img
                        src="https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400"
                        alt="All"
                    />

                    <h3>All Products</h3>

                </div>

                {

                    categories.map(category => (

                        <div

                            key={category.name}

                            className="category-card"

                            onClick={() =>
                                onSelectCategory(category.name)
                            }

                        >

                            <img
                                src={category.image}
                                alt={category.name}
                            />

                            <h3>

                                {category.name}

                            </h3>

                            <span>

                                {category.count} Products

                            </span>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default Categories;