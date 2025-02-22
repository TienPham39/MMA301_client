import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import InputBox from "../../components/Form/InputBox";
import * as userServices from "../../src/services/userServices";

const Register = () => {
  const loginImage = "https://cdn-icons-png.flaticon.com/512/5087/5087579.png";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [country, setCountry] = useState("Viet Nam");

  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!email || !password || !name || !address || !city ) {
      return alert("Please provide all fields !");
    }
    console.log("asdas")
    const data = { name, email, password, address, city, country, phone: contact };
    console.log("data", data);

    const respone = await userServices.userRegister(data);
    if (respone.status === "OK") {
      alert("Register Successfully");
      navigation.navigate("login");
    }

    
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: loginImage }} style={styles.image} />
      <InputBox
        placeholder="Enter Your Name"
        autoComplete={"name"}
        value={name}
        setValue={setName}
      />

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

      <InputBox
        placeholder="Enter Your Address"
        autoComplete={"address-line1"}
        value={address}
        setValue={setAddress}
      />

      <InputBox
        placeholder="Enter Your City"
        autoComplete={"country"}
        value={city}
        setValue={setCity}
      />

      <InputBox
        placeholder="Enter Your Country"
        autoComplete={"tel"}
        value={country}
        setValue={setCountry}
      />
      <InputBox
        placeholder="Enter Your Contact"
        autoComplete={"tel"}
        value={contact}
        setValue={setContact}
      />

      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginBtnText}>Register</Text>
        </TouchableOpacity>
        <Text onPress={() => navigation.navigate("login")}>
          Already a user please ?{"  "}
          <Text style={styles.link}>Login !</Text>
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

export default Register;
