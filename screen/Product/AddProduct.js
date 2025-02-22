// screens/AddExpenseScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

import * as productServices from "../../src/services/productServices";
import { useRoute, useNavigation } from "@react-navigation/native";
import Layout from "../../components/Layout/Layout";

const AddProductScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(new Date());
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");

  const [imageUri, setImageUri] = useState(null);

  const navigation = useNavigation();

  const handleAddProduct = async () => {
    //  validate data input
    if (!validateFields({ name, description, price, category, stock })) return;

    // create a new product
    const newProduct = { name, description, price, category, stock };
    const respone = await productServices.createProduct(newProduct);
    if (respone.status === "OK") {
      Alert.alert("Product added successfully");
    } else {
      Alert.alert(respone.message);
    }
    // setName("");
    // setDescription("");
    // setPrice("");
    // setCategory("");
    // setStock("");
  };

  // validateFiels
  const validateFields = (fields) => {
    for (const [key, value] of Object.entries(fields)) {
      if (!value) {
        Alert.alert("Error", `Please enter ${key}.`);
        return false;
      }
    }
    return true;
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#333",
            paddingTop: 30,
            paddingBottom: 10,
          }}
        >
          <TextInput
            placeholder="Game Name"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#333",
            paddingTop: 30,
            paddingBottom: 10,
          }}
        >
          <TextInput
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: "#333",
            paddingTop: 30,
            paddingBottom: 10,
          }}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
        />

        <View
          style={{
            borderBottomWidth: 1,
            borderColor: "#333",
            paddingTop: 30,
            paddingBottom: 10,
          }}
        >
          <TextInput
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>

        <TextInput
          style={{
            borderBottomWidth: 1,
            borderColor: "#333",
            paddingTop: 30,
            paddingBottom: 10,
            marginBottom: 10,
          }}
          placeholder="Status"
          value={stock}
          onChangeText={setStock}
          keyboardType="numeric"
        />

        <TouchableOpacity
          style={{ display: "flex", alignItems: "center", marginTop: 30 }}
          onPress={handleAddProduct}
        >
          <Text style={styles.buttonSave}>Add Game</Text>
        </TouchableOpacity>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },

  buttonSave: {
    width: "30%",
    height: 30,
    backgroundColor: "#99FFFF",
    lineHeight: 30,
    textAlign: "center",
    borderRadius: 10,
  },
});

export default AddProductScreen;
