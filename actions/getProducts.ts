import prisma from '@/libs/prismadb';

export interface IProductParams {
    category?: string | null;
    searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
    try {
        const { category, searchTerm } = params;
        let searchString = searchTerm || ''; // Use searchTerm if defined, otherwise an empty string

        let query: any = {};

        if (category) {
            query.category = category;
        }

        const products = await prisma.product.findMany({
            where: {
                ...query,
                OR: [
                    {
                        name: {
                            contains: searchString,
                            mode: 'insensitive',
                        },
                    },
                    {
                        description: {
                            contains: searchString,
                            mode: 'insensitive',
                        },
                    },
                ],
            },
            include: {
                reviews: {
                    include: {
                        user: true,
                    },
                    orderBy: {
                        createdDate: 'desc',
                    },
                },
            },
        });

        return products;

    } catch (error: any) {
        throw new Error(error.message); // Use error.message for a more descriptive error
    }
}
