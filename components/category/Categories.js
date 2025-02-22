import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'

import { categoriesData } from '../data/CategoriesData'
// import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome6';
import { useFocusEffect, useNavigation } from '@react-navigation/native'

import * as productServices from "../../src/services/productServices";


const Categories = () => {
  const navigation = useNavigation()

  const [categories, setCategories] = useState(categoriesData);

  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <View style={styles.container}>
        {categories?.map((item) => (
          <TouchableOpacity
            key={item._id} // Đảm bảo key là duy nhất cho mỗi phần tử
            style={styles.catContainer}
            onPress={() => navigation.navigate('productCategory', { categoryName: item.name })} // Điều hướng và truyền tên category
          >
            <FontAwesome name={item.icon} style={styles.catIcon} />
            <Text style={styles.catTitle}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    padding: 5,
    flexDirection: 'row',
  },
  catContainer: {
    padding: 10,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  catIcon: {
    fontSize: 30,
    verticalAlign: 'top',
    marginBottom: 10,
  },
  catTitle: {
    fontSize: 15,
  }
})

export default Categories
