import { StyleSheet } from "react-native";
import React, { useEffect } from "react";

import Layout from "../../components/Layout/Layout";
import Categories from "../../components/category/Categories";

import Product from "../../screen/Product/DanhSachSanPham";
import Header from "../../components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";

import { getUserData } from "../../redux/features/auth/userAction";

const ShowProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Layout>
      <Header />
      <Categories />
      <Product />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ShowProducts;
