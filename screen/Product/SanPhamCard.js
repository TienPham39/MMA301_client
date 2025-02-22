import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ProductsCard = ({ p }) => {
  const navigation = useNavigation();

  //More details btn
  const handleUpdateProduct = (id) => {
    navigation.navigate("update-product", { id: id });
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cards}>
        <Image
          style={styles.cardImages}
          source={{ uri: p?.images[0]?.url || "a" }} // Sử dụng mảng images[0].url
        />
        <Text style={styles.cardTitle}>{p?.name}</Text>
        <Text style={styles.cardDes}>{p?.category}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleUpdateProduct(p._id)}
          >
            <Text style={styles.btnText}>Update</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 16,
    marginBottom: 2, // Khoảng cách giữa các hàng
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Chỉ dành cho Android để tạo bóng
  },
  cards: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImages: {
    height: 100, // Giảm chiều cao ảnh để tạo không gian cho mô tả
    width: "100%",
    borderRadius: 6,
    marginBottom: 4, // Thay đổi khoảng cách dưới ảnh
    objectFit: "contain",
  },
  cardTitle: {
    fontSize: 16, // Tăng kích thước chữ cho tiêu đề
    fontWeight: "700", // Đậm hơn một chút
    marginBottom: 4, // Thay đổi khoảng cách
    color: "#333",
    textAlign: "center",
  },
  cardDes: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10, // Thay đổi khoảng cách dưới mô tả
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  btn: {
    backgroundColor: "#1a73e8",
    height: 36, // Tăng chiều cao nút để dễ nhấn hơn
    width: "48%",
    borderRadius: 5,
    justifyContent: "center",
  },
  btnCart: {
    backgroundColor: "orange",
    height: 36, // Đảm bảo chiều cao nút giống nhau
    width: "48%",
    borderRadius: 5,
    justifyContent: "center",
  },
  btnText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 14, // Tăng kích thước chữ cho nút
    fontWeight: "600",
  },
});

export default ProductsCard;
