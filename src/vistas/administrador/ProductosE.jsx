import DashBoarAdmin from "../../componentesE/DashBoarAdmin";
import Sidebar from "../../componentesE/sidebarE";
import ProductosE from "../../componentesE/ProductosE";

export const ProductosEmpleado = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="content w-100 overflow-auto pt-24">
          <DashBoarAdmin />
          <ProductosE />
        </div>
      </div>
    </div>
  );
};
