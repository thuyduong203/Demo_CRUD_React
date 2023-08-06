import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import axios from "axios";
import { apiURLCategory } from "../../config/api";

const SeatLayout = () => {
  const [rows, setRows] = useState(4);
  const [columns, setColumns] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Gọi API từ phía frontend để lấy thông tin về số ghế và trạng thái ghế từ backend
    axios
      .get(apiURLCategory + "/get-all-list")
      .then((response) => {
        // Đặt số ghế và trạng thái ghế vào state
        // const { rows, columns, selectedSeats } = response.data;
        // setRows(response.data.length / 5);
        console.log("row", rows);
        setColumns(5);
        setSelectedSeats(selectedSeats || []); // Initialize selectedSeats to an empty array if it's undefined
        setLoading(false); // Data fetching completed, set loading to false
        console.log("data:");
        console.log(response.data); //
      })
      .catch((error) => {
        console.error("Error fetching seat data:", error);
        setLoading(false); // Data fetching completed (with error), set loading to false
      });
  }, []);

  const handleSeatClick = (row, column) => {
    // Tạo một khóa định danh cho chỗ ngồi (ví dụ: "0-0" là hàng 0, cột 0)
    const seatKey = `${row}-${column}`;
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seatKey)
        ? prevSelectedSeats.filter((seat) => seat !== seatKey)
        : [...prevSelectedSeats, seatKey]
    );
  };

  if (rows === 0 || columns === 0) {
    // Hiển thị thông báo khi đang chờ dữ liệu từ backend
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Movie Theater Seat Layout</h1>
      <Row justify="center">
        {Array.from({ length: rows }, (_, rowIndex) => (
          <Row key={rowIndex} gutter={[8, 8]} style={{ marginBottom: 10 }}>
            {Array.from({ length: columns }, (_, columnIndex) => (
              <Col key={columnIndex}>
                <Button
                  type={
                    selectedSeats.includes(`${rowIndex}-${columnIndex}`)
                      ? "primary"
                      : "default"
                  }
                  onClick={() => handleSeatClick(rowIndex, columnIndex)}
                >
                  {String.fromCharCode(65 + rowIndex)}
                  {columnIndex + 1}
                </Button>
              </Col>
            ))}
          </Row>
        ))}
      </Row>
      <div>
        <h2>Selected Seats:</h2>
        {selectedSeats.map((seat) => (
          <span key={seat}>{seat}, </span>
        ))}
      </div>
    </div>
  );
};

export default SeatLayout;
