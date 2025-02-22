// import { View, Text, StyleSheet } from "react-native";
// import React, { useEffect } from "react";
// import Layout from "../components/Layout/Layout";
// import Categories from "../components/category/Categories";
// import Banner from "../components/Banner/Banner";
// import Product from "../components/Products/Product";
// import Header from "../components/Layout/Header";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserData } from "../redux/features/auth/userAction";

// const Home = () => {
//   const dispatch = useDispatch();
//   const { isAuth } = useSelector((state) => state.user);

//   useEffect(() => {
//     dispatch(getUserData());
//   }, [dispatch]);

//   return (
//     <Layout>
//       <Header />
//       <Categories />
//       <Banner />
//       <Product />
//     </Layout>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Categories from "../components/category/Categories";
import Banner from "../components/Banner/Banner";
import Product from "../components/Products/Product";
import Header from "../components/Layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/features/auth/userAction";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.user);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  return (
    <Layout>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <Categories />
      <Banner />
      <Product searchText={searchText} />
    </Layout>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
