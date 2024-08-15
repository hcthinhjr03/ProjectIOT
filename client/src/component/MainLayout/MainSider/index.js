import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import {
    NotificationOutlined,
    UserOutlined,
    DesktopOutlined,
    PieChartOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

const items = [
  {
    key: "",
    icon: <PieChartOutlined />,
    label: "Dashboard",
  },
  {
    key: "device",
    icon: <DesktopOutlined />,
    label: "Device",
  },
  {
    key: "action-history",
    icon: <NotificationOutlined />,
    label: "Action History",
  },
  {
    key: "profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
];

function MainSider() {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer},
  } = theme.useToken();

  const handleSelect = (item) => {
    navigate(`/${item.key}`)
  }
  return (
    <>
      <Sider
        width={200}
        style={{
          background: colorBgContainer,
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={[""]}
          style={{
            height: "100%",
            borderRight: 0,
          }}
          items={items}
          onSelect={handleSelect}
        />
      </Sider>
    </>
  );
}

export default MainSider;
