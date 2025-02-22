import { Image, View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'

const CartItem = ({ item }) => {

  const [qty, setQty] = useState(1)

  //Handle function for + 
  const handleAddQty = () => {
    if(qty === 10) return alert("You can't add more than 10 quantities")
    setQty((prev) => prev + 1)
  }

  //Handle function for - 
  const handleRemoveQty = () => {
    if(qty <= 1) return
    setQty((prev) => prev - 1)
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.imageUrl }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item?.name}</Text>
        <Text style={styles.name}>Price: {item?.price} $</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btnQty} onPress={handleRemoveQty}>
          <Text style={styles.btnQtyText}>-</Text>
        </TouchableOpacity>
        <Text>{qty}</Text>
        <TouchableOpacity style={styles.btnQty} onPress={handleAddQty}>
          <Text style={styles.btnQtyText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  image: {
    height: 70,
    width: 70,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 10
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,  
  },
  btnQty: {
    backgroundColor: 'lightgray',
    width: 40,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  btnQtyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default CartItem
