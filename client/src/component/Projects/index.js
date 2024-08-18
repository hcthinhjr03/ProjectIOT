import { Timeline } from "antd";
import "./Projects.scss";

function Projects() {
  return (
    <>
      <div style={{marginTop: "20px"}}></div>
      <Timeline
        pending="To be continue..."
        items={[
          {
            color: "#FF7F50",
            children: (
              <>
                <div class="box">
                    <h4>LANDING PAGE: SoftwareM4</h4>
                    <h4 class="year">- 2022 -</h4>
                </div>
                <p>Tech: HTML5, CSS3</p>
                <a href="https://project-mini-1-phi.vercel.app/" target="_blank" rel="noreferrer" class="link">Demo</a>
              </>
            ),
          },
          {
            color: "#FF7F50",
            children: (
              <>
                <div class="box"> 
                    <h4>LANDING PAGE: Softy Pinko</h4>
                    <h4 class="year">- 2022 -</h4>
                </div>
                <p>Tech: HTML5, CSS3, Bootstrap4</p>
                <a href="https://project-mini-2-tawny.vercel.app/" target="_blank" rel="noreferrer" class="link">Demo</a>
              </>
            ),
          },
          {
            color: "#FF7F50",
            children: (
              <>
                <div class="box"> 
                    <h4>WEBSITE: Football Forum & Shop</h4>
                    <h4 class="year">- 2023 -</h4>
                </div>
                <p>Tech: ReactJS, NodeJS</p>
                <a href="https://github.com/hcthinhjr03/BTLJava2023" target="_blank" rel="noreferrer" class="link">Source</a>
              </>
            ),
          },
          {
            color: "#FF7F50",
            children: (
              <>
                <div class="box"> 
                    <h4>WEBSITE: Photo Sharing</h4>
                    <h4 class="year">- 2024 -</h4>
                </div>
                <p>Tech: ReactJS, ExpressJS, MongoDB</p>
                <a href="https://github.com/hcthinhjr03/project6-client" target="_blank" rel="noreferrer" class="link">Source FE</a>
                <a href="https://github.com/hcthinhjr03/project6-server" target="_blank" rel="noreferrer" class="link">Source BE</a>
              </>
            ),
          },
          {
            color: "#FF7F50",
            children: (
              <>
                <div class="box"> 
                    <h4>MOBILE APP: Property Manager</h4>
                    <h4 class="year">- 2024 -</h4>
                </div>
                <p>Tech:  React Native, ExpressJS, MongoDB</p>
                <a href="https://github.com/hcthinhjr03/qlts_app" target="_blank" rel="noreferrer" class="link">Source</a>
              </>
            ),
          }
        ]}
      />
    </>
  );
}

export default Projects;
