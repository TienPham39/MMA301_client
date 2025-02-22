import { View, Text, ActivityIndicator, StyleSheet, FlatList, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
import ProductsCard from "../../screen/Product/SanPhamCard";
import * as productServices from "../../src/services/productServices";
import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductFromServer = useCallback(async () => {
    try {
      setLoading(true);
      const fetchData = await productServices.getAllProduct();
      setProducts(fetchData.products);
      // mỗi lần vào trang trủ callApi get list product -> gán vào Asycn để khỏi phải call list này.
      await AsyncStorage.setItem('products' ,JSON.stringify(fetchData.products));
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi lấy sản phẩm.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchProductFromServer();
    }, [fetchProductFromServer])
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <ProductsCard p={item} />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 620,
    paddingBottom: 150
  },
  container: {
    justifyContent: "space-around",
  },
  cardContainer: {
    width: "48%", // Mỗi thẻ chiếm 48% màn hình
    marginBottom: 10,
  },
});

export default Product;
