import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import InputBox from "../../components/Form/InputBox";

// Redux hooks
import { login } from "../../redux/features/auth/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useReduxStateHook } from "../../components/hooks/customerHook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as userServices from "../../src/services/userServices";

const Login = ({ navigation }) => {
  const loginImage = "https://cdn-icons-png.flaticon.com/512/5087/5087579.png";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Hooks
  const dispatch = useDispatch();

  // Global state
  const loading = useReduxStateHook(navigation, "home");

  // login function
  const handleLogin = async () => {
    if (!email || !password) {
      return alert("Please add email or password");
    }
    const data = { email, password };
    const respone = await userServices.userLogin(data);

    if (respone?.status === "OK") {
      await AsyncStorage.setItem('userInfo' , JSON.stringify(respone));
      navigation.navigate("home");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />
      {/* {loading && <Text>loading ...</Text>} */}
      <InputBox
        placeholder="Enter Your Email"
        autoComplete={"email"}
        value={email}
        setValue={setEmail}
      />

      <InputBox
        placeholder="Enter Your Password"
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Login</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("register")}>
          Not a user yet ? Please <Text style={styles.link}>Register !</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    // alignItems: 'center',
    height: "100%",
  },
  image: {
    height: 150,
    width: "100%",
    resizeMode: "contain",
  },
  btnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtn: {
    backgroundColor: "#000000",
    justifyContent: "center",
    width: "80%",
    height: 40,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
  },
  loginBtnText: {
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: 16,
    color: "#FFFFFF",
  },
  link: {
    color: "#14919B",
  },
});

export default Login;
