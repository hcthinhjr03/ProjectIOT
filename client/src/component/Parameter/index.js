import { Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

function Parameter(){
    return (
        <>
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
        </>
    )
}

export default Parameter;