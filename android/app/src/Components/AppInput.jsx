import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const AppInput = ({ value, onChangeText, placeholder, keyboardType, style }) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholderTextColor="rgba(245, 247, 248, 0.75)"
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#45474B',
    width: '100%',
    height: 65,
    paddingHorizontal: 15,
    color: '#fff',
    fontFamily: 'Teko-SemiBold',
    fontSize: 20,
  },
});

export default AppInput;