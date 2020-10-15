import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import RODashboard from "views/Dashboard/RODashboard.js";
import ROInformation from "views/UserProfile/ROInformation.js";
import RONotifications from "views/Notifications/RONotifications.js";

const roRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: RODashboard,
    layout: "/rodash"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: RONotifications,
    layout: "/rodash"
  },
  {
    path: "/restoinfo",
    name: "Information",
    icon: Person,
    component: ROInformation,
    layout: "/rodash"
  }
];

export default roRoutes;
