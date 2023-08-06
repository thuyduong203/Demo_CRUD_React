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
import { apiURLCategory, apiURLProduct } from "../../config/api";
const Product = () => {
  let [listCategory, setListCategory] = useState([]);
  let [listProduct, setListProduct] = useState([]);
  const { Option } = Select;
  //thuoc tinh cua productRequest
  let [code, setCode] = useState("");
  let [name, setName] = useState("");
  let [price, setPrice] = useState(0);
  let [idCategory, setIdCategory] = useState(1);
  let [trangThai, setTrangThai] = useState(1);
  let [currentPage, setCurrentPage] = useState(0);
  let [totalPages, setTotalPages] = useState(0);
  // Tạo state để lưu trữ dữ liệu chi tiết khi nhấn vào nút "Detail"
  let [detailProduct, setDetailProduct] = useState(null);
  //show modal confirm + thong báo:
  const [isModalVisible, setIsModalVisible] = useState(false);

  //khi chay load Category 1 lan duy nhatttt
  useEffect(() => {
    const loadData = async () => {
      await loadDataCategory();
      console.log(listCategory);
      if (listCategory.length > 0) {
        setIdCategory(listCategory[0].id);
      }
    };
    loadData();
  }, []);

  //effect load data khi chuyển trang
  useEffect(() => {
    loadDataProduct(currentPage);
  }, [currentPage]);

  const loadDataCategory = () => {
    axios
      .get(apiURLCategory + "/get-all-list")
      .then((response) => {
        console.log(response.data);
        setListCategory(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get list Category:", error);
      });
  };

  //get All product:
  const loadDataProduct = (currentPage) => {
    axios
      .get(apiURLProduct + "/get-all?pageNo=" + currentPage)
      .then((response) => {
        console.log(response.data.content);
        setListProduct(response.data.content);
        setCurrentPage(response.data.number);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.error("Lỗi khi gọi API get all product:", error);
      });
  };
  //handleAddProduct
  const handleAddProduct = () => {
    let productRequest = {
      code: code,
      name: name,
      price: price,
      trangThai: trangThai,
      idCategory: idCategory,
    };
    // Thực hiện gọi API POST
    axios
      .post(apiURLProduct + "/save", productRequest)
      .then((response) => {
        console.log("Thêm product thành công!");
        console.log(response.data);
        // Gọi lại hàm loadDataCategory để tải lại danh sách sau khi đã thêm thành công
        loadDataProduct(currentPage);
      })
      .catch((error) => {
        console.error("Lỗi khi thêm product:", error);
      });
  };
  //detail
  const handleDetail = (id) => {
    console.log("Handle detail product: ", id);
    // Gọi API lấy chi tiết category dựa vào id
    axios
      .get(apiURLProduct + "/get-one/" + id)
      .then((response) => {
        // Lấy dữ liệu chi tiết product từ response.data
        const productDetail = response.data;
        console.log("Product detail: ", productDetail);

        // Lưu dữ liệu chi tiết vào state detailData
        setDetailProduct(productDetail);
        // Cập nhật thể loại cho detailProduct
        setDetailProduct({
          ...productDetail,
          idCategory: productDetail.category.id,
        });
      })
      .catch((error) => {
        console.error("Lỗi khi getOne Product:", error);
      });
  };
  // useEffect để theo dõi thay đổi của detailData và mở modal khi detailData đã được cập nhật
  useEffect(() => {
    // Kiểm tra xem detailData có dữ liệu hay không
    if (detailProduct != null) {
      // Mở Modal khi detailData đã được cập nhật
      console.log(detailProduct);
      console.log("useEffect");
      setIsModalVisible(true);
    }
  }, [detailProduct]);
  // Modal content should be rendered only when detailData has data
  const renderModalContent = () => {
    // Check if detailData is available
    if (!detailProduct) {
      return null;
    }

    const initialValues = {
      codeModal: detailProduct.code,
      trangThaiModal: detailProduct.trangThai,
      nameModal: detailProduct.name,
      priceModal: detailProduct.price,
      idCategoryModal: detailProduct.idCategory,
    };

    return (
      <Form initialValues={initialValues}>
        <Form.Item
          label="Mã:"
          name="codeModal" // Cần thêm name="code" để phù hợp với state code
          rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
        >
          <Input
            value={detailProduct.code}
            onChange={(e) =>
              setDetailProduct({ ...detailProduct, code: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Ten SP:"
          name="nameModal"
          rules={[{ required: true, message: "Vui lòng nhập ten!" }]}
        >
          <Input
            value={detailProduct.name}
            onChange={(e) =>
              setDetailProduct({ ...detailProduct, name: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          label="Price:"
          name="priceModal"
          rules={[{ required: true, message: "Vui lòng nhập gia!" }]}
        >
          <Input
            type="number"
            value={detailProduct.price}
            onChange={(e) =>
              setDetailProduct({ ...detailProduct, price: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Trạng thái:" name="trangThaiModal">
          <Radio.Group
            value={detailProduct.trangThai}
            onChange={(e) =>
              setDetailProduct({ ...detailProduct, trangThai: e.target.value })
            }
          >
            <Radio value={0}>Ngừng kinh doanh</Radio>
            <Radio value={1}>Đang kinh doanh</Radio>
            <Radio value={2}>Hết hàng</Radio>
            <Radio value={3}>Tồn</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="The loai:" name="idCategoryModal">
          <Select
            value={detailProduct.idCategory} // Set the value to the product's idCategory
            onChange={(value) =>
              setDetailProduct({ ...detailProduct, idCategory: value })
            }
          >
            {listCategory.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.code}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    );
  };
  const handleUpdateProduct = () => {
    let productRequest = {
      code: detailProduct.code,
      name: detailProduct.name,
      price: detailProduct.price,
      trangThai: detailProduct.trangThai,
      idCategory: detailProduct.idCategory, // Thay thế detailProduct.category.id
    };
    console.log("Product request: ");
    console.log(productRequest);
    axios
      .put(apiURLProduct + "/update/" + detailProduct.id, productRequest)
      .then((response) => {
        //update tnanfh cong load lại
        loadDataProduct(currentPage);
      })
      .catch((error) => {
        console.error("Lỗi khi update:", error);
      });
    setIsModalVisible(false);
    setDetailProduct(null); // Reset detailData when closing the modal
  };
  const handleCancelModalProduct = () => {
    alert("cancel");
    setDetailProduct(null);
    setIsModalVisible(false);
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
      title: "The loai",
      dataIndex: "category",
      key: "category",
      render: (text, record) => <span>{record.category.code}</span>,
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
          <Button onClick={() => handleDetail(record.id)} type="primary">
            Detail
          </Button>
          <Button type="primary">Delete</Button>
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
          label="Ten SP:"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
        >
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Gia:"
          name="price"
          rules={[{ required: true, message: "Vui lòng nhập mã!" }]}
        >
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </Form.Item>
        <Form.Item label="Trạng thái:" name="trangThai">
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
          label="The loai:"
          name="idCategory"
          //   rules={[{ required: true, message: "Vui lòng chọn Loại!" }]}
          //   validateTrigger="onBlur" // Thêm validateTrigger="onBlur" vào đây
        >
          <Select
            defaultValue={idCategory}
            onChange={(value) => setDetailProduct(value)}
          >
            {listCategory.map((item) => (
              <Option key={item.id} value={item.id}>
                {item.code}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            onClick={() => handleAddProduct()}
            type="primary"
            htmlType="submit"
          >
            Thêm vào Bảng
          </Button>
        </Form.Item>
      </Form>
      <Table
        dataSource={listProduct}
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
        title="Product"
        visible={isModalVisible}
        onOk={handleUpdateProduct}
        onCancel={handleCancelModalProduct}
        forceRender={true} // Thêm prop này để bắt Modal render lại khi cập nhật
        okText="Cập nhật" // Thay đổi nút OK thành "Cập nhật"
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};
export default Product;
