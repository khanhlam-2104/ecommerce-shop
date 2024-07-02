import AdminNav from "@/app/components/admin/AdminNav";

export const metadata = {
    title: "Teddy shop",
    description: "Teddy-Shop Admin Dashboard"
  };
  
  const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div>
        <AdminNav/>
        {children}
      </div>
    );
  };
  
  export default AdminLayout;