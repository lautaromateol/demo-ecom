import AdminNav from "@/components/nav/AdminNav";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex">
      <AdminNav />
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
