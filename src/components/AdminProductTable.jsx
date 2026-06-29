import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
    FaEdit,
    FaTrash,
    FaSearch,
    FaFire,
    FaTags
} from "react-icons/fa";

const AdminProductTable = ({
    refresh,
    setSelectedProduct,
    refreshProducts
}) => {

    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {

        loadProducts();

    }, [refresh]);

    const loadProducts = async () => {

        try {

            const response = await axios.get("/products");

            setProducts(response.data);

        }

        catch (error) {

            console.error(error);

        }

    };

    const deleteProduct = async (id) => {

        if (!window.confirm("Delete this product?")) {

            return;

        }

        try {

            await axios.delete(`/products/${id}`);

            refreshProducts();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to delete.");

        }

    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="admin-table">

            <div className="table-header">

                <h2>

                    Product Management

                </h2>

                <div className="search-box">

                    <FaSearch />

                    <input

                        placeholder="Search products..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                    />

                </div>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Image</th>

                        <th>Name</th>

                        <th>Brand</th>

                        <th>Category</th>

                        <th>Price</th>

                        <th>Discount</th>

                        <th>Hero</th>

                        <th>Deals</th>

                        <th>Stock</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        filteredProducts.map(product=>(

                            <tr key={product.id}>

                                <td>

                                    <img

                                        src={

                                            product.imageUrl ||

                                            "https://placehold.co/80"

                                        }

                                        className="admin-product-image"

                                        alt=""

                                    />

                                </td>

                                <td>

                                    <strong>

                                        {product.name}

                                    </strong>

                                </td>

                                <td>

                                    {product.brand || "-"}

                                </td>

                                <td>

                                    {product.category}

                                </td>

                                <td>

                                    ₹ {product.price}

                                </td>

                                <td>

                                    {

                                        product.discount>0 ?

                                        <span className="discount-badge">

                                            {product.discount}% OFF

                                        </span>

                                        :

                                        "-"

                                    }

                                </td>

                                <td>

                                    {

                                        product.heroProduct ?

                                        <span className="hero-badge">

                                            <FaFire />

                                        </span>

                                        :

                                        "-"

                                    }

                                </td>

                                <td>

                                    {

                                        product.dealProduct ?

                                        <span className="deal-badge">

                                            <FaTags />

                                        </span>

                                        :

                                        "-"

                                    }

                                </td>

                                <td>

                                    {

                                        product.quantity>0 ?

                                        <span className="stock">

                                            {product.quantity}

                                        </span>

                                        :

                                        <span className="out-stock">

                                            Out

                                        </span>

                                    }

                                </td>

                                <td className="action-buttons">

                                    <button

                                        className="edit-btn"

                                        onClick={()=>setSelectedProduct(product)}

                                    >

                                        <FaEdit />

                                    </button>

                                    <button

                                        className="delete-btn"

                                        onClick={()=>deleteProduct(product.id)}

                                    >

                                        <FaTrash />

                                    </button>

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

};

export default AdminProductTable;