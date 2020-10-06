import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import SSDashboard from "views/Dashboard/SSDashboard.js";
import SSNotify from "views/Notify/SSNotify.js";
import SSUserProfile from "views/UserProfile/SSUserProfile.js";

const ssRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: SSDashboard,
    layout: "/ssdash"
  },
  {
    path: "/notify",
    name: "Notify",
    icon: Notifications,
    component: SSNotify,
    layout: "/ssdash"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: SSUserProfile,
    layout: "/ssdash"
  }
];

export default ssRoutes;
