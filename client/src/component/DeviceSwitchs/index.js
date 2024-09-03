import { ConfigProvider, Descriptions } from "antd";
// import { AiFillBulb } from "react-icons/ai";
// import { FaFan, FaWind } from "react-icons/fa";
import { Switch } from "antd";
import "./DeviceSwitchs.scss";
import { useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function DeviceSwitchs() {
  const [fanDotLottie, setFanDotLottie] = useState(null);
  const [lightDotLottie, setLightDotLottie] = useState(null);
  const [ACDotLottie, setACDotLottie] = useState(null);

  const [isFanOn, setIsFanOn] = useState(false);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isACOn, setIsACOn] = useState(false);

  const fanDotLottieRefCallback = (dotLottie) => {
    setFanDotLottie(dotLottie);
  };

  const lightDotLottieRefCallback = (dotLottie) => {
    setLightDotLottie(dotLottie);
  };

  const ACDotLottieRefCallback = (dotLottie) => {
    setACDotLottie(dotLottie);
  };
  
  const handleFanSwitch = () => {
    setIsFanOn(!isFanOn);
    if(isFanOn){
      fanDotLottie.stop();
    }
    else {
      fanDotLottie.play();
    }
  }

  const handleLightSwitch = () => {
    setIsLightOn(!isLightOn);
    if(isLightOn){
      lightDotLottie.stop();
    }
    else {
      lightDotLottie.play();
    }
  }

  const handleACSwitch = () => {
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
        <div class="label-switch">
          <DotLottieReact
            src="https://lottie.host/d77b5173-19be-41a5-b08e-60ff95cd19d7/PYtJtiAOB9.lottie"
            loop
            autoplay={isLightOn}
            dotLottieRefCallback={lightDotLottieRefCallback}
          />
          {/* <div class="name-switch">Light</div>  */}
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
          <Switch checked={isLightOn} onChange={handleLightSwitch}/>
        </ConfigProvider>
      ),
      span: 3,
    },
    {
      key: "2",
      label: (
        <div class="label-switch">
          <DotLottieReact
            src="https://lottie.host/aed96a1b-f70b-4997-91a6-a2ff7770e796/FPxFPEGB73.json"
            loop
            autoplay={isFanOn}
            dotLottieRefCallback={fanDotLottieRefCallback}
          />
          {/* <p class="name-switch">Fan</p>  */}
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
          <Switch checked={isFanOn} onChange={handleFanSwitch}/>
        </ConfigProvider>
      ),
      span: 3,
    },
    {
      key: "3",
      label: (
        <div class="label-switch">
          <DotLottieReact
            src="https://lottie.host/49a6a3a2-f7b8-40e2-884c-ca6fdacb9bc1/0Ns4PJa7rS.json"
            loop
            autoplay={isACOn}
            dotLottieRefCallback={ACDotLottieRefCallback}
          />
          {/* <p class="name-switch">Air Conditioner</p> <FaWind /> */}
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
          <Switch checked={isACOn} onChange={handleACSwitch}/>
        </ConfigProvider>
      ),
      span: 3,
    },
  ];
  return (
    <>
      <div style={{ padding: "0px 60px", marginBottom: "30px"}}>
        <Descriptions
          bordered
          items={items}
        />
      </div>
    </>
  );
}

export default DeviceSwitchs;
