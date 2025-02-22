
import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const Header = ({ searchText, setSearchText }) => {

  // Function for Search
  const handleSearch = () => {
    console.log(searchText);
    setSearchText(""); // Clear the input after search if desired
  };

  return (
    <View style={{ height: 90, backgroundColor: '#111111' }}>
      <View style={styles.container}>
        <TextInput 
          style={styles.inputBox} 
          value={searchText} 
          onChangeText={(text) => setSearchText(text)}
          placeholder="Search..."
        />
        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
          <FontAwesome name='search' size={20} color='#000' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  inputBox: {
    borderWidth: 0.5,
    width: '100%',
    position: 'absolute',
    left: 15,
    height: 40,
    color: '#000000',
    backgroundColor: '#ffffff',
    paddingLeft: 10,
    fontSize: 16,
    borderRadius: 5
  },
  searchBtn: {
    marginLeft: 10,
    position: 'absolute',
    left: '95%'
  },
  icons: {
    color: '#000000',
    fontSize: 18
  }
});

export default Header;
