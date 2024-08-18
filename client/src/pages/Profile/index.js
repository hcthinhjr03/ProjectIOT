import React from "react";
import { ConfigProvider, Descriptions } from "antd";
import { Card } from "antd";
import { Col, Row } from "antd";
import { FaBook } from "react-icons/fa";
import {  BsWrenchAdjustable, BsTerminalFill } from "react-icons/bs";
import { Tabs } from "antd";
import Education from "../../component/Education";
import Skills from "../../component/Skills";
import Projects from "../../component/Projects";
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
    label: "Education",
    children: <Education/>,
    icon: <FaBook />,
  },
  {
    key: 2,
    label: "Skills",
    children: <Skills/>,
    icon: <BsWrenchAdjustable  />,
  },
  {
    key: 3,
    label: "Projects",
    children: <Projects/>,
    icon: <BsTerminalFill  />,
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
            }
          },
          token: {
            fontSize: 16,
          },
        }}
      >
        <Row>
          <Col span={18} push={6}>
            <Descriptions title="My Profile" layout="vertical" items={items} />
            <br/>
            <Tabs
              defaultActiveKey="3"
              items={tabItems}
            />
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
                  src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/326955186_3045248592274051_1515195335198338580_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEMVIT5BrZGPw2iJ9kN1jiuPs7s_RdiiG4-zuz9F2KIbpIdR0zCbvuXIDpCuUZ6AGlbcsgygb8obny2_jZS5kuJ&_nc_ohc=FB0PD_KQHtYQ7kNvgFaUWmf&_nc_ht=scontent.fhan2-3.fna&oh=00_AYCzggR1CAwhguYfdZgT5PuNmF2WtMYtxiRXR54xy_lHow&oe=66C78F73"
                />
              }
            >
              <Meta
                title="Ha Cuong Thinh"
                description="Posts and Telecommunications Institute of Technology"
              />
            </Card>
          </Col>
        </Row>
      </ConfigProvider>
    </>
  );
}

export default Profile;
