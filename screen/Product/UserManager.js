import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React, { useCallback, useState } from "react";
import Layout from "../../components/Layout/Layout";
import * as userServices from "../../src/services/userServices";
import { useFocusEffect } from "@react-navigation/native";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserFromServer = useCallback(async () => {
    try {
      setLoading(true);
      const fetchData = await userServices.getAllUser();
      setUsers(fetchData.users);
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi lấy danh sách người dùng.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch users when the component is focused
  useFocusEffect(
    useCallback(() => {
      fetchUserFromServer();
    }, [fetchUserFromServer])
  );

  // Render a single item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userText}>Tên: {item.name}</Text>
      <Text style={styles.userText}>Email: {item.email}</Text>
      <Text style={styles.userText}>Số điện thoại: {item.phone}</Text>
      <Text style={styles.userText}>Quốc gia: {item.country}</Text>
      <Text style={styles.userText}>Thành phố: {item.city}</Text>
    </View>
  );

  return (
    <Layout>
      <View style={styles.main}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "lightgray",
    height: "96%",
  },
  listContainer: {
    padding: 10,
  },
  userItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  userText: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
});

export default UserManager;
