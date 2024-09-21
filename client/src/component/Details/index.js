import { Avatar, List } from "antd";
import "./Details.scss";

const data = [
  {
    title: "Project Report PDF",
    avatar: "https://png.pngtree.com/png-vector/20220606/ourmid/pngtree-pdf-file-icon-png-png-image_4899509.png",
    description: "Click title to view!",
    href: "https://drive.google.com/file/d/1wdatISnRqM0QZt2JG5C38vHbv4L-JBYa/view"
  },
  {
    title: "Project Github",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GitHub_Invertocat_Logo.svg/1200px-GitHub_Invertocat_Logo.svg.png",
    description: "Click title to view!",
    href: "https://github.com/hcthinhjr03/ProjectIOT"
  },
  {
    title: "Project API docs",
    avatar: "https://yt3.googleusercontent.com/X-rhKMndFm9hT9wIaJns1StBfGbFdLTkAROwm4UZ3n9ucrBky5CFIeeZhSszFXBgQjItzCD0SA=s900-c-k-c0x00ffffff-no-rj",
    description: "Click title to view!",
    href: "https://documenter.getpostman.com/view/38353713/2sAXqp7iRa"
  },
];

function Details() {
  return (
    <>
      <div>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.avatar}
                  />
                }
                title={<div><a href={item.href} target="_blank" rel="noreferrer" className="title">{item.title}</a></div>}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </>
  );
}

export default Details;
