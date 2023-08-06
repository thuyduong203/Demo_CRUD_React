import { useState } from "react";
import { Table, Form, Input, Button } from "antd";

const Test = () => {
  const [form] = Form.useForm();
  // cu phap:
  let [id, setId] = useState(1);
  let [ten, setTen] = useState("ahih");
  const list = [
    { id: 1, ten: "Thuy Duong" },
    { id: 2, ten: "Thuy Duong" },
    { id: 3, ten: "Thuy Duong" },
    { id: 4, ten: "Thuy Duong" },
    { id: 5, ten: "Thuy Duong" },
  ];
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
  ];
  return (
    <div>
      {/* <Form className="home-form-add" form={form}>
        <Form.Item
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input value={ten} onChange={(e) => setTen(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="ID"
          rules={[{ required: true, message: "Vui lòng nhập tuổi!" }]}
        >
          <Input value={id} onChange={(e) => setId(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={add}>
            Thêm vào Bảng
          </Button>
        </Form.Item>
      </Form> */}
      <Table dataSource={list} columns={columns} />;
    </div>
  );
};

export default Test;
