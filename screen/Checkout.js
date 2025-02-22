import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  Label,
  StyleSheet,
  ScrollView,
} from "react-native";
import Layout from "../components/Layout/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as productServices from "../src/services/productServices";
import { converMoney } from "../ultils";

const Checkout = ({ navigation, route }) => {
  const product = route.params.item;
  const [user, setUser] = useState({});

  const date = new Date();

  const handleCOD = async () => {
    const { address, city, country } = user;
    if (!address || !city || !country) {
      Alert.alert("Please update your info before payment !");
    } else {
      const shippingInfo = {
        address: user?.address,
        city: user?.city,
        country: user?.country,
      };

      const orderItems = {
        name: product?.name,
        price: product?.price,
        quantity: 1,
        image: product?.images[0].url,
        product: product?._id,
      };

      const paymentInfo = {
        id: Date.now().toString(),
        status: "Pending",
      };

      const data = { shippingInfo, orderItems, paymentInfo };
      const respone = await productServices.orderProduct(data);

      if (respone.status === "OK") {
        const fetchAsycn = await AsyncStorage.getItem("CardsGame");
        if (fetchAsycn) {
          const CardsGame = JSON.parse(fetchAsycn);
          const updateCardsGame = CardsGame.filter(
            (game) => game._id !== product._id
          );
          await AsyncStorage.setItem(
            "CardsGame",
            JSON.stringify(updateCardsGame)
          );
        }
        Alert.alert(respone.message);
        navigation.navigate('cart')
      } else {
        Alert.alert(respone.message);
      }
    }
  };

  const handleOnline = () => {};

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await AsyncStorage.getItem("userInfo");
      if (userInfo) {
        const user = JSON.parse(userInfo);
        setUser(user.user);
      }
    };
    fetchUser();
  }, []);

  return (
    <Layout>
      <ScrollView>
        <View style={styles.container}>
          {/* Topup */}
          <View style={styles.container}>
            <View style={styles.container}>
              {/* name of customer */}
              <View style={styles.textWrapper}>
                <View style={styles.textValue}>
                  <Text>Name : </Text>
                  <Text>{user.name}</Text>
                </View>
              </View>

              {/* name of customer */}
              <View style={styles.textWrapper}>
                <View style={styles.textValue}>
                  <Text>Email : </Text>
                  <Text>{user.email}</Text>
                </View>
              </View>

              {/* name of customer */}
              <View style={styles.textWrapper}>
                <View style={styles.textValue}>
                  <Text>Address : </Text>
                  <Text>{user.address}</Text>
                </View>
              </View>
            </View>
          </View>
          {/* bottom */}
          <View style={styles.container}>
            <Text style={styles.heading}>INFO ORDER</Text>
            <View style={styles.paymentCard}>
              <Text style={styles.paymentHeading}>Infomation Game</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity onPress={handleCOD}>
                  <Text>{product.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleOnline}>
                  <Text>{converMoney(product.price)}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.heading}>Payment Options</Text>
            <Text style={styles.price}>Total Price: {converMoney(product?.price)}</Text>
            <View style={styles.paymentCard}>
              <Text style={styles.paymentHeading}>Select Payment Mode </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.paymentBtn} onPress={handleCOD}>
                  <Text style={styles.paymentBtnText}>Cash On Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.paymentBtn}
                  onPress={handleOnline}
                >
                  <Text style={styles.paymentBtnText}>(User Point)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 10,
    color: "gray",
  },
  paymentCard: {
    backgroundColor: "#ffffff",
    width: "100%",
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
  },
  paymentHeading: {
    display: "flex",
    flexDirection: "row",
    color: "gray",
    marginBottom: 10,
  },
  paymentBtn: {
    backgroundColor: "#000000",
    height: 40,
    width: "45%",
    borderRadius: 10,
    justifyContent: "center",
    marginVertical: 10,
  },
  paymentBtnText: {
    color: "#ffffff",
    textAlign: "center",
  },

  textWrapper: {
    width: 350,
    borderBottomWidth: 1,
    borderColor: "#DDDDDD",
    paddingTop: 30,
    paddingBottom: 10,
  },

  textValue: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    color: "#333",
  },
});

export default Checkout;
