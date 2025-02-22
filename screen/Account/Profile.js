import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Pressable
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { UserData } from '../../components/data/UserData'
import InputBox from '../../components/Form/InputBox'
import { TouchableOpacity } from 'react-native'
import * as userServices from "../../src/services/userServices";

const Profile = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [account, setAccount] = useState(null);

  const fetchData = async () => {
    try {
      const response = await userServices.getDetailsUser();
      if (response) {
        const user = response.user;
        setAccount(user); // Cập nhật thông tin tài khoản
        // Khởi tạo các giá trị input từ thông tin người dùng
        setName(user.name);
        setEmail(user.email);
        setProfilePicture(user.profilePicture);
        setAddress(user.address);
        setCity(user.city);
        setPhone(user.phone);
      }
    } catch (error) {
      console.error('Error getting profile:', error);
    } finally {
      setLoading(false); // Đánh dấu là đã tải xong
    }
  };

  // Gọi hàm fetchData khi component được mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!name || !address || !city || !phone) {
      return alert('Please provide all fields !');
    }

    const data = {
      data: { name, password, address, city, phone }
    };

    try {
      const response = await userServices.updateUser(data);
      if (response) {
        alert('Profile Update Successfully');
        navigation.navigate('account');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{ uri: UserData.profilePicture }} />
          </View>

          {/* Allow user update they profile */}
          <InputBox
            value={name}
            setValue={setName}
            placeholder={'Enter Your Name'}
            autoComplete={'name'}
          />

          <InputBox
            value={password}
            setValue={setPassword}
            placeholder={'Enter Your Password'}
            autoComplete={'password'}
            secureTextEntry={true}
          />
          <InputBox
            value={address}
            setValue={setAddress}
            placeholder={'Enter Your Address'}
            autoComplete={'address-line1'}
          />
          <InputBox
            value={city}
            setValue={setCity}
            placeholder={'Enter Your City'}
            autoComplete={'country'}
          />
          <InputBox
            value={phone}
            setValue={setPhone}
            placeholder={'Enter Your Phone'}
            autoComplete={'tel'}
          />

          {/* Update Profile Button */}
          <TouchableOpacity
            style={styles.btnUpdate}
            onPress={handleUpdate}
          >
            <Text style={styles.btnUpdateText}>Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  image: {
    height: 100,
    width: '100%',
    resizeMode: 'contain'
  },
  btnUpdate: {
    backgroundColor: '#000000',
    height: 40,
    borderRadius: 20,
    marginHorizontal: 30,
    justifyContent: 'center',
    marginTop: 10
  },
  btnUpdateText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center'
  }
})

export default Profile
