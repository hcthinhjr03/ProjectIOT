import { Button, ConfigProvider, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";

const data = [
  {
    key: "1",
    id: 1,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "26/07/2003 12:12:12",
  },
  {
    key: "2",
    id: 2,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "14/02/2003 12:12:12",
  },
  {
    key: "3",
    id: 3,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "18/08/2003 12:12:12",
  },
  {
    key: "4",
    id: 4,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "31/11/2003 12:12:12",
  },
  {
    key: "5",
    id: 5,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "21/01/2003 12:12:12",
  },
  {
    key: "6",
    id: 6,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "13/09/2003 12:12:12",
  },
  {
    key: "7",
    id: 7,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "10/03/2003 12:12:12",
  },
  {
    key: "8",
    id: 8,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "29/11/2003 12:12:12",
  },
  {
    key: "9",
    id: 9,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "22/12/2003 12:12:12",
  },
  {
    key: "10",
    id: 10,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "26/07/2003 12:12:12",
  },
  {
    key: "11",
    id: 11,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "12/04/2003 12:12:12",
  },
  {
    key: "12",
    id: 12,
    temperature: 37,
    humid: 70,
    brightness: 300,
    time: "25/05/2003 12:12:12",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

function Device() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Temperature (°C)",
      dataIndex: "temperature",
      render: (text) => <div style={{ color: "red" }}>{text}</div>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Humid (%RH)",
      dataIndex: "humid",
      render: (text) => <div style={{ color: "blue" }}>{text}</div>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Brightness (lx)",
      dataIndex: "brightness",
      render: (text) => <div style={{ color: "orange" }}>{text}</div>,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      ...getColumnSearchProps("time"),
    },
  ];
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FF7F50",
          },
        }}
      >
        <Table
          pagination={{
            position: ["topRight", "bottomCenter"],
          }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </ConfigProvider>
    </>
  );
}

export default Device;
