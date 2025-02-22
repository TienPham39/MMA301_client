import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as productServices from "../src/services/productServices";
import ProductsCard from "../components/Products/ProductsCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Layout from "../components/Layout/Layout";
import Categories from "../components/category/Categories";

const ProductCategories = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [products, setProducts] = useState([]);
  const [danhSachSanPham, setDanhSachSanPham] = useState([]);

  const category = route.params.categoryName.toLowerCase();

  const fetchProductFromServer = useCallback(async () => {
    try {
      const getDataFromAsycn = await AsyncStorage.getItem("products");
      if (getDataFromAsycn) {
        setDanhSachSanPham(JSON.parse(getDataFromAsycn));
      }
    } catch (err) {
      console.error(err);
      setError("Có lỗi xảy ra khi lấy sản phẩm.");
    }
  }, [route.params.categoryName]);

  useEffect(() => {
    if (danhSachSanPham) {
      const matchData = danhSachSanPham.filter(
        (sanpham) => sanpham.category.toLowerCase() === category
      );

      console.log("matchData ", matchData[0]?.images);
      setProducts(matchData);
    }
  }, [danhSachSanPham]);

  //get product details
  useEffect(() => {
    //find product details
    fetchProductFromServer();
  }, [route.params.categoryName]);

  // Cập nhật tiêu đề tab khi component được hiển thị
  useEffect(() => {
    if (route.params?.categoryName) {
      navigation.setOptions({ title: route.params.categoryName });
    }
  }, [route.params?.categoryName, navigation]);

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <ProductsCard p={item} />
    </View>
  );

  return (
    <Layout>
      <Categories/>
      <View style={styles.mainContainer}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.container}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 970,
    paddingBottom: 150,
  },
  container: {
    justifyContent: "space-around",
  },
  cardContainer: {
    width: "48%", // Mỗi thẻ chiếm 48% màn hình
    marginBottom: 10,
  },
});

export default ProductCategories;
