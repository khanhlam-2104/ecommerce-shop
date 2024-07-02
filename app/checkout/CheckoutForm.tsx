import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import { useElements, useStripe, PaymentElement, AddressElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
    clientSecret: string;
    handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    clientSecret,
    handleSetPaymentSuccess,
}) => {
    const { CartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false);

    const formattedPrice = formatPrice(CartTotalAmount);

    useEffect(() => {
        if (!stripe) {
            return;
        }
        if (!clientSecret) {
            return;
        }
        handleSetPaymentSuccess(false);
    }, [stripe]);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        setIsLoading(true)

        stripe
            .confirmPayment({
                elements,
                redirect: 'if_required'
            })
            .then((result) => {
                if (!result.error) {
                    toast.success("Checkout Success");


                    handleClearCart();
                    handleSetPaymentSuccess(true);
                    handleSetPaymentIntent(null);
                }

                setIsLoading(false);
            });
    }

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your details to complete checkout" />
            </div>
            <h2 className="font-semibold mb-2">Address Information</h2>
            <AddressElement
                options={{
                    mode: "shipping",
                    allowedCountries: ["US", "KE"],
                }}
            />
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="py-4 text-center bg-slate-100 text-slate-700 text-xl font-bold">
                Total: {formattedPrice}
            </div>
            <Button
                label={isLoading ? "Processing" : "Pay now"}
                disabled={isLoading || !stripe || !elements}
                onClick={() => { }}  >
            </Button>
        </form>
    );
};

export default CheckoutForm;