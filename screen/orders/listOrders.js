import { View, Text, StyleSheet, Alert } from "react-native";
import React from "react";
import { format } from "date-fns";
import accounting from "accounting";

import { converMoney, converTimeZone } from "../../ultils";
import * as OrderServices from "../../src/services/OrderServices";
const OrderItems = ({ order, cancelOrder, fetchDataOrderAdmin }) => {
  const formatDate = format(new Date(order.createdAt), "dd/MM/yyyy");
  const formattedPrice = converMoney(order.orderItems[0].price);

  const acceptOrder = async (id) => {
    const respone = await OrderServices.updateOrder(id);

    if (respone?.status === "OK") {
      Alert.alert(`${respone?.message} 
Time : ${converTimeZone(respone?.data?.deliveredAt)}`);
      fetchDataOrderAdmin();
    } else if (respone?.status === 500) {
      Alert.alert(`${respone?.message} 
Time : ${converTimeZone(respone?.data?.deliveredAt)}`);
      fetchDataOrderAdmin();
    }
  };

  const removeOrder = async (id) => {
    Alert.alert(
      "Delete Order !!!",
      "Are you sure you want to delete this order ?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            cancelOrder(id);
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.orderInfo}>
        <Text>Order ID: {order._id}</Text>
        <Text>Date : {formatDate}</Text>
        {/* Sửa `createAt` thành `createdAt` */}
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 5 }}>
        <Text style={{ fontWeight: 600 }}>
          Name: {order.orderItems[0].name}
        </Text>
        <Text>Price : {formattedPrice}</Text>
        <Text style={{ paddingBottom: 10 }}>
          Total Price : {converMoney(order.totalAmount)}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.status}>Order Status : {order.orderStatus}</Text>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text
              style={styles.status_accept}
              onPress={() => acceptOrder(order._id)}
            >
              Accept
            </Text>
            <Text
              style={styles.status_cancel}
              onPress={() => removeOrder(order._id)}
            >
              Cancel
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  orderInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "lightgray",
    paddingBottom: 10,
  },
  status: {
    borderTopWidth: 1,
    fontWeight: "bold",
    borderColor: "lightgray",
    padding: 5,
  },

  status_accept: {
    fontSize: 14,
    borderTopWidth: 1,
    fontWeight: "bold",
    borderColor: "lightgray",
    padding: 5,
    color: "green",
  },

  status_cancel: {
    fontSize: 14,
    borderTopWidth: 1,
    fontWeight: "bold",
    borderColor: "lightgray",
    padding: 5,
    color: "red",
  },
});

export default OrderItems;
