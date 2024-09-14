import { Button, ConfigProvider, Input, Space, Table, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { getActionHistory } from "../../services/deviceServices";
import { formatDate } from "../../helpers/formatDate";

function ActionHistory() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0] || "");
    setSearchedColumn(dataIndex || "");
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    //setSearchText("");
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
            Clear
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
      dataIndex: "_id",
      //key: "id",
      sorter: (a, b) => a._id.localeCompare(b._id)
    },
    {
      title: "Device",
      dataIndex: "device",
      //key: "device",
      filters: [
        {
          text: "Fan",
          value: "Fan",
        },
        {
          text: "Light",
          value: "Light",
        },
        {
          text: "Air Conditioner",
          value: "Air Conditioner",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.device.startsWith(value),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      render: (text) => (
        <>
          {text === "ON" ? (
            <>
              <Tag color="green" key={text}>
                {text}
              </Tag>
            </>
          ) : (
            <>
              <Tag color="red" key={text}>
                {text}
              </Tag>
            </>
          )}
        </>
      ),
      filters: [
        {
          text: "ON",
          value: "ON",
        },
        {
          text: "OFF",
          value: "OFF",
        },
      ],
      filterMode: "tree",
      filterSearch: false,
      onFilter: (value, record) => record.action.startsWith(value),
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
      ...getColumnSearchProps("time"),
    },
  ];

  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    setPageSize(pageSize);
    setPage(current);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
    setPageSize(pagination.pageSize);
    setPage(pagination.current);
  };

  useEffect(() => {
    const getData = async () => {
      const result = await getActionHistory(pageSize, page, searchText, searchedColumn);
        setTotalCount(result.totalCount);
        if(result.data){
          const formattedData = result.data.map(record => ({
            ...record,
            time: formatDate(record.time),
          }));
          setData(formattedData);
        }
    }
    getData();
  }, [page, pageSize, searchText, searchedColumn])

  return (
    <>
      <h1>Action History</h1>
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
            showSizeChanger: true,
            onShowSizeChange: onShowSizeChange,
            defaultCurrent: 1,
            total: totalCount
          }}
          columns={columns}
          dataSource={data}
          onChange={onChange}
        />
      </ConfigProvider>
    </>
  );
}

export default ActionHistory;
