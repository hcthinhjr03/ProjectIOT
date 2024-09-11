import { ConfigProvider, Descriptions } from "antd";
import { Switch } from "antd";
import "./DeviceSwitchs.scss";
import { useState, useEffect } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import mqtt from "mqtt";

function DeviceSwitchs() {
  const [fanDotLottie, setFanDotLottie] = useState(null);
  const [lightDotLottie, setLightDotLottie] = useState(null);
  const [ACDotLottie, setACDotLottie] = useState(null);

  const [isFanOn, setIsFanOn] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isACOn, setIsACOn] = useState(false);

  const [client, setClient] = useState(null);
  const [connected, setConnected] = useState(false);

  const fanDotLottieRefCallback = (dotLottie) => {
    setFanDotLottie(dotLottie);
  };

  const lightDotLottieRefCallback = (dotLottie) => {
    setLightDotLottie(dotLottie);
  };

  const ACDotLottieRefCallback = (dotLottie) => {
    setACDotLottie(dotLottie);
  };
  
  const handleFanSwitch = (state) => {
    let fanState = state ? "ON" : "OFF";
    if (client && connected) {
      client.publish("esp8266/action/fan", fanState);
    }
    setIsFanOn(!isFanOn);
    if(isFanOn){
      fanDotLottie.stop();
    }
    else {
      fanDotLottie.play();
    }
  }

  const handleLightSwitch = (state) => {
    let bulbState = state ? "ON" : "OFF";
    if (client && connected) {
      client.publish("esp8266/action/bulb", bulbState);
    }
    setIsLightOn(state);
    if(isLightOn){
      lightDotLottie.stop();
    }
    else {
      lightDotLottie.play();
    }
  }

  const handleACSwitch = (state) => {
    let acState = state ? "ON" : "OFF";
    if (client && connected) {
      client.publish("esp8266/action/ac", acState);
    }
    setIsACOn(!isACOn);
    if(isACOn){
      ACDotLottie.stop();
    }
    else {
      ACDotLottie.play();
    }
  }

  const items = [
    {
      key: "1",
      label: (
        <div className="label-switch">
          <DotLottieReact
            src="https://lottie.host/d77b5173-19be-41a5-b08e-60ff95cd19d7/PYtJtiAOB9.lottie"
            loop
            autoplay={isLightOn}
            dotLottieRefCallback={lightDotLottieRefCallback}
          />
        </div>
      ),
      children: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FF7F50",
            },
          }}
        >
          <Switch checked={isLightOn} onChange={() => handleLightSwitch(!isLightOn)}/>
        </ConfigProvider>
      ),
      span: 3,
    },
    {
      key: "2",
      label: (
        <div className="label-switch">
          <DotLottieReact
            src="https://lottie.host/aed96a1b-f70b-4997-91a6-a2ff7770e796/FPxFPEGB73.json"
            loop
            autoplay={isFanOn}
            dotLottieRefCallback={fanDotLottieRefCallback}
          />
        </div>
      ),
      children: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FF7F50",

            },
          }}
        >
          <Switch checked={isFanOn} onChange={() => handleFanSwitch(!isFanOn)}/>
        </ConfigProvider>
      ),
      span: 3,
    },
    {
      key: "3",
      label: (
        <div className="label-switch">
          <DotLottieReact
            src="https://lottie.host/49a6a3a2-f7b8-40e2-884c-ca6fdacb9bc1/0Ns4PJa7rS.json"
            loop
            autoplay={isACOn}
            dotLottieRefCallback={ACDotLottieRefCallback}
          />
        </div>
      ),
      children: (
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#FF7F50",
            },
          }}
        >
          <Switch checked={isACOn} onChange={() => handleACSwitch(!isACOn)}/>
        </ConfigProvider>
      ),
      span: 3,
    },
  ];

  useEffect(() => {
    const mqttClient = mqtt.connect('mqtt://192.168.1.6:9001');

    mqttClient.on('connect', () => {
      console.log('Connected to MQTT broker');
      setConnected(true);
    });

    mqttClient.on('error', (err) => {
      console.error('MQTT connection error: ', err);
    });

    mqttClient.on('close', () => {
      console.log('Disconnected from MQTT broker');
      setConnected(false);
    });

    setClient(mqttClient);

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, []);

  return (
    <>
      <div style={{ padding: "0px 80px 0px 0px", marginBottom: "20px"}}>
        <ConfigProvider
          theme={{
            token: {
              colorSplit: "#f7e9e3"
            },
            components: {
              Descriptions: {
                labelBg: "#f7e9e3"
              }
            }
          }}
        >


          <Descriptions
            bordered
            items={items}
          />
        </ConfigProvider>
      </div>
    </>
  );
}

export default DeviceSwitchs;
