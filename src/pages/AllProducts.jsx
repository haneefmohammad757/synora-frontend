import { useEffect, useMemo, useState } from "react";
import axios from "../api/axios";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import "./AllProducts.css";

const AllProducts = () => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

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

    const filteredProducts = useMemo(() => {

        const filtered = products.filter(product =>

            product.name

                .toLowerCase()

                .includes(search.toLowerCase())

        );

        switch (sortBy) {

            case "low":

                filtered.sort((a, b) => a.price - b.price);

                break;

            case "high":

                filtered.sort((a, b) => b.price - a.price);

                break;

            case "az":

                filtered.sort((a, b) =>

                    a.name.localeCompare(b.name)

                );

                break;

            case "za":

                filtered.sort((a, b) =>

                    b.name.localeCompare(a.name)

                );

                break;

            case "newest":

                filtered.sort((a, b) => b.id - a.id);

                break;

            default:

                filtered.sort((a, b) => b.id - a.id);

        }

        return filtered;

    }, [products, search, sortBy]);

    if (loading) {

        return <Loader />;

    }

    return (

        <div className="all-products-page">

            <div className="all-products-header">

                <div>

                    <h1>

                        All Products

                    </h1>

                    <p>

                        {filteredProducts.length} Products Available

                    </p>

                </div>

                <div className="all-products-actions">

                    <input

                        type="text"

                        placeholder="Search products..."

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                    <select

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

                </div>

            </div>

            {

                filteredProducts.length === 0 ?

                (

                    <div className="no-products">

                        <h2>

                            No Products Found

                        </h2>

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

        </div>

    );

};

export default AllProducts;