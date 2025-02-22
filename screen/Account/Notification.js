import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as userServices from "../../src/services/userServices";
import * as OrderServices from "../../src/services/OrderServices";
import OrderItems from "../../components/Form/OrderItems";
import { useFocusEffect } from "@react-navigation/native";
const Notification = () => {
  const [user, setUser] = useState();
  const [userOrders, setUserOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await userServices.getDetailsUser();
      if (response) {
        setUser(response.user); // Cập nhật thông tin tài khoản
      }
    } catch (error) {
      console.error("Error getting profile:", error);
    }
  };

  // Gọi hàm fetchData khi màn hình được lấy nét
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchDataOrderAdmin();
    }
  }, [user]);

  const fetchDataOrderAdmin = async () => {
    const respone = await OrderServices.getAllOrder();

    console.log("respone ", respone);

    if (respone?.status === "OK") {
      const sortOrdersByDate = respone.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      const get3OrderNews = sortOrdersByDate.slice(0, 3);

      console.log("get3OrderNews ", get3OrderNews);

      setUserOrders(get3OrderNews);
    }
  };

  return (
    <View>
      <ScrollView>
        {userOrders.length > 0 ? (
          userOrders.map((order) => (
            <OrderItems key={order._id} order={order} />
          ))
        ) : (
          <Text style={{paddingHorizontal : 10 , paddingTop : 20 , fontSize : 16}}>There is no voucher</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Notification;
