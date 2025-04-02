import React from 'react';
import { Image, StyleSheet } from 'react-native';
import logo from '../Assets/LOGO.png';

const AppLogo = ({ source = logo, style }) => {
  return <Image source={source} style={[styles.logo, style]} />;
};

const styles = StyleSheet.create({
  logo: {
    height: 100,
    width: 120,
    resizeMode: 'contain',
    zIndex: 90,
  },
});

export default AppLogo;
