import { server } from "../../store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// action login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${server}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "loginSuccess",
      payload: data,
    });

    await AsyncStorage.setItem("@token", data?.token);
  } catch (error) {
    // Kiểm tra và log toàn bộ thông tin lỗi để xác định nguyên nhân
    console.error("Error details:", error);

    dispatch({
      type: "loginFail",
      payload:
        error.response && error.response.data && error.response.data.message
          ? error.response.data.message
          : "Unexpected error occurred",
    });
  }
};

// GET USER DATTA ACTION
export const getUserData = () => async (dispatch) => {
  try {
    dispatch({
      type: "getUserDataRequest",
    });
    const { data } = await axios.get(`${server}/user/profile`);
    dispatch({
      type: "getUserDataSuccess",
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: "getUserDataFail",
      payload: error.response.data.message,
    });
  }
};

// LOGOUT ACTION
export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: "logoutRequest",
    });
    const { data } = await axios.get(`${server}/user/logout`);
    dispatch({
      type: "logoutSuccess",
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response.data.message,
    });
  }
};

// // register action
// export const register = (formData) => async (dispatch) => {
//   try {
//     dispatch({
//       type: "registerRequest",
//     });

//     // Api register
//     const { data } = await axios.post(`${server}/user/create`, formData, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     dispatch({
//       type: "registerSucess",
//       payload: data.message,
//     });
//   } catch (error) {
//     console.log(error);
//     dispatch({
//       type: "registerFail",
//       payload: error.response.data.message,
//     });
//   }
// };
