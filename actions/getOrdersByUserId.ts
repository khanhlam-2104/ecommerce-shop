import prisma from '@/libs/prismadb';

export default async function getOrdersByUserId(UserId: string) {
    try {
        const orders = await prisma.order.findMany({
            include: { user: true, },
            orderBy: { createDate: 'desc', },
            where:{userId: UserId,}
        });
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}