import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

//Điều hướng giữa các màn hình trong App
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./redux/store";

import Home from "./screen/Home";
import About from "./screen/About";
import ProductDetails from "./screen/ProductDetails";
import Cart from "./screen/Cart";
import Checkout from "./screen/Checkout";
import Payment from "./screen/Payment";
import Login from "./screen/auth/Login";
import Register from "./screen/auth/Register";
import Account from "./screen/Account/Account";
import Notification from "./screen/Account/Notification";
import Profile from "./screen/Account/Profile";
import MyOrders from "./screen/Account/MyOrders";
import Dashboard from "./screen/Admin/Dashboard";

import AddProduct from "./screen/Product/AddProduct";
import showProducts from "./screen/Product/ShowProducts";
import ProductManager from "./screen/Product/ProductManager";
import UserManager from "./screen/Product/UserManager";
import CategoryManager from "./screen/Product/CategoryManager";
import UpdateProduct from "./screen/Product/UpdateProduct";

import ProductCategories from "./screen/ProductCategories";
import OrderManagement from './screen/orders/ordersManagement';

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          <Stack.Screen
            name="home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="productDetails"
            component={ProductDetails}
            options={{ headerTitle: "Product detail" }}
          />
          <Stack.Screen 
          name="checkout" 
          component={Checkout} 
          options={{ headerTitle: "Checkout" }}
          />

          <Stack.Screen
            name="myOrders"
            component={MyOrders}
            options={{ headerTitle: "My orders" }} />

          <Stack.Screen
            name="orders-management"
            component={OrderManagement}
            options={{ headerTitle: "Orders Management" }} /> 

          <Stack.Screen
            name="profile"
            component={Profile}
            options={{ headerTitle: "Update profile" }}
          />

          <Stack.Screen name="notification" component={Notification} />
          <Stack.Screen
            name="adminPanel"
            component={Dashboard}
            options={{ headerTitle: "Admin panel" }}
          />

          <Stack.Screen
            name="product-management"
            component={ProductManager}
            options={{ headerTitle: "Manage product" }}
          />
          <Stack.Screen
            name="user-management"
            component={UserManager}
            options={{ headerTitle: "Manage users" }}
          />
          <Stack.Screen
            name="category-management"
            component={CategoryManager}
            options={{ headerTitle: "Manage categories" }}
          />

          {/* addproduct */}
          <Stack.Screen
            name="add-product"
            component={AddProduct}
            options={{ headerTitle: "Add Product", headerTitleAlign: "center" }}
          />

          {/* products manager */}
          <Stack.Screen
            name="show-products"
            component={showProducts}
            options={{
              headerTitle: "Products Manager",
              headerTitleAlign: "center",
            }}
          />

          {/* update product */}
          <Stack.Screen
            name="update-product"
            component={UpdateProduct}
            options={{
              headerTitle: "Update Product",
              headerTitleAlign: "center",
            }}
          />

          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="payment" component={Payment} />
          <Stack.Screen name="account" component={Account} />
          <Stack.Screen name="cart" component={Cart} />
          <Stack.Screen
            name="productCategory"
            component={ProductCategories}
            options={({ route }) => ({ title: route.params.category })} // Cập nhật title
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// })

/*

<Tab.Screen
          name="AddExpense"
          component={AddAlbulmScreen}
          options={({ navigation }) => ({
            tabBarIcon: ({ color, size }) => (
              <Icon name="plus-square-o" color={color} size={size} />
            ),
            tabBarLabel: "Add Album",
            headerTitle: "Add Album",
            headerTitleAlign: "center",
            headerLeft: () => (
              <Icon.Button
                name="arrow-left"
                size={25}
                backgroundColor="transparent"
                color="black"
                onPress={() => navigation.goBack()}
              />
            ),
          })}
        />
*/
