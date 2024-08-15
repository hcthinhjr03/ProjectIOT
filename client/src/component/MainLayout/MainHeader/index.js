import { Layout } from "antd";
const { Header} = Layout;

function MainHeader() {
  return (
    <>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        Header
      </Header>
    </>
  );
}

export default MainHeader;
