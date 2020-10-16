import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import SSDashboard from "views/Dashboard/SSDashboard.js";

const ssRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: SSDashboard,
    layout: "/ssdash"
  }
];

export default ssRoutes;
