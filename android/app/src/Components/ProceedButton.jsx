import React from 'react';
import { TouchableOpacity, Text, Image, ActivityIndicator, StyleSheet } from 'react-native';

const ProceedButton = ({ onPress, loading, title, icon }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={loading ? null : onPress}>
      <Text style={styles.submitText}>{title}</Text>
      {loading ? <ActivityIndicator size="large" color="#45474B" /> : <Image source={icon} style={styles.arrow} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: '#F4CE14',
    width: '100%',
    height: 65,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  submitText: {
    color: '#45474B',
    fontFamily: 'Teko-SemiBold',
    fontSize: 25,
  },
  arrow: {
    height: 71,
    width: 55,
    resizeMode: 'contain',
  },
});

export default ProceedButton;
