import { Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import mqtt from "mqtt";
import { useEffect, useState } from "react";

function Parameter(){
  const [dataSensor, setDataSensor] = useState();

  useEffect(() => {
    const client = mqtt.connect('mqtt://192.168.1.6:9001');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('esp8266/datasensor');
    });

    client.on('message', (topic, message) => {
      if (topic === 'esp8266/datasensor') {
        setDataSensor(JSON.parse(message.toString()));
      }
    });

    client.on('error', (error) => {
      console.error('MQTT error:', error);
    });

    return () => {
      client.end();
    };
  }, []);

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