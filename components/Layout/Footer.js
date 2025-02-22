import { View, Text, TouchableOpacity, StyleSheet , Alert } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useReduxStateHook } from "../hooks/customerHook";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/userAction";

import * as userServices from "../../src/services/userServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Footer = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const loading = useReduxStateHook(navigation, (path = "login"));

  const handelLogout = async () => {
    const respone = await userServices.logoutUser();
    if (respone.status === "OK") {
      await AsyncStorage.removeItem('userInfo')
      navigation.navigate("login");
      Alert.alert(respone.message)
    }
  };

  return (
    <View style={styles.container}>
      {/* Home */}
      <TouchableOpacity
        onPress={() => navigation.navigate("home")}
        style={styles.menuContainer}
      >
        <AntDesign
          name="home"
          style={[styles.icon, route.name === "home" && styles.active]}
        />
        <Text style={[styles.iconText, route.name === "home" && styles.active]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Notification */}
      <TouchableOpacity
        style={styles.menuContainer}
        onPress={() => navigation.navigate("notification")}
      >
        <AntDesign
          name="bells"
          style={[styles.icon, route.name === "notification" && styles.active]}
        />
        <Text
          style={[
            styles.iconText,
            route.name === "notification" && styles.active,
          ]}
        >
          Notification
        </Text>
      </TouchableOpacity>

      {/* Account */}
      <TouchableOpacity
        onPress={() => navigation.navigate("account")}
        style={styles.menuContainer}
      >
        <AntDesign
          name="user"
          style={[styles.icon, route.name === "account" && styles.active]}
        />
        <Text
          style={[styles.iconText, route.name === "account" && styles.active]}
        >
          Account
        </Text>
      </TouchableOpacity>

      {/* Cart */}
      <TouchableOpacity
        onPress={() => navigation.navigate("cart")}
        style={styles.menuContainer}
      >
        <AntDesign
          name="shoppingcart"
          style={[styles.icon, route.name === "cart" && styles.active]}
        />
        <Text style={[styles.iconText, route.name === "cart" && styles.active]}>
          Cart
        </Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity style={styles.menuContainer} onPress={handelLogout}>
        <AntDesign style={styles.icon} name="logout" />
        <Text style={styles.iconText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    // paddingVertical: 10,
    // backgroundColor: '#ffffff',
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: 25,
    color: "#000000",
  },
  iconText: {
    color: "#000000",
    fontSize: 10,
    marginTop: 4,
    marginLeft: 2,
  },
  active: {
    color: "blue",
  },
});

export default Footer;
