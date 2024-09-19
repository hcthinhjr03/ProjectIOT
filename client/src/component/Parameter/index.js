import { Card, Col, Row, Progress } from "antd";
import { useMqtt } from '../../context/MqttContext';

function Parameter(){
  const { dataSensor } = useMqtt();

  // const twoColors = {
  //   '0%': '#108ee9',
  //   '100%': '#87d068',
  // };
  const temperatureColors = {
    '0%': '#e1eec3',
    '30%': '#f05053',
    //'50%': '#ffe58f',
    '100%': '#f05053',
  };

  const humidityColors = {
    '0%': '#E5CCC3',
    //'50%': '#ffe58f',
    '100%': '#6047DF',
  };


  const brightnessColors = {
    '0%': '#87d068',
    '30%': '#ffe58f',
    '100%': '#ffccc7',
  };

    return (
        <>
            <Row gutter={16}>
              <Col span={8}>
                <Card bordered={false}>
                  <p style={{margin: 0, marginBottom: "10px", marginTop: "-10px"}}>Temperature</p>
                  <Progress type="dashboard" percent={dataSensor.temperature/50*100}  strokeColor={temperatureColors} strokeWidth={12} size={90} format={ (percent) =>  percent/100*50 + "°C"}/>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <p style={{margin: 0, marginBottom: "10px", marginTop: "-10px"}}>Humidity</p>
                  <Progress type="dashboard" percent={dataSensor.humidity}  strokeColor={humidityColors} strokeWidth={12} size={90} format={ (percent) =>  percent + "%"}/>
                </Card>
              </Col>
              <Col span={8}>
                <Card bordered={false}>
                  <p style={{margin: 0, marginBottom: "10px", marginTop: "-10px"}}>Brightness</p>
                  <Progress type="dashboard" percent={dataSensor.brightness/400*100}  strokeColor={brightnessColors} strokeWidth={12} size={90} format={ (percent) =>  percent/100*400 + "lux"}/>
                </Card>
              </Col>
            </Row>
        </>
    )
}

export default Parameter;