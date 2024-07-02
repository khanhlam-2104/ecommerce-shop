import getProducts from "@/actions/getProducts";
import Summary from "./Summary";
import getOrders from "@/actions/getOrders";
import getUsers from "@/actions/getUsers";
import Container from "../components/Container";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "../components/NullData";

async function Admin() {

    const currentUser = await getCurrentUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Access denied!" />
  }

  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();

  return (
    <div className="pt-8">
      <Container>
        <Summary products={products} orders={orders} users={users} />
      </Container>
    </div>
  );
}

export default Admin;