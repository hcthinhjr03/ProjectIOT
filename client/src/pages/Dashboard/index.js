import { ConfigProvider, Layout } from "antd";
import { Tabs } from "antd";
import { AiFillCloud, AiFillBulb, AiFillSun } from "react-icons/ai";
import Temperature from "../../component/Charts/Temperature";
import Humidity from "../../component/Charts/Humidity";
import Brightness from "../../component/Charts/Brightness";
import DeviceSwitchs from "../../component/DeviceSwitchs";
import Parameter from "../../component/Parameter";
const { Header, Sider, Content } = Layout;

const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 200,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#f7e9e3",
};
const contentStyle = {
  textAlign: "center",
  minHeight: 500,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#f7e9e3",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#f7e9e3",
};
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "calc(100% - 8px)",
  maxWidth: "calc(100% - 8px)",
};

const tabItems = [
  {
    key: 1,
    label: "Temperature",
    children: <Temperature/>,
    icon: <AiFillSun />,
  },
  {
    key: 2,
    label: "Humidity",
    children: <Humidity/>,
    icon: <AiFillCloud />,
  },
  {
    key: 3,
    label: "Brightness",
    children: <Brightness/>,
    icon: <AiFillBulb />,
  },
];

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              itemColor: "#000",
              itemSelectedColor: "#FF7F50",
              inkBarColor: "#FF7F50",
              itemHoverColor: "#FF7F50",
              itemActiveColor: "#FF7F50",
            }
          },
          token: {
            fontSize: 16,
          },
        }}
      >
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <h3 style={{ margin: "0", color: "#FF7F50" }}>Parameter</h3>
            <Parameter/>
          </Header>
          <Layout>
            <Content style={contentStyle}>
              <h3 style={{ margin: "0", color: "#FF7F50" }}>Chart</h3>
              <div style={{display: "flex", justifyContent: "center"}}>
                <Tabs defaultActiveKey="3" items={tabItems} tabBarStyle={{marginLeft: "50px"}} />
              </div>
            </Content>
            <Sider width="40%" style={siderStyle}>
              <h3 style={{ margin: "0", color: "#FF7F50" }}>Switch</h3>
              <DeviceSwitchs/>
            </Sider>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default Dashboard;
