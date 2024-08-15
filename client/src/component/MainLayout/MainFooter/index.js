import { Layout, theme } from "antd";
const { Footer } = Layout;

function MainFooter() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Footer
        style={{
          background: colorBgContainer,
        }}
      >
        footer
      </Footer>
    </>
  );
}

export default MainFooter;
