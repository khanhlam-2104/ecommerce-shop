import { CartProductType } from "@/app/product/[productId]/ProductDetails";

// Interface definition
interface SetQtyProps {
    cartCounter?: boolean;
    cartProduct: CartProductType;
    handleQtyIncrease: () => void;
    handleQtyDecrease: () => void;
}

const btnStyles = 'border-[1.2px] border-state-300 px-2 rounded';

// Component definition
const SetQuantity: React.FC<SetQtyProps> = ({
    cartCounter,
    cartProduct,
    handleQtyIncrease,
    handleQtyDecrease,
}) => {
    return (
        <div className="flex gap-8 items-center">
            {cartCounter ? null : (
                <div className="font-semibold">QUANTITY:</div>
            )}
            <div className="flex gap-4 items-center text-base">
                <button onClick={handleQtyDecrease} className={btnStyles}>-</button>
                <div>{cartProduct.quantity}</div>
                <button onClick={handleQtyIncrease} className={btnStyles}>+</button>
            </div>
        </div>
    );
};

export default SetQuantity;