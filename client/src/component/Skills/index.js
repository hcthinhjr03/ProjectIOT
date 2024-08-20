import { ConfigProvider, Tree } from "antd";
const { DirectoryTree } = Tree;
const treeData = [
  {
    title: "Professional Skills",
    key: "0-0",
    children: [
      {
        title: "HTML, CSS, JavaScript",
        key: "0-0-0",
        isLeaf: true,
      },
      {
        title: "NodeJS, ExpressJS",
        key: "0-0-1",
        isLeaf: true,
      },
      {
        title: "React Native , ReactJS",
        key: "0-0-2",
        isLeaf: true,
      },
      {
        title: "MongoDB, MySQL",
        key: "0-0-3",
        isLeaf: true,
      },
      {
        title: "Git, GitHub",
        key: "0-0-4",
        isLeaf: true,
      },
    ],
  },
  {
    title: "Soft Skills",
    key: "0-1",
    children: [
      {
        title: "Problem Solving",
        key: "0-1-0",
        isLeaf: true,
      },
      {
        title: "Teamwork",
        key: "0-1-1",
        isLeaf: true,
      },
      {
        title: "Time Management",
        key: "0-1-2",
        isLeaf: true,
      },
      {
        title: "Self-study",
        key: "0-1-3",
        isLeaf: true,
      },
    ],
  },
];

function Skills() {
  const onExpand = (keys, info) => {
    console.log("Trigger Expand", keys, info);
  };
  return (
    <>
      <ConfigProvider
      theme={{
        token: {
            fontSize: 18,
            lineHeight: 2
        },
        components: {
            Tree: {
                titleHeight: 30
            }
        }
      }}>
        <DirectoryTree
          defaultExpandAll
          onExpand={onExpand}
          treeData={treeData}
          selectable={false}
        />
      </ConfigProvider>
    </>
  );
}

export default Skills;
