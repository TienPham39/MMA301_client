import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProductsCard = ({ p }) => {
  const navigation = useNavigation();

  //More details btn
  const handleMoreButton = (id) => {
    navigation.navigate("productDetails", { _id: id });
    console.log(id);
  };

  //ADD TO CART
  const handleAddToCart = async () => {
    const getCardGame = await AsyncStorage.getItem("CardsGame");

    if (getCardGame) {
      const storeCard = JSON.parse(getCardGame);
      const checkMatchId = storeCard.find((game) => game._id === p._id);
      if (checkMatchId) {
        Alert.alert("This game already in your card");
      } else {
        storeCard.push(p);
        await AsyncStorage.setItem("CardsGame", JSON.stringify(storeCard));
        Alert.alert("Add product to card successfully");
      }
    } else {
      const storeCard = JSON.parse(getCardGame);
      storeCard.push(p);
      await AsyncStorage.setItem("CardsGame", JSON.stringify(storeCard));
      Alert.alert("Add product to card successfully");
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cards}>
        <Image
          onPress={() => handleMoreButton(p._id)}
          style={styles.cardImages}
          source={{ uri: p?.images[0]?.url || "a" }} // Sử dụng mảng images[0].url
        />
        <Text style={styles.cardTitle} onPress={() => handleMoreButton(p._id)}>{p?.name}</Text>
        <Text style={styles.cardDes}>{p?.category}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => handleMoreButton(p._id)}
          >
            <Text style={styles.btnText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCart} onPress={handleAddToCart}>
            <Text style={styles.btnText}>Order</Text>
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
    height: 200, // Giảm chiều cao ảnh để tạo không gian cho mô tả
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
    justifyContent: "space-between",
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
