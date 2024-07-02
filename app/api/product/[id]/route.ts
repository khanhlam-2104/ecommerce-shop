import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/libs/prismadb';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        // Lấy thông tin người dùng hiện tại
        const currentUser = await getCurrentUser();

        // Kiểm tra nếu người dùng không tồn tại
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Kiểm tra nếu người dùng không có quyền ADMIN
        if (currentUser.role !== "ADMIN") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Xóa sản phẩm từ cơ sở dữ liệu
        const product = await prisma.product.delete({
            where: { id: params.id }
        });

        // Trả về thông tin sản phẩm đã xóa
        return NextResponse.json(product);
    } catch (error) {
        console.error("Error deleting product:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
