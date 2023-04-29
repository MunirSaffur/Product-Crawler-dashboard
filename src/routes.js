// import
import Dashboard from "views/Dashboard/Dashboard";
import Sources from "views/Dashboard/Sources"
import Tables from "views/Dashboard/Tables";
import Billing from "views/Dashboard/Billing";
import RTLPage from "views/Dashboard/RTL";
import Profile from "views/Dashboard/Profile";
import SignIn from "views/Auth/SignIn.js";
import SignUp from "views/Auth/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    disabled: false,
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/Sources",
    name: "Sources",
    disabled: true,
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Sources,
    layout: "/admin",
  },
  {
    path: "/Destination",
    name: "Destination",
    disabled: true,
    rtlName: "لوحة القيادة",
    icon: <StatsIcon color="inherit" />,
    component: Sources,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Tables",
  //   rtlName: "لوحة القيادة",
  //   icon: <StatsIcon color="inherit" />,
  //   component: Tables,
  //   layout: "/admin",
  // },
  // {
  //   path: "/rtl-support-page",
  //   name: "RTL",
  //   rtlName: "آرتيإل",
  //   icon: <SupportIcon color="inherit" />,
  //   component: RTLPage,
  //   layout: "/rtl",
  // },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    rtlName: "صفحات",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        disabled: false,
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        secondaryNavbar: true,
        component: Profile,
        layout: "/admin",
      },
      {
        path: "/billing",
        name: "Billing",
        disabled: true,
        rtlName: "لوحة القيادة",
        icon: <CreditIcon color="inherit" />,
        component: Billing,
        layout: "/admin",
      },
      {
        path: "/SignIn",
        name: "SignIn",
        disabled: false,
        rtlName: "لوحة القيادة",
        icon: <CreditIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      }
    ],
  },
];
export default dashRoutes;
