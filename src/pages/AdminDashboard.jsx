import { useState } from "react";

import {
    FaBoxOpen,
    FaFire,
    FaTags,
    FaClipboardList
} from "react-icons/fa";

import AdminProductForm from "../components/AdminProductForm";
import AdminProductTable from "../components/AdminProductTable";

const AdminDashboard = () => {

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const refreshProducts = () => {

        setRefresh(!refresh);

    };

    const clearSelection = () => {

        setSelectedProduct(null);

    };

    return (

        <div className="admin-dashboard">

            <div className="dashboard-header">

                <div>

                    <h1>

                        👋 Welcome Admin

                    </h1>

                    <p>

                        Manage your Synora store efficiently

                    </p>

                </div>

            </div>

            <div className="dashboard-cards">

                <div className="dashboard-card">

                    <FaBoxOpen />

                    <h3>Products</h3>

                    <span>Manage Products</span>

                </div>

                <div className="dashboard-card">

                    <FaFire />

                    <h3>Hero Products</h3>

                    <span>Homepage Slider</span>

                </div>

                <div className="dashboard-card">

                    <FaTags />

                    <h3>Deals</h3>

                    <span>Discount Products</span>

                </div>

                <div className="dashboard-card">

                    <FaClipboardList />

                    <h3>Inventory</h3>

                    <span>Update Stock</span>

                </div>

            </div>

            <div className="admin-content">

                <AdminProductForm

                    selectedProduct={selectedProduct}

                    refreshProducts={refreshProducts}

                    clearSelection={clearSelection}

                />

                <AdminProductTable

                    refresh={refresh}

                    setSelectedProduct={setSelectedProduct}

                    refreshProducts={refreshProducts}

                />

            </div>

        </div>

    );

};

export default AdminDashboard;