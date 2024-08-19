// CustomToast.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const MyToast = () => {


const toastConfig = {
    // // Custom success toast
    // success: (props) => (
    //   <BaseToast
    //     {...props}
    //     style={{ borderLeftColor: 'green', borderWidth: 2, backgroundColor: 'lightgreen' }}
    //     contentContainerStyle={{ paddingHorizontal: 15 }}
    //     text1Style={{
    //       fontSize: 15,
    //       fontWeight: '600',
    //       color: 'green'
    //     }}
    //     text2Style={{
    //       fontSize: 13,
    //       color: 'darkgreen'
    //     }}
    //   />
    // ),
    // // Custom error toast
    // error: (props) => (
    //   <ErrorToast
    //     {...props}
    //     style={{ borderLeftColor: 'red', borderWidth: 2, backgroundColor: 'lightcoral' }}
    //     text1Style={{
    //       fontSize: 17,
    //       fontWeight: '600',
    //       color: 'darkred'
    //     }}
    //     text2Style={{
    //       fontSize: 15,
    //       color: 'red'
    //     }}
    //   />
    // ),
    // // Custom info toast
    // info: (props) => (
    //   <BaseToast
    //     {...props}
    //     style={{ borderLeftColor: 'blue', borderWidth: 2, backgroundColor: 'lightblue' }}
    //     contentContainerStyle={{ paddingHorizontal: 15 }}
    //     text1Style={{
    //       fontSize: 15,
    //       fontWeight: '600',
    //       color: 'blue'
    //     }}
    //     text2Style={{
    //       fontSize: 13,
    //       color: 'darkblue'
    //     }}
    //   />
    // ),
    // Custom toast
    myErrorToast: ({text1, text2, props}) => (
      <View
        style={{
          height: 55,
          minWidth: '50%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          position: 'absolute',
          right: 20,
          top: -10,
          borderLeftWidth: 5,
          borderColor: 'red',
        }}>
        <Text style={{color: 'red', fontSize: 16, fontFamily: 'Teko-Medium'}}>
          {text1}
        </Text>
        {text2 && (
          <Text style={{color: 'red', fontSize: 14, fontFamily: 'Teko-Medium'}}>
            {text2}
          </Text>
        )}
      </View>
    ),
    mySuccussToast: ({text1, text2, props}) => (
      <View
        style={{
          height: 55,
          minWidth: '50%',
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 10,
          position: 'absolute',
          right: 20,
          top: -10,
          borderLeftWidth: 5,
          borderColor: 'green',
        }}>
        <Text style={{color: 'green', fontSize: 16, fontFamily: 'Teko-Medium'}}>
          {text1}
        </Text>
        {text2 && (
          <Text
            style={{color: 'green', fontSize: 14, fontFamily: 'Teko-Medium'}}>
            {text2}
          </Text>
        )}
      </View>
    ),
    myInfoToast: ({text1, text2, props}) => (
        <View
          style={{
            height: 55,
            minWidth: '50%',
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            position: 'absolute',
            right: 20,
            top: -10,
            borderLeftWidth: 5,
            borderColor: '#17a2b8',
          }}>
          <Text style={{color: '#17a2b8', fontSize: 16, fontFamily: 'Teko-Medium'}}>
            {text1}
          </Text>
          {text2 && (
            <Text
              style={{color: '#17a2b8', fontSize: 14, fontFamily: 'Teko-Medium'}}>
              {text2}
            </Text>
          )}
        </View>
      ),
  };

  return <Toast config={toastConfig} />;
};

const styles = StyleSheet.create({
  toastContainer: {
    zIndex: 100,
  },
  toast: {
    height: 55,
    minWidth: '50%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    position: 'absolute',
    right: 20,
    top: -10,
    borderLeftWidth: 5,
  },
  errorToast: {
    borderColor: 'red',
  },
  successToast: {
    borderColor: 'green',
  },
  infoToast: {
    borderColor: '#17a2b8',
  },
  toastTitle: {
    fontSize: 16,
    fontFamily: 'Teko-Medium',
  },
  toastMessage: {
    fontSize: 14,
    fontFamily: 'Teko-Medium',
  },
});

export default MyToast;




