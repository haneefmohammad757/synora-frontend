import "./Deals.css";
import { useEffect, useState } from "react";
import axios from "../api/axios";
import ProductCard from "./ProductCard";

const Deals = () => {

    const [products, setProducts] = useState([]);

    const [timeLeft, setTimeLeft] = useState({
        hours:12,
        minutes:45,
        seconds:30
    });

    useEffect(() => {

        loadDeals();

        const timer = setInterval(() => {

            setTimeLeft(prev=>{

                let {hours,minutes,seconds}=prev;

                if(seconds>0){

                    seconds--;

                }else{

                    seconds=59;

                    if(minutes>0){

                        minutes--;

                    }else{

                        minutes=59;

                        if(hours>0){

                            hours--;

                        }else{

                            hours=12;
                            minutes=45;
                            seconds=30;

                        }

                    }

                }

                return {hours,minutes,seconds};

            });

        },1000);

        return ()=>clearInterval(timer);

    },[]);

    const loadDeals = async()=>{

        try{

            const res=await axios.get("/products");

            setProducts(res.data.slice(0,4));

        }

        catch(err){

            console.log(err);

        }

    };

    return(

        <section className="deals">

            <div className="deal-header">

                <div>

                    <h2>⚡ Today's Deals</h2>

                    <p>Limited time offers</p>

                </div>

                <div className="timer">

                    <div>{timeLeft.hours}h</div>
                    <div>{timeLeft.minutes}m</div>
                    <div>{timeLeft.seconds}s</div>

                </div>

            </div>

            <div className="deal-grid">

                {

                    products.map(product=>(

                        <ProductCard
                            key={product.id}
                            product={product}
                        />

                    ))

                }

            </div>

        </section>

    );

};

export default Deals;