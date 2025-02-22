import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Layout from "../../components/Layout/Layout";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useRoute, useNavigation } from "@react-navigation/native";

const ProductManager = () => {
  const navigation = useNavigation();

  const addNewProduct = () => {
    navigation.navigate("add-product");
  };

  const managerProducts = () => {
    navigation.navigate("show-products");
  };

  return (
    <Layout>
      <View style={styles.main}>
        <Text style={styles.heading}>Product Manager</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={addNewProduct}>
            <AntDesign style={styles.icon} name="edit" />
            <Text style={styles.btnText}>Add New Product</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={managerProducts}>
            <AntDesign style={styles.icon} name="edit" />
            <Text style={styles.btnText}>Manage Products</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: "lightgray",
    height: "96%",
  },
  heading: {
    backgroundColor: "#000000",
    color: "#ffffff",
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    margin: 10,
    borderRadius: 5,
    fontWeight: "bold",
  },
  btnContainer: {
    margin: 10,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  icon: {
    fontSize: 20,
    marginRight: 20,
    marginLeft: 10,
  },
  btnText: {
    fontSize: 16,
  },
});

export default ProductManager;
