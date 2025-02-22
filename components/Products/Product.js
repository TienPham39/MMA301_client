
import { View, Text, ActivityIndicator, StyleSheet, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import ProductsCard from "./ProductsCard";
import * as productServices from "../../src/services/productServices";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Product = ({ searchText }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProductFromServer = useCallback(async () => {
    try {
      setLoading(true);
      const fetchData = await productServices.getAllProduct();
      setProducts(fetchData.products);
      // save data in AsyncStore
      AsyncStorage.setItem('products' , JSON.stringify(fetchData.products))
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

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <ProductsCard p={item} />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      {filteredProducts.length === 0 ? (
        <Text>No products found</Text>
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.container}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 500,
    paddingBottom: 150
  },
  container: {
    justifyContent: "space-around",
  },
  cardContainer: {
    width: "48%",
    marginBottom: 10,
  },
});

export default Product;
