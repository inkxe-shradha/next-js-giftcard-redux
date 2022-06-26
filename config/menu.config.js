import SendTimeExtensionIcon from "@mui/icons-material/SendTimeExtension";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import HomeIcon from "@mui/icons-material/Home";
const menuItems = [
  {
    id: 1,
    name: "Home",
    path: "/",
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: "Gift Received",
    path: "/users/gift-received",
    icon: <SendTimeExtensionIcon />,
  },
  {
    id: 3,
    name: "Gift Sent",
    path: "/users/gift-sent",
    icon: <CallReceivedIcon />,
  },
];

export default menuItems;
