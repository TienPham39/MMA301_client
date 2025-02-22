import axios from "axios";
import { port } from "../../ultils";

// POST CREATE PRODUCT
export const createProduct = async (data) => {
  // data ở phía sau đường link == truyền data dưới dạng object body
  try {
    const res = await axios.post(`${port()}/product/create-product`, data);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL Order
export const getAllOrder = async (id) => {
  const res = await axios.get(`${port()}/order/admin/get-all-orders`);
  return res?.data;
};


// PUT update order
export const updateOrder = async (id) => {
  const res = await axios.put(`${port()}/order/admin/order/${id}`);
  return res?.data;
};


// PUT update order
export const removeOrder = async (id) => {
  const res = await axios.delete(`${port()}/order/admin/order/${id}`);
  return res?.data;
};




