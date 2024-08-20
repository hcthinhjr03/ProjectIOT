import { ConfigProvider, Descriptions } from "antd";
import { AiFillBulb } from "react-icons/ai";
import { FaFan, FaWind } from "react-icons/fa";
import { Switch } from "antd";
import "./DeviceSwitchs.scss";
const items = [
  {
    key: "1",
    label: (
      <div class="label-switch">
        <p class="name-switch">Light</p> <AiFillBulb />
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
        <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
      </ConfigProvider>
    ),
    span: 3,
  },
  {
    key: "2",
    label: (
      <div class="label-switch">
        <p class="name-switch">Fan</p> <FaFan />
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
          <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
        </ConfigProvider>
      ),
    span: 3,
  },
  {
    key: "3",
    label: (
      <div class="label-switch">
        <p class="name-switch">Air Conditioner</p> <FaWind />
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
          <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked />
        </ConfigProvider>
      ),
    span: 3,
  },
];

function DeviceSwitchs() {
  return (
    <>
      <div style={{ marginTop: "45px", padding: "0 60px" }}>
        <Descriptions
          title="Toggle to turn ON/OFF device"
          bordered
          items={items}
        />
      </div>
    </>
  );
}

export default DeviceSwitchs;
