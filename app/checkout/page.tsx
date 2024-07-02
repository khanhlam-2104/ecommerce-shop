import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import CheckoutClient from "./CheckoutClient";


const Checkout = () => {
    return <div className="p-8">
        <Container>
            <FormWrap>
                <CheckoutClient/>
            </FormWrap>
        </Container>
    </div>;
}

export default Checkout;