import { useState } from "react";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Deals from "../components/Deals";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";
import WhyChooseUs from "../components/WhyChooseUs";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

function Home() {

    const [search, setSearch] = useState("");

    const [selected, setSelected] = useState("All");

    const currentUser = JSON.parse(localStorage.getItem("user"));

    return (

        <>

            <Navbar

                search={search}

                setSearch={setSearch}

            />

            <Hero />

            <CategorySection

                selected={selected}

                setSelected={setSelected}

            />


            <ProductGrid

                search={search}

                selected={selected}

            />

<Deals />
            {
                
                !currentUser && (
                    
                    <>

                        <WhyChooseUs />

                        <Newsletter />

                    </>

                )

            }

            <Footer />

        </>

    );

}

export default Home;