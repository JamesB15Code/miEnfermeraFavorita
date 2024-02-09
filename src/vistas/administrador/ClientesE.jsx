import DashBoarAdmin from "../../componentesE/DashBoarAdmin";
import Sidebar from "../../componentesE/sidebarE";
import ClientesE from "../../componentesE/Clientes";

export const ClientesEmpleado = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="content w-100">
          <DashBoarAdmin />
          <ClientesE />
        </div>
      </div>
    </div>
  );
};
