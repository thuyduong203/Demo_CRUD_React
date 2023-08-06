import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Table,
  Radio,
  Select,
  Pagination,
  Modal,
} from "antd";
import axios from "axios";
import { apiURL, apiURLCategory } from "../../config/api";
const Category = () => {
  let [listCategory, setListCategory] = useState([]);
  const { Option } = Select;
  let [code, setCode] = useState("");
  let [trangThai, setTrangThai] = useState(1);
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setTotalPages] = useState(0);
  let [phanLoai, setPhanLoai] = useState("Loại 1");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  // Tạo state để lưu trữ dữ liệu chi tiết khi nhấn vào nút "Detail"
  let [detailData, setDetailData] = useState(null);
  //show modal confirm + thong báo:
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Hàm xử lý khi nhấn Cập nhật trong modal
  const handleUpdateCategory = () => {
    axios
      .put(apiURLCategory + "/update/" + detailData.id, detailData)
      .then((response) => {
        //update tnanfh cong load lại
        loadDataCategory(currentPage);
      })
      .catch((error) => {
        console.error("Lỗi khi update:", error);
      });
    setIsModalVisible(false);
    setDetailData(null); // Reset detailData when closing the modal
  };
  // Hàm xử lý khi nhấn Cancel trong modal Category
  const handleCancelModalCategory = () => {
    setIsModalVisible(false);
    setDetailData(null); // Reset detailData when closing the moda
  };
  const handleAddCategory = () => {
    let categoryRequest = {
      code: code,
      trangThai: trangThai,
      phanLoai: phanLoai,
    };
    // Thực hiện gọi API POST
    axios
      .post(apiURLCategory + "/save", categoryRequest)
      .then((response) => {
        console.log("Thêm category thành công!");
        console.log(response.data);
        // Gọi lại hàm loadDataCategory để tải lại danh sách sau khi đã thêm thành công
        loadDataCategory(currentPage);
        setIsModalVisible(false); // Đóng modal sau khi thêm thành công
      })
      .catch((error) => {
        console.error("Lỗi khi thêm category:", error);
      });
  };
  const [listPhanLoai, setListPhanLoai] = useState([
    "Loại 1",
    "Loại 2",
    "Loại 3",
  ]);
  const handleDetailCategory = (id) => {
    console.log("Handle detail category: ", id);
    // Gọi API lấy chi tiết category dựa vào id
    axios
      .get(apiURLCategory + "/get-one/" + id)
      .then((response) => {
        // Lấy dữ liệu chi tiết category từ response.data
        const categoryDetail = response.data;
        console.log("Category detail: ", categoryDetail);

        // Lưu dữ liệu chi tiết vào state detailData
        setDetailData(categoryDetail);
      })
      .catch((error) => {
        console.error("Lỗi khi getOne category:", error);
      });
  };
  // useEffect để theo dõi thay đổi của detailData và mở modal khi detailData đã được cập nhật
  useEffect(() => {
    // Kiểm tra xem detailData có dữ liệu hay không
    if (detailData != null) {
      // Mở Modal khi detailData đã được cập nhật
      console.log(detailData);
      setIsModalVisible(true);
    }
  }, [detailData]);

  // Modal content should be rendered only when detailData has data
  const renderModalContent = () => {
    // Check if detailData is available
    if (!detailData) {
      return null;
    }

    const initialValues = {
      codeModal: detailData.code,
      trangThaiModal: detailData.trangThai,
      phanLoaiModal: detailData.phanLoai,
    };

    return (
      <Form initialValues={initialValues}>
        {/* Rest of your form fields */}
        <Form.Item label="Mã:" name="codeModal">
          <Input
            value={detailData.code}
            onChange={(e) =>
              setDetailData({ ...detailData, code: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Trạng thái:" name="trangThaiModal">
          <Radio.Group
            value={detailData.trangThai}
            onChange={(e) =>
              setDetailData({ ...detailData, trangThai: e.target.value })
            }
          >
            <Radio value={0}>Ngừng kinh doanh</Radio>
            <Radio value={1}>Đang kinh doanh</Radio>
            <Radio value={2}>Hết hàng</Radio>
            <Radio value={3}>Tồn</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Phân loại:" name="phanLoaiModal">
          <Select
            value={detailData.phanLoai}
            onChange={(value) =>
              setDetailData({ ...detailData, phanLoai: value })
            }
          >
            {listPhanLoai.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    );
  };

  const handleDeleteCategory = (id) => {
    console.log(id);
    // Gọi API lấy chi tiết category dựa vào id
    axios
      .delete(apiURLCategory + "/delete/" + id)
      .then((response) => {
        // Lấy dữ liệu chi tiết category từ response.data
        const categoryDetail = response.data;

        // Lưu dữ liệu chi tiết vào state detail
        setDetailData({
          code: categoryDetail.code,
          trangThai: categoryDetail.trangThai,
          phanLoai: categoryDetail.phanLoai,
        });
        loadDataCategory(currentPage);
      })
      .catch((error) => {
        console.error("Lỗi khi getOne category:", error);
      });
  };

  // useEffect để theo dõi thay đổi của detailData và mở modal khi detailData đã được cập nhật
  //  S
  //effect load data khi chuyển trang
  useEffect(() => {
    loadDataCategory(currentPage);
  }, [currentPage]);
  //call api: sử dụng thư viện axios để gọi API trong React.js
  //insatll: npm install axios
  // import: import axios from "axios";
  const loadDataCategory = (currentPage) => {
    axios
      .get(apiURLCategory + "/get-all?pageNo=" + currentPage)
      .then((response) => {
        console.log(response.data.content);
        setListCategory(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API:", error);
      });
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Phân loại",
      dataIndex: "phanLoai",
      key: "phanLoai",
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      render: (trangThai) =>
        trangThai === 1 ? "Dang kinh doanh" : "Ngung kinh doanh",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => handleDetailCategory(record.id)}
            type="primary"
          >
            Detail
          </Button>
          <Button
            onClick={() => handleDeleteCategory(record.id)}
            type="primary"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
  return (
    <div>
      <Form>
        <Form.Item
          label="Mã:"
          name="code" // Cần thêm name="code" để phù hợp với state code
          rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
        >
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Trạng thái:"
          name="trangThai"
          //   rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}
          //   validateTrigger="onBlur" // Thêm validateTrigger="onBlur" vào đây
        >
          <Radio.Group
            defaultValue={trangThai}
            onChange={(e) => setTrangThai(e.target.value)}
          >
            <Radio value={0}>Ngừng kinh doanh</Radio>
            <Radio value={1}>Đang kinh doanh</Radio>
            <Radio value={2}>Hết hàng</Radio>
            <Radio value={3}>Tồn</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Phân loại:"
          name="phanLoai"
          //   rules={[{ required: true, message: "Vui lòng chọn Loại!" }]}
          //   validateTrigger="onBlur" // Thêm validateTrigger="onBlur" vào đây
        >
          <Select
            defaultValue="Loại 1"
            onChange={(value) => setPhanLoai(value)}
          >
            {listPhanLoai.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => handleAddCategory()}
            type="primary"
            htmlType="submit"
          >
            Thêm vào Bảng
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={listCategory}
        columns={columns}
        rowKey="id"
        pagination={false}
      />
      <Pagination
        simple
        current={currentPage + 1}
        onChange={(value) => setCurrentPage(value - 1)}
        total={totalPages * 10}
      />
      <Modal
        title="Category"
        visible={isModalVisible}
        onOk={handleUpdateCategory}
        onCancel={handleCancelModalCategory}
        forceRender={true} // Thêm prop này để bắt Modal render lại khi cập nhật
        okText="Cập nhật" // Thay đổi nút OK thành "Cập nhật"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
export default Category;
