import { useEffect, useState } from "react";
import axios from "../api/axios";
import toast from "react-hot-toast";

const AdminProductForm = ({
    selectedProduct,
    refreshProducts,
    clearSelection
}) => {

    const emptyProduct = {

        name: "",

        description: "",

        brand: "",

        category: "",

        price: "",

        discount: 0,

        quantity: "",

        imageUrl: "",

        heroProduct: false,

        heroOrder: 0,

        dealProduct: false

    };

    const [product, setProduct] = useState(emptyProduct);

    useEffect(() => {

        if (selectedProduct) {

            setProduct({

                ...emptyProduct,

                ...selectedProduct

            });

        } else {

            setProduct(emptyProduct);

        }

    }, [selectedProduct]);

    const handleChange = (e) => {

        const {

            name,

            value,

            type,

            checked

        } = e.target;

        setProduct({

            ...product,

            [name]:

                type === "checkbox"

                    ? checked

                    : value

        });

    };

 const saveProduct = async () => {

    try {

        const productToSave = {

            ...product,

            heroOrder: product.heroProduct
                ? Number(product.heroOrder)
                : 0,

            discount: Number(product.discount) || 0,

            quantity: Number(product.quantity) || 0,

            price: Number(product.price) || 0

        };

        if (selectedProduct) {

            await axios.put(

                `/products/${selectedProduct.id}`,

                productToSave

            );

            toast.success("Product Updated Successfully.");

        } else {

            await axios.post(

                "/products",

                productToSave

            );

            toast.success("Product Added Successfully.");

        }

        setProduct(emptyProduct);

        refreshProducts();

        clearSelection();

    }

    catch (error) {

        console.error(error);

        console.log(error.response?.data);

        toast.error("Unable to save product.");

    }

};

    return (

        <div className="admin-form">

            <div className="form-header">

                <h2>

                    {

                        selectedProduct

                            ? "✏ Edit Product"

                            : "➕ Add Product"

                    }

                </h2>

                <p>

                    Manage products shown in your Synora store.

                </p>

            </div>

            <div className="form-section">

                <h3>

                    Basic Information

                </h3>

                <div className="form-grid">

                    <input

                        name="name"

                        placeholder="Product Name"

                        value={product.name}

                        onChange={handleChange}

                    />

                    <input

                        name="brand"

                        placeholder="Brand"

                        value={product.brand}

                        onChange={handleChange}

                    />

                    <input

                        name="category"

                        placeholder="Category"

                        value={product.category}

                        onChange={handleChange}

                    />

                    <input

                        type="number"

                        name="quantity"

                        placeholder="Stock Quantity"

                        value={product.quantity}

                        onChange={handleChange}

                    />

                </div>

                <textarea

                    name="description"

                    placeholder="Product Description"

                    value={product.description}

                    onChange={handleChange}

                />

            </div>

            <div className="form-section">

                <h3>

                    Pricing

                </h3>

                <div className="form-grid">

                    <input

                        type="number"

                        name="price"

                        placeholder="Price"

                        value={product.price}

                        onChange={handleChange}

                    />

                    <input

                        type="number"

                        name="discount"

                        placeholder="Discount %"

                        value={product.discount}

                        onChange={handleChange}

                    />

                </div>

            </div>

            <div className="form-section">

                <h3>

                    Product Image

                </h3>

                <input

                    name="imageUrl"

                    placeholder="Image URL"

                    value={product.imageUrl}

                    onChange={handleChange}

                />

                {

                    product.imageUrl && (

                        <div className="image-preview">

                            <img

                                src={product.imageUrl}

                                alt="Preview"

                            />

                        </div>

                    )

                }

            </div>

                        <div className="form-section">

                <h3>

                    Homepage Settings

                </h3>

                <div className="checkbox-grid">

                    <label className="checkbox-item">

                        <input

                            type="checkbox"

                            name="heroProduct"

                            checked={product.heroProduct}

                            onChange={handleChange}

                        />

                        Show in Hero Slider

                    </label>

                    <label className="checkbox-item">

                        <input

                            type="checkbox"

                            name="dealProduct"

                            checked={product.dealProduct}

                            onChange={handleChange}

                        />

                        Show in Today's Deals

                    </label>

                </div>

                {

                    product.heroProduct && (

                        <select

                            name="heroOrder"

                            value={product.heroOrder}

                            onChange={handleChange}

                        >

                            <option value={0}>

                                Select Hero Position

                            </option>

                            <option value={1}>Position 1</option>

                            <option value={2}>Position 2</option>

                            <option value={3}>Position 3</option>

                            <option value={4}>Position 4</option>

                            <option value={5}>Position 5</option>

                        </select>

                    )

                }

            </div>

            <div className="button-group">

                {

                    selectedProduct && (

                        <button

                            className="cancel-btn"

                            onClick={() => {

                                setProduct(emptyProduct);

                                clearSelection();

                            }}

                        >

                            Cancel

                        </button>

                    )

                }

                <button

                    className="save-btn"

                    onClick={saveProduct}

                >

                    {

                        selectedProduct

                            ? "Update Product"

                            : "Save Product"

                    }

                </button>

            </div>

        </div>

    );

};

export default AdminProductForm;