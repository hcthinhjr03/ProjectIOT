import { ConfigProvider, Timeline } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";

function Education() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            fontSize: 17,
            
          },
        }}
      >
        <div style={{marginTop: "30px"}}>
          <Timeline
            items={[
              {
                children: "2013 - Graduated at Kien Giang 1 Primary School",
                color: "#FF7F50",
              },
              {
                children: "2018 - Graduated at Kien Giang Secondary School",
                color: "#FF7F50",
              },
              {
                children: "2021 - Graduated at Le Thuy High School",
                color: "#FF7F50",
              },
              {
                children:
                  "2024 - Studying at Posts and Telecommunications Institute of Technology",
                dot: <ClockCircleOutlined />,
                color: "#FF7F50",
              },
            ]}
          />
        </div>
      </ConfigProvider>
    </>
  );
}

export default Education;
