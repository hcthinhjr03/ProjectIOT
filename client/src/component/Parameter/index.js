import { Card, Col, Row, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import mqtt from "mqtt";
import { useEffect, useState } from "react";

function Parameter(){
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [brightness, setBrightness] = useState(0);

  useEffect(() => {
    const client = mqtt.connect('mqtt://192.168.1.6:9001');

    client.on('connect', () => {
      console.log('Connected to MQTT broker');
      client.subscribe('esp8266/dht/temperature');
      client.subscribe('esp8266/dht/humidity');
      client.subscribe('esp8266/dht/brightness');
    });

    client.on('message', (topic, message) => {
      if (topic === 'esp8266/dht/temperature') {
        setTemperature(message.toString());
      }
      if (topic === 'esp8266/dht/humidity') {
        setHumidity(message.toString());
      }
      if (topic === 'esp8266/dht/brightness') {
        setBrightness(message.toString());
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
                    value={temperature}
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
                    value={humidity}
                    precision={2}
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
                    value={brightness}
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