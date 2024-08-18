import { Layout } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
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

function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <h3 style={{margin: "0", color: "#FF7F50"}}>Parameter</h3>
          <Row gutter={16}>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Temperature"
                  value={38}
                  precision={0}
                  valueStyle={{
                    color: "red",
                  }}
                  prefix={<ArrowUpOutlined />}
                  suffix="°C"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Humidity"
                  value={65}
                  precision={0}
                  valueStyle={{
                    color: "green",
                  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="%"
                />
              </Card>
            </Col>
            <Col span={8}>
              <Card bordered={false}>
                <Statistic
                  title="Brightness"
                  value={350}
                  precision={0}
                  valueStyle={{
                    color: "green",
                  }}
                  prefix={<ArrowDownOutlined />}
                  suffix="lx"
                />
              </Card>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Content style={contentStyle}>
            <h3 style={{margin: "0", color: "#FF7F50"}}>Chart</h3>
          </Content>
          <Sider width="25%" style={siderStyle}>
            <h3 style={{margin: "0", color: "#FF7F50"}}>Switch</h3>
          </Sider>
        </Layout>
      </Layout>
    </>
  );
}

export default Dashboard;
