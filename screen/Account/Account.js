import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { UserData } from "../../components/data/UserData";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as userServices from "../../src/services/userServices";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = ({ navigation }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true); // Biến trạng thái để theo dõi việc tải dữ liệu

  const fetchData = async () => {
    setLoading(true); // Đánh dấu là bắt đầu tải
    try {
      const response = await userServices.getDetailsUser();
      if (response) {
        setAccount(response.user); // Cập nhật thông tin tài khoản
      }
    } catch (error) {
      console.error("Error getting profile:", error);
    } finally {
      setLoading(false); // Đánh dấu là đã tải xong
    }
  };

  // Gọi hàm fetchData khi màn hình được lấy nét
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  // Kiểm tra nếu đang tải hoặc account chưa có thông tin
  if (loading) {
    return <Text>Loading...</Text>; // Hiển thị loading khi đang tải
  }

  if (!account) {
    return <Text>No account data found.</Text>; // Hiển thị thông báo nếu không có dữ liệu tài khoản
  }

  return (
    <Layout>
      <View style={styles.container}>
        <Image source={{ uri: UserData.profilePicture }} style={styles.image} />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.name}>
            Hi <Text style={{ color: "green" }}>{account.name} ✌️</Text>
          </Text>
          <Text>Email: {account.email}</Text>
          <Text>Contact: {account.contact}</Text>
        </View>
        <View style={styles.btnContainer}>
          <Text style={styles.heading}>Account Settings</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("profile", { id: account._id })}
            style={styles.btn}
          >
            <AntDesign style={styles.btnText} name="edit" />
            <Text style={styles.btnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("myOrders", { id: account._id })}
            style={styles.btn}
          >
            <AntDesign style={styles.btnText} name="bars" />
            <Text style={styles.btnText}>My Orders</Text>
          </TouchableOpacity>
          {account?.role === "admin" && (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("adminPanel", { id: account._id })
              }
              style={styles.btn}
            >
              <AntDesign style={styles.btnText} name="windows" />
              <Text style={styles.btnText}>Admin Panel</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
  },
  name: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
  },
  btnContainer: {
    padding: 10,
    paddingBottom: 30,
    backgroundColor: "#ffffff",
    margin: 10,
    marginVertical: 20,
    elevation: 5,
    borderRadius: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderColor: "lightgray",
  },
  btn: {
    alignItems: "center",
    marginVertical: 10,
    padding: 5,
    flexDirection: "row",
  },
  btnText: {
    fontSize: 15,
    marginRight: 10,
  },
});

export default Account;
