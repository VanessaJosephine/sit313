import React, { useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { faker } from '@faker-js/faker';
import { useNavigate } from 'react-router-dom';
import '../Card.css';

function Subscription() {
    const navigate = useNavigate();
    const [stripeError, setStripeError] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const item = {
        price: "price_1Lojy4C4kyfvUPAmbNM9ZqjG",
        quantity: 1
    };
    const checkoutOptions = {
        lineItems: [item],
        mode: "payment",
        successUrl: `${window.location.origin}/success`,
        cancelUrl: `${window.location.origin}/cancel`
    };

    const redirectToCheckout = async () => {
        setLoading(true);
        navigate("/success");
        setLoading(false);
    };

    const redirectToCheckout2 = async () => {
        setLoading(true);
        console.log("redirectToCheckout");

        const stripe = await loadStripe(`pk_test_51LojofC4kyfvUPAmlGELGVdlzhmRYR6G7taVEVogyYFN73J41WpOcWAqdadhIBkuO5621JJyOLJ8W0MDrmrePbCq00M1tk4t8d`);
        const { error } = await stripe.redirectToCheckout(checkoutOptions);
        console.log("Stripe checkout error", error);

        if (error) setStripeError(error.message);
        setLoading(false);
    };

    if (stripeError) alert(stripeError);
    return (
        <div>
            <div className="cardgroup">
                <div class="product-card">
                    <div class="product-tumb">
                        <img src={faker.image.business(null, null, true)} alt="" />
                    </div>
                    <div class="product-details">
                        <span>Standard</span>
                        <h1>Free!</h1>
                        <span>All your basic functionalities covered! No extra cost needed!</span><br /><br />
                        <div class="product-bottom-details-subs">
                            <div class="product-links-subs">
                                <button onClick={redirectToCheckout} disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Subscribe"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="product-card">
                    <div class="product-tumb">
                        <img src={faker.image.business(null, null, true)} alt="" />
                    </div>
                    <div class="product-details">
                        <span>Premium - One Time</span>
                        <h1>$25</h1>
                        <span>With added customization features like messages, banners, themes, and content controls + admin and support features!</span><br /><br />
                        <div class="product-bottom-details-subs">
                            <div class="product-links-subs">
                                <button onClick={redirectToCheckout2} disabled={isLoading}>
                                    {isLoading ? "Loading..." : "Subscribe"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div><br /><br /><br />
        </div>
    )
}

export default Subscription;