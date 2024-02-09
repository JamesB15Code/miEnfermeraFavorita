import DashBoarAdmin from "../../componentesE/DashBoarAdmin";
import Sidebar from "../../componentesE/sidebarE";
import VentasE from "../../componentesE/Ventas";

export const VentasEmpleado = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="content w-100 overflow-auto pt-24">
          <DashBoarAdmin />
          <VentasE />
        </div>
      </div>
    </div>
  );
};
