import { Avatar, List } from "antd";
import "./Details.scss";

const data = [
  {
    title: "Project Report PDF",
    avatar: "https://play-lh.googleusercontent.com/50ss7jzjKrQgxdz6sRknYvNd0gmEpdLQizn3FcNc_wL-hcwzfXJMsmA3XN36lvMx1BE",
    description: "Click title to view!",
    href: "https://ant.design"
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
    href: "https://ant.design"
  },
];

function Details() {
  return (
    <>
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
    </>
  );
}

export default Details;
