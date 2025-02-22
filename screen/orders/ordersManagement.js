import { View, Text, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as userServices from "../../src/services/userServices";
import * as OrderServices from "../../src/services/OrderServices";
import OrderItems from "../../screen/orders/listOrders";
import { useFocusEffect } from "@react-navigation/native";

const OrderManager = () => {
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
    if (respone?.status === "OK") {
      const sortOrdersByDate = respone.orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setUserOrders(sortOrdersByDate);
    }
  };

  const cancelOrder = async (id) => {
    const respone = await OrderServices.removeOrder(id);
    if (respone?.status === "OK") {
      Alert.alert(respone.message);
      fetchDataOrderAdmin();
    }
  };

  return (
    <View>
      <ScrollView>
        {userOrders.map((order) => (
          <OrderItems key={order._id} order={order} cancelOrder={cancelOrder} fetchDataOrderAdmin={fetchDataOrderAdmin} />
        ))}
      </ScrollView>
    </View>
  );
};

export default OrderManager;
