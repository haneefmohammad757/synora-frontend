import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import "./ProductGrid.css";

const ProductGrid = ({ search, selected }) => {

    const navigate = useNavigate();

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const response = await axios.get("/products");

            setProducts(response.data);

        }

        catch (err) {

            console.log(err);

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <Loader />;

    }

    const filteredProducts = products.filter(product => {

        const matchSearch = product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const category = product.category || "General";

        const matchCategory =
            selected === "All" ||
            category === selected;

        return matchSearch && matchCategory;

    });

    const sortedProducts = [...filteredProducts];

    switch (sortBy) {

        case "low":

            sortedProducts.sort((a, b) => a.price - b.price);

            break;

        case "high":

            sortedProducts.sort((a, b) => b.price - a.price);

            break;

        case "az":

            sortedProducts.sort((a, b) =>
                a.name.localeCompare(b.name)
            );

            break;

        case "za":

            sortedProducts.sort((a, b) =>
                b.name.localeCompare(a.name)
            );

            break;

        case "newest":

            sortedProducts.sort((a, b) => b.id - a.id);

            break;

        default:

            sortedProducts.sort((a, b) => b.id - a.id);

    }

    const featuredProducts = sortedProducts.slice(0, 6);

    return (

        <section
            id="products"
            className="products-section"
        >

            <div className="section-header">

                <div>

                    <h2 className="section-title">

                        Featured Products

                    </h2>

                    <p className="section-subtitle">

                        Discover our latest collection

                    </p>

                </div>

                <div className="section-actions">

                    <select
                        className="sort-dropdown"
                        value={sortBy}
                        onChange={(e) =>
                            setSortBy(e.target.value)
                        }
                    >

                        <option value="featured">

                            Featured

                        </option>

                        <option value="newest">

                            Newest

                        </option>

                        <option value="low">

                            Price : Low to High

                        </option>

                        <option value="high">

                            Price : High to Low

                        </option>

                        <option value="az">

                            A - Z

                        </option>

                        <option value="za">

                            Z - A

                        </option>

                    </select>

                    <button

                        className="view-all-btn"

                        onClick={() =>
                            navigate("/products")
                        }

                    >

                        View All →

                    </button>

                </div>

            </div>

            <div className="product-grid">

                {

                    featuredProducts.length > 0 ?

                        featuredProducts.map(product => (

                            <ProductCard

                                key={product.id}

                                product={product}

                            />

                        ))

                        :

                        <h3 className="no-products">

                            No products found.

                        </h3>

                }

            </div>

        </section>

    );

};

export default ProductGrid;