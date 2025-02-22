import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { OrderData } from "../../components/data/OrderData";
import OrderItems from "../../components/Form/OrderItems";

import * as UserServices from "../../src/services/userServices";

const MyOrders = () => {
  const [listOrder, setListOrder] = useState([]);
  useEffect(() => {
    const fetchListOrder = async () => {
      const data = await UserServices.getListOrder();
      setListOrder(data.orders)
    };
    fetchListOrder();
  }, []);
  return (
    <Layout>
      <View style={styles.container}>
        <Text style={styles.heading}>My Orders</Text>
        <ScrollView>
          {listOrder.map((order) => (
            <OrderItems key={order._id} order={order} />
          ))}
        </ScrollView>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: 640,
  },
  heading: {
    textAlign: "center",
    color: "gray",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default MyOrders;
