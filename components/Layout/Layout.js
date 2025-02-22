import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Categories from '../category/Categories'

const Layout = ({ children }) => {
  return (
    <>
      <StatusBar />
      <View>{children}</View>
      <View style={styles.footer}>
        <Footer />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    display: 'flex',
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
    zIndex: 100,
    borderWidth: 1,
    borderColor: 'lightgray',
    bottom: 0,
    padding: 10,
    
  }
})

export default Layout
