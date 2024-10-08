import { ConfigProvider, Descriptions } from "antd";
import { Switch } from "antd";
import "./DeviceSwitchs.scss";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useDevices } from "../../context/DeviceContext";
import { useMqtt } from "../../context/MqttContext";
import { postActionHistory } from "../../services/deviceServices";

function DeviceSwitchs() {
  const [fanDotLottie, setFanDotLottie] = useState(null);
  const [lightDotLottie, setLightDotLottie] = useState(null);
  const [ACDotLottie, setACDotLottie] = useState(null);

  const { client, connected } = useMqtt();
  const { isFanOn, toggleFan, isLightOn, toggleLight, isACOn, toggleAC } = useDevices();
  const [device, setDevice] = useState("");
  const [action, setAction] = useState("");

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
    setDevice("Fan");
    setAction(state);
    let fanState = state ? "ON" : "OFF";
    if (client && connected) {
      client.publish("esp8266/action/fan", fanState);
    }
    toggleFan();
    if (isFanOn) {
      fanDotLottie.stop();
    } else {
      fanDotLottie.play();
    }
  };

  const handleLightSwitch = (state) => {
    setDevice("Light");
    setAction(state);
    let bulbState = state ? "ON" : "OFF";
    if (client && connected) {
      client.publish("esp8266/action/bulb", bulbState);
    }
    toggleLight();
    if (isLightOn) {
      lightDotLottie.stop();
    } else {
      lightDotLottie.play();
    }
  };

  const handleACSwitch = (state) => {
    setDevice("Air Conditioner");
    setAction(state);
    let acState = state ? "ON" : "OFF";
    if (client && connected) {
      client.publish("esp8266/action/ac", acState);
    }
    toggleAC();
    if (isACOn) {
      ACDotLottie.stop();
    } else {
      ACDotLottie.play();
    }
  };

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
          <Switch
            checked={isLightOn}
            onChange={() => handleLightSwitch(!isLightOn)}
          />
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
          <Switch
            checked={isFanOn}
            onChange={() => handleFanSwitch(!isFanOn)}
          />
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
          <Switch checked={isACOn} onChange={() => handleACSwitch(!isACOn)} />
        </ConfigProvider>
      ),
      span: 3,
    },
  ];

  useEffect(() => {
    if (device !== "" && action !== "") {
      const actionHistoryData = {
        device: device,
        action: action ? "ON" : "OFF",
      };

      const postData = async () => {
        const result = await postActionHistory(actionHistoryData);
        if (result) {
          console.log(result);
        }
      };

      postData();
      console.log(actionHistoryData);
    }
  }, [device, action]);

  return (
    <>
      <div style={{ padding: "0px 80px 0px 0px", marginBottom: "20px" }}>
        <ConfigProvider
          theme={{
            token: {
              colorSplit: "#f7e9e3",
            },
            components: {
              Descriptions: {
                labelBg: "#f7e9e3",
              },
            },
          }}
        >
          <Descriptions bordered items={items} />
        </ConfigProvider>
      </div>
    </>
  );
}

export default DeviceSwitchs;
