import DashBoarAdmin from "../../componentesE/DashBoarAdmin";
import Sidebar from "../../componentesE/sidebarE";
import Home from "../../componentesE/Home";

export const InicioAdmin = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="content w-100">
          <DashBoarAdmin />
          <Home />
        </div>
      </div>
    </div>
  );
};
