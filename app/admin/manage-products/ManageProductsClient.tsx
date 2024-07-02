"use client";

import { Product } from "@prisma/client";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import { MdCached, MdClose, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";
import ActionBtn from "@/app/components/ActionBtn";

interface ManageProductsClientProps {
    products: Product[];
}

interface ProductRow {
    id: string;
    name: string;
    price: string;
    category: string;
    brand: string;
    inStock: boolean;
    images: { image: string }[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
    const router = useRouter();
    const storage = getStorage(firebaseApp);

    const rows: ProductRow[] = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images
    }));

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        {
            field: "price",
            headerName: "Price (USD)",
            width: 100,
            renderCell: (params) => (
                <div className="font-bold text-slate-800">
                    {params.row.price}
                </div>
            ),
        },
        { field: "category", headerName: "Category", width: 100 },
        { field: "brand", headerName: "Brand", width: 100 },
        {
            field: "inStock",
            headerName: "In Stock",
            width: 120,
            renderCell: (params) => (
                <Status
                    text={params.row.inStock ? "in stock" : "out of stock"}
                    icon={params.row.inStock ? MdDone : MdClose}
                    bg={params.row.inStock ? "bg-teal-200" : "bg-rose-200"}
                    color={params.row.inStock ? "text-teal-700" : "text-rose-700"}
                />
            ),
        },
        {
            field: "action",
            headerName: "Actions",
            width: 200,
            renderCell: (params) => (
                <div className="flex justify-between gap-4 w-full pt-2.5">
                    <ActionBtn icon={MdCached} onClick={() => handleToggleStock(params.row.id, params.row.inStock)} />
                    <ActionBtn icon={MdDelete} onClick={() => handleDelete(params.row.id, params.row.images)} />
                    <ActionBtn icon={MdRemoveRedEye} onClick={() => router.push(`/product/${params.row.id}`)} />
                </div>
            ),
        },
    ];

    const handleToggleStock = useCallback(async (id: string, inStock: boolean) => {
        try {
            await axios.put('/api/product', { id, inStock: !inStock });
            toast.success('Product status changed');
            router.refresh();
        } catch (err) {
            toast.error('Oops! Something went wrong');
            console.error(err);
        }
    }, [router]);

    const handleDelete = useCallback(async (id: string, images: { image: string }[]) => {
        toast('Deleting product, please wait!');
    
        const handleImageDelete = async () => {
            for (const item of images) {
                try {
                    const imageRef = ref(storage, item.image);
                    await deleteObject(imageRef);
                    console.log('Image deleted:', item.image);
                } catch (error) {
                    console.error('Deleting images error:', error);
                    toast.error('Failed to delete some images');
                }
            }
        };
    
        await handleImageDelete();
    
        try {
            await axios.delete(`/api/product/${id}`);
            toast.success("Product deleted");
            router.refresh();  // Ensure useRouter is correctly used
        } catch (err) {
            toast.error("Failed to delete product");
            console.error(err);
        }
    }, [router, storage]);

    return (
        <div className="max-w-[1150px] m-auto text-xl">
            <div className="mb-4 mt-8">
                <Heading title="Manage Products" center />
            </div>
            <div style={{ height: 450, width: "100%" }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 9 },
                        },
                    }}
                    pageSizeOptions={[9, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
        </div>
    );
};

export default ManageProductsClient;
