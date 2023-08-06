import React, { useState } from "react";
import { Form, Input, Button, Table, Radio, Select } from "antd";
import "../homeStyle.css";

const Home = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([]);
  const { Option } = Select;

  let [hoTen, setHoTen] = useState("Ahihi");
  let [tuoi, setTuoi] = useState(10);
  let [diaChi, setDiaChi] = useState("");
  let [gioiTinh, setGioiTinh] = useState(true);
  let [quocGia, setQuocGia] = useState("usa");
  const add = () => {
    let newObject = {
      hoTen: hoTen,
      tuoi: tuoi,
      diaChi: diaChi,
      gioiTinh: gioiTinh,
      quocGia: quocGia,
    };
    console.log(newObject);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const onFinish = (values) => {
    const newData = {
      key: dataSource.length + 1,
      ...values,
    };
    setDataSource([...dataSource, newData]);
    form.resetFields();
  };

  return (
    <div>
      <Form className="home-form-add" form={form} onFinish={onFinish}>
        <Form.Item
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input value={hoTen} onChange={(e) => setHoTen(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Tuổi"
          rules={[{ required: true, message: "Vui lòng nhập tuổi!" }]}
        >
          <Input value={tuoi} onChange={(e) => setTuoi(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Địa chỉ"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}
        >
          <Input value={diaChi} onChange={(e) => setDiaChi(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Giới tính"
          name="gioiTinh"
          rules={[{ required: true, message: "Vui lòng chọn giới tính!" }]}
        >
          <Radio.Group
            defaultValue={true}
            onChange={(e) => setGioiTinh(e.target.value === "true")}
          >
            <Radio value={true}>Nam</Radio>
            <Radio value={false}>Nữ</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Quốc gia"
          name="country"
          rules={[{ required: true, message: "Vui lòng chọn quốc gia!" }]}
        >
          <Select defaultValue="usa" onChange={(value) => setQuocGia(value)}>
            <Option value="usa">Mỹ</Option>
            <Option value="canada">Canada</Option>
            <Option value="uk">Anh</Option>
            {/* Thêm các tùy chọn khác nếu cần */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={add}>
            Thêm vào Bảng
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Home;
