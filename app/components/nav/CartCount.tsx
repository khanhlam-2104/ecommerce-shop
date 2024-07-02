"use client";

import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

const CartCount = () => {
    const { cartTotalQty } = useCart();
    const router = useRouter();

    return (
        <div
            className="relative cursor-pointer"
            onClick={() => router.push("/cart")}>
            <div className="text-3x1">
                <CiShoppingCart style={{ width: '2em', height: '2em' }} />
            </div>
            <span
                className={`absolute top-[-10px] right-[-10px] bg-slate-700 text-white h-5 w-5 rounded-full flex items-center justify-center text-sm`}
            >
                {cartTotalQty}
            </span>
        </div>
    );
};

export default CartCount;