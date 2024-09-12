import { Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { useMqtt } from '../../context/MqttContext';

function Parameter(){
  const { dataSensor } = useMqtt();

    return (
        <>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false}>
                  <Statistic
                    title="Temperature"
                    value={dataSensor.temperature}
                    precision={2}
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
                    value={dataSensor.humidity}
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
                    value={dataSensor.brightness}
                    precision={0}
                    valueStyle={{
                      color: "green",
                    }}
                    prefix={<ArrowDownOutlined />}
                    suffix="lux"
                  />
                </Card>
              </Col>
            </Row>
        </>
    )
}

export default Parameter;