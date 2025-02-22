import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { converMoney } from "../../ultils";

const PriceTable = ({ price, title }) => {
  if (title === "Price" || title === "Grand Total") {
    price = converMoney(price);
  }
  return (
    <View style={styles.container}>
      <Text>{title}</Text>
      <Text>{price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    alignItems: "center",
  },
});

export default PriceTable;
