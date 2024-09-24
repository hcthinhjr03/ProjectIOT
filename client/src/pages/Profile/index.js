import React from "react";
import { ConfigProvider, Descriptions } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { FaBook } from "react-icons/fa";
import { BsWrenchAdjustable, BsTerminalFill } from "react-icons/bs";
import { AiFillFile } from "react-icons/ai";
import { Tabs } from "antd";
import Education from "../../component/Education";
import Skills from "../../component/Skills";
import Projects from "../../component/Projects";
import Details from "../../component/Details";
const { Meta } = Card;

const items = [
  {
    key: "1",
    label: "Name",
    children: "Hà Cường Thịnh",
  },
  {
    key: "2",
    label: "Date of birth",
    children: "26/07/2003",
  },
  {
    key: "3",
    label: "Live",
    children: "Hà Nội, Việt Nam",
  },

  {
    key: "5",
    label: "Gender",
    children: "Male",
  },
  {
    key: "6",
    label: "Gmail",
    children: "thinhhacuong123@gmail.com",
  },
  {
    key: "2",
    label: "Telephone",
    children: "0396177397",
  },
];

const tabItems = [
  {
    key: 1,
    label: "This Project",
    children: <Details />,
    icon: <AiFillFile />,
  },
  {
    key: 2,
    label: "Education",
    children: <Education />,
    icon: <FaBook />,
  },
  {
    key: 3,
    label: "Skills",
    children: <Skills />,
    icon: <BsWrenchAdjustable />,
  },
  {
    key: 4,
    label: "Projects",
    children: <Projects />,
    icon: <BsTerminalFill />,
  },
];

function Profile() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Descriptions: {
              titleColor: "#FF7F50",
            },
            Tabs: {
              itemColor: "#000",
              itemSelectedColor: "#FF7F50",
              inkBarColor: "#FF7F50",
              itemHoverColor: "#FF7F50",
              itemActiveColor: "#FF7F50",
            },
          },
          token: {
            fontSize: 16,
          },
        }}
      >
        <Row>
          <Col span={18} push={6}>
            <Descriptions title="My Profile" layout="vertical" items={items} />
            <br />
            <Tabs defaultActiveKey="3" items={tabItems} />
          </Col>
          <Col span={6} pull={18}>
            <Card
              hoverable
              style={{
                width: 240,
              }}
              cover={
                <img
                  alt="avt"
                  src="https://scontent.fhan20-1.fna.fbcdn.net/v/t39.30808-6/460391296_1930719580765606_5155918074088797469_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeEXRQ_Uinohh41QO-jb5hM6bmHoZNrHGLBuYehk2scYsOCKhChIrNwid3GP6js5M8rkKyCYWEusSECYYxy4CqOl&_nc_ohc=Zqzdd_bV5esQ7kNvgHRsX7w&_nc_ht=scontent.fhan20-1.fna&_nc_gid=A8q8eWCzl45TOFInm28ucpE&oh=00_AYBQYwjWp3oon04wyZPdtzxZP_P5Gh2Az2-6zN_Aqhv2zA&oe=66F89CCD"
                />
              }
            >
              <Meta
                title="Ha Cuong Thinh"
                description={
                  <>
                    <>ID: B21DCCN691</>
                    <br />
                    <>Class: D21CNPM04</>
                    <br />
                    <>Posts and Telecommunications Institute of Technology</>
                  </>
                }
              />
            </Card>
          </Col>
        </Row>
      </ConfigProvider>
    </>
  );
}

export default Profile;
