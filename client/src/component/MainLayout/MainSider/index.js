import { Layout, Menu, theme, ConfigProvider } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(
    location.pathname.substring(1) || ""
  );

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleSelect = (item) => {
    navigate(`/${item.key}`);
    setSelectedKey(item.key);
  };
  return (
    <>
      <Sider
        width={200}
        style={{
          background: colorBgContainer,
        }}
      >
        <ConfigProvider
          theme={{
            components: {
              Menu: {
                itemSelectedColor: '#FF7F50',
                itemSelectedBg: "#f7e9e3",
                iconSize: 22
              }
            },
          }}
        >
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{
              height: "100%",
              borderRight: 0,
              fontSize: "17px",
            }}
            items={items}
            onSelect={handleSelect}
          />
        </ConfigProvider>
      </Sider>
    </>
  );
}

export default MainSider;
