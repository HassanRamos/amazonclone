import React, { useState} from "react";
import './Payment.css'
import {Link} from "react-router-dom";
import {CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import CheckoutProduct from "./CheckoutProduct";
import {useStateValue} from "./StateProvider";
import {getBasketTotal} from "./reducer";





function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    

    const [error, setError] = useState(null);
    const [disabled, setDisable] = useState(true);

    const [succeeded, setSucceeded] = useState(false)
    const [processing, setProcessing] = useState('')

   

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);
        setSucceeded(false)


    }

    const handleChange = e => {
        setDisable(e.empty);
        setError(e.error ? e.error.message : "")
    }

    return (
        <div className={'payment'}>
            <div className={'payment__container'}>
                <h1> Checkout (<Link to={'./checkout'}>{basket?.length} items </Link>) </h1>
                <div className={'payment__section'}>
                    <div className={'payment__title'}>
                        <h3>Delivery address</h3>
                        <div className={'payment__address'}>
                            <p>{user?.email}</p>
                            <p>3407 Gass Ave</p>
                            <p>Pittsburgh, PA 15212</p>
                        </div>
                    </div>
                </div>

                <div className={'payment__section'}>
                    <div className={'payment__title'}>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className={'payment__items'}>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}/>
                        ))}
                    </div>
                </div>

                <div className={'payment__section'}>
                    <div className={'payment__title'}>
                        <h3>Payment Method</h3>
                    </div>
                    <div className={'payment__details'}>
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange}/>

                            <div className={'payment__priceContainer'}>
                                <CurrencyFormat renderText={(value) => (
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                                decimalScale={2}
                                                value={getBasketTotal(basket)}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                prefix={"$"}
                                />
                                <button disabled={processing || disabled || succeeded}>
                                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment;
