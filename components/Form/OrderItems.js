import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { format } from "date-fns";
import accounting from "accounting";

import { converMoney } from "../../ultils";

const OrderItems = ({ order }) => {
  const formatDate = format(new Date(order.createdAt), "dd/MM/yyyy");
  const formattedPrice = converMoney(order.orderItems[0].price);

  return (
    <View style={styles.container}>
      <View style={styles.orderInfo}>
        <Text>Order ID: {order._id}</Text>
        <Text>Date : {formatDate}</Text>
        {/* Sửa `createAt` thành `createdAt` */}
      </View>
      <View style={{ paddingTop: 10, paddingBottom: 5 }}>
        <Text style={{ fontWeight: 600 }}>
          Product name: {order.orderItems[0].name}
        </Text>
        <Text>Price : {formattedPrice}</Text>
        <Text>Quantity : 1</Text>
        <Text style={{ paddingBottom: 10 }}>
          Total Price : {converMoney(order.totalAmount)}
        </Text>
        <Text style={styles.status}>Order Status : {order.orderStatus}</Text>
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
});

export default OrderItems;
