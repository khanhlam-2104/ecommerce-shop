import Container from "@/app/components/Container";
import ManageOrdersClient from "./ManageOrdersClient";
import getOrders from "@/actions/getOrders";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";


const ManageOrders = async () => {

    const orders = await getOrders();
    const currentUser = await getCurrentUser();

    if (!currentUser || currentUser.role !== 'ADMIN') {
        return <NullData title="Access denied!" />
    }

    return (
        <div>
            <Container>
                <ManageOrdersClient orders={orders} />
            </Container>
        </div>
    );
};

export default ManageOrders;