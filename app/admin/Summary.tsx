'use client';
import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import { formatNumber } from "@/utils/formatNumber";

interface SummaryProps {
    orders: Order[];
    products: Product[];
    users: User[];
}

type SummaryDataType = {
    [key: string]: {
        label: string;
        digit: number;
    }
};

const Summary: React.FC<SummaryProps> = ({ orders, products, users }) => {
    const [summaryData, setSummaryData] = useState<SummaryDataType>({
        sale: {
            label: 'Total Sale',
            digit: 0
        },
        products: {
            label: 'Total Products',
            digit: 0
        },
        orders: {
            label: 'Total Orders',
            digit: 0
        },
        paidOrders: {
            label: 'Paid Orders',
            digit: 0
        },
        unpaidOrders: {
            label: 'Unpaid Orders',
            digit: 0
        },
        users: {
            label: 'Total Users',
            digit: 0
        }
    });

    useEffect(() => {
        setSummaryData((prev) => {
            let tempData = { ...prev };
            const totalSale = orders.reduce((acc, item) => {
                return item.status === 'complete' ? acc + item.amount : acc;
            }, 0);

            const paidOrders = orders.filter((order) => order.status === 'complete').length;
            const unpaidOrders = orders.filter((order) => order.status === 'pending').length;

            tempData.sale.digit = totalSale;
            tempData.orders.digit = orders.length;
            tempData.paidOrders.digit = paidOrders;
            tempData.unpaidOrders.digit = unpaidOrders;
            tempData.products.digit = products.length;
            tempData.users.digit = users.length;

            return tempData;
        });
    }, [orders, products, users]);

    const summaryKeys = Object.keys(summaryData);

    const formatPrice = (value: number): string => {
        // Implement your price formatting logic here
        return `$${value.toFixed(2)}`;
    };

    return (
        <div className="max-w-[1150px] m-auto">
            <div className="mb-4 mt-8">
                <Heading title="Stats" center />
            </div>
            <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
                {summaryKeys.map((key) => (
                    <div key={key} className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition">
                        <div className="text-x1 md:text-4x1 font-bold">
                            {summaryData[key].label === 'Total Sale' ? (
                                <>{formatNumber(summaryData[key].digit)}</>
                            ) : (
                                <>{summaryData[key].digit}</>
                            )}
                        </div>
                        <div className="text-center">
                            {summaryData[key].label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summary;
