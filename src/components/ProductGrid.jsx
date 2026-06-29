import { useEffect, useMemo, useState } from "react";
import axios from "../api/axios";
import ProductCard from "./ProductCard";
import Loader from "./Loader";
import "./ProductGrid.css";

const ProductGrid = ({ search, selected }) => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [sortBy, setSortBy] = useState("featured");

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

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

    const filteredProducts = useMemo(() => {

        let filtered = [...products];

        filtered = filtered.filter(product => {

            const productName = product.name.toLowerCase();

            const category = (product.category || "General");

            const matchesSearch =
                productName.includes(search.toLowerCase());

            const matchesCategory =
                selected === "All" ||
                category === selected;

            return matchesSearch && matchesCategory;

        });

        switch (sortBy) {

            case "low":

                filtered.sort(
                    (a, b) =>

                        (a.price * (1 - (a.discount || 0) / 100))

                        -

                        (b.price * (1 - (b.discount || 0) / 100))

                );

                break;

            case "high":

                filtered.sort(
                    (a, b) =>

                        (b.price * (1 - (b.discount || 0) / 100))

                        -

                        (a.price * (1 - (a.discount || 0) / 100))

                );

                break;

            case "discount":

                filtered.sort(

                    (a, b) =>

                        (b.discount || 0)

                        -

                        (a.discount || 0)

                );

                break;

            default:

                break;

        }

        return filtered;

    }, [products, search, selected, sortBy]);

    if (loading) {

        return <Loader />;

    }

    return (

        <section

            id="products"

            className="products-section"

        >

            <div className="products-header">

                <div>

                    <h2>

                        Explore Products

                    </h2>

                    <p>

                        {filteredProducts.length}

                        {" "}products available

                    </p>

                </div>

                <div className="products-actions">

                    <select

                        value={sortBy}

                        onChange={(e)=>

                            setSortBy(

                                e.target.value

                            )

                        }

                    >

                        <option value="featured">

                            Featured

                        </option>

                        <option value="low">

                            Price : Low to High

                        </option>

                        <option value="high">

                            Price : High to Low

                        </option>

                        <option value="discount">

                            Biggest Discount

                        </option>

                    </select>

                </div>

            </div>

            {

                filteredProducts.length === 0 ?

                (

                    <div className="empty-products">

                        <h3>

                            No products found.

                        </h3>

                        <p>

                            Try changing category or search.

                        </p>

                    </div>

                )

                :

                (

                    <div className="product-grid">

                        {

                            filteredProducts.map(product => (

                                <ProductCard

                                    key={product.id}

                                    product={product}

                                />

                            ))

                        }

                    </div>

                )

            }

        </section>

    );

};

export default ProductGrid;