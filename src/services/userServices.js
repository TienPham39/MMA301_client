import axios from "axios";
import { port } from "../../ultils";
export const axiosJWT = axios.create();

export const userLogin = async (data) => {
  try {
    const res = await axios.post(`${port()}/user/login`, data);
    return res?.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
  // gọi api / clearCookie("refresh_token") ;
  const res = await axios.post(`${port()}/user/logout`);
  return res.data;
};


export const userRegister = async (data) => {
  console.log("asdasd")
  const res = await axios.post(`${port()}/user/create`, data);
  return res?.data;
};


export const getDetailsUser = async (id, access_token) => {
  // thông qua id , và access_token chỉ cho phép get dữ liệu của only user này
  try {
    const res = await axiosJWT.get(`${port()}/user/profile`);
    return res?.data;
  } catch (error) {
    console.log("Error :", error);
  }
};

export const refreshToken = async () => {
  // thông qua id , và access_token chỉ cho phép get dữ liệu của only user này
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res?.data;
};

export const getAllUser = async (access_token) => {
  // gọi api / clearCookie("refresh_token") ;
  const res = await axiosJWT.get(
    `${port()}/user/getAll`
  );
  return res?.data;
};

export const updateUser = async (data) => {
  // gọi api / clearCookie("refresh_token") ;
  const res = await axiosJWT.put(`${port()}/user/update-profile`, data.data);
  return res?.data;
};

export const deleteUser = async (id, access_token) => {
  // gọi api / clearCookie("refresh_token") ;
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  console.log("Respone Data From Delete User : ", res);
  return res?.data;
};

export const getListOrder = async () => {
  const res = await axiosJWT.get(
    `${port()}/order/my-orders`
  );
  return res?.data;
};

// -----------------------FUNCTION---------------------- //
/* 
Gọi API update-user: Khi bạn gọi API update-user, nếu token vẫn hợp lệ, yêu cầu sẽ được gửi đi ngay lập tức.

Token hết hạn: Nếu token đã hết hạn (thường trả về mã lỗi 401 - Unauthorized),
interceptor mà bạn đã cấu hình sẽ tự động can thiệp.

Refresh token: Interceptor kiểm tra và gọi API để refresh token (thông qua refresh token).
Sau khi có token mới, interceptor sẽ tự động thêm token mới vào request ban đầu (/user/update-user/:id)
và gửi lại yêu cầu.

*/
