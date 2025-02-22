import React, { useEffect, useState, useCallback } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";

import { CartData } from "../components/data/CartData";
import PriceTable from "../components/cart/PriceTable";
import Layout from "../components/Layout/Layout";
import CartItem from "../components/cart/CartItem";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import UpdateProduct from "./Product/UpdateProduct";

import { converMoney } from "../ultils";

const Cart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(CartData);

  const fetchDataFromAsync = async () => {
    const data = await AsyncStorage.getItem("CardsGame");
    if (data) {
      setCartItems(JSON.parse(data));
    }
  };

  const handleRemoveCard = async (id) => {
    const dataUpdate = cartItems.filter((item) => item._id !== id);
    setCartItems(dataUpdate);
    await AsyncStorage.setItem("CardsGame", JSON.stringify(dataUpdate));
    Alert.alert("Remove game successfully");
  };

  useFocusEffect(
    useCallback(() => {
      fetchDataFromAsync();
    }, [])
  );

  const renderItem = ({ item }) => (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <PriceTable price={item.name} title={"Name"} />
      <PriceTable price={item.price} title={"Price"} />
      <PriceTable price={1} title={"Tax"} />

      <View style={styles.grandTotal}>
        <PriceTable title={"Grand Total"} price={item.price} />
      </View>

      <View style={styles.Actions}>
        <TouchableOpacity
          style={styles.btnCheckout}
          onPress={() => navigation.navigate("checkout", { item })}
        >
          <Text style={styles.btnCheckoutText}>CHECKOUT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.btnRemove}
          onPress={() => handleRemoveCard(item._id)}
        >
          <Text style={styles.btnCheckoutText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <Layout>
      <View style={{ height: 650 }}>
        <Text style={styles.heading}>
          {cartItems?.length > 0
            ? `You Have ${cartItems?.length} Item(s) Left In Your Cart`
            : "OOPS Your Cart Is Empty!"}
        </Text>
        {cartItems?.length > 0 && (
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => item._id || index.toString()}
            numColumns={1}
            key={1} // This forces re-rendering if `numColumns` changes
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    backgroundColor: "#00FF7F",
    width: "30%",
    marginHorizontal: 18,
    borderRadius: 18,
  },
  btnRemove: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
    height: 32,
    backgroundColor: "#F4A460",
    width: "8%",
    marginHorizontal: 25,
    borderRadius: 10,
  },
  btnCheckoutText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  Actions: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
});

export default Cart;
