import { View, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import Layout from "../../components/Layout/Layout";
import { categoriesData } from '../../components/data/CategoriesData';
import FontAwesome from 'react-native-vector-icons/FontAwesome6';

const CategoryManager = () => {
  // Render a single item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>Danh mục: {item.name}</Text>
      {/* Nếu bạn muốn hiển thị icon, bạn có thể thêm ở đây */}
      <FontAwesome name={item.icon} size={24} color="black" />
    </View>
  );

  return (
    <Layout>
      <View style={styles.main}>
        <FlatList
          data={categoriesData} // Sử dụng categoriesData để hiển thị
          renderItem={renderItem}
          keyExtractor={(item) => item._id.toString()} // Đảm bảo _id là chuỗi
          contentContainerStyle={styles.listContainer}
        />
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
  categoryItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default CategoryManager;
