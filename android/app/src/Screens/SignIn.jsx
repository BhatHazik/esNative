import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import logo from '../Assets/LOGO.png';
import arrow from '../Assets/Arrow.png';
import google from '../Assets/Google.png';
import BASE_URL from '../config/url.config';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import MyToast from '../Components/myToast';
const SignIn = () => {
  const [phone_no, setPhone_no] = useState(null);
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const navigate = useNavigation();
  const handleSubmit = async () => {
    setLoading(true);
    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/user/userLoginOTP`,
      data: {
        phone_no: phone_no,
        password: password,
      },
    }).then(
       response => {
        // await delay(4000);
        setLoading(false);
        const responseData = `${phone_no} ${password}`
        setData(`${phone_no} ${password}`)
        navigate.navigate('OTP', `SignIn ${response.data.OTP} ${responseData}`)
        // console.log(data);
      },
      err => {
        // await delay(4000);
        setLoading(false);
        setErrorMessage(err?.response?.data?.message || err.message);
        Toast.show({
          type: 'myErrorToast',
          text1: 'error',
          text2: err?.response?.data?.message || err.message,
          visibilityTime: 4000,
        });

        console.log(errorMessage);
      },
    );
  };
  const handleGoogleAuth = ()=>{
    Toast.show({
        type: 'myInfoToast',
        text1: 'Info',
        text2: 'Service unavalible!',
        visibilityTime: 4000,
      });
  }

  const shakeAnimation = useRef(new Animated.Value(0)).current;

  const startShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (errorMessage) {
      startShake();
    }
  }, [errorMessage]);

  return (
    <>
      <View style={styles.toast}>
        <MyToast/>
      </View>

      <View style={styles.wrapperSignup}>
        <View style={styles.top}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.mid}>
          <Text style={styles.signin}>Sign IN</Text>
          <Text style={styles.bottomtext}>
            Use your EPIRONS account to continue
          </Text>
          <View style={styles.inputHolder}>
            <View style={styles.inputContainer}>
              {errorMessage === 'Phone Number Required!' && (
                <Animated.Text
                  style={[
                    styles.errorMessage,
                    {transform: [{translateX: shakeAnimation}]},
                  ]}>
                  Required*
                </Animated.Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  errorMessage === 'Phone Number Required!'
                    ? {borderColor: 'red', borderWidth: 1}
                    : null,
                ]}
                placeholder="Phone Number"
                value={phone_no}
                onChangeText={setPhone_no}
                keyboardType="phone-pad"
                placeholderTextColor="rgba(245, 247, 248, 0.75)"
              />
            </View>
            <View style={styles.inputContainer}>
              {errorMessage === 'Password Required!' && (
                <Animated.Text
                  style={[
                    styles.errorMessage,
                    {transform: [{translateX: shakeAnimation}]},
                  ]}>
                  Required*
                </Animated.Text>
              )}
              <TextInput
                style={[
                  styles.input,
                  errorMessage === 'Password Required!'
                    ? {borderColor: 'red', borderWidth: 1}
                    : null,
                ]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="rgba(245, 247, 248, 0.75)"
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}

              onPress={loading ? null : handleSubmit}>
              <Text style={styles.submitText}>Proceed To Play</Text>
              {loading ? (
                <ActivityIndicator size="large" color="#45474B" />
              ) : (
                <Image source={arrow} style={styles.arrow} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.googleAuthHolder}>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity style={styles.googleAuth} onPress={handleGoogleAuth}>
              <Image source={google} />
              <Text style={styles.googleText}>Sign IN with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity>
            <Text style={styles.bottomtext}>Terms and conditions apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigate.navigate('signUp')}>
            <Text style={styles.bottomtext}>I don't have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  toast: {
    zIndex: 100,
  },
  wrapperSignup: {
    flex: 1,
    padding: 15,
  },
  top: {
    height: 170,
  },
  mid: {
    backgroundColor: '#D9D9D9',
    height: 500,
    borderRadius: 10,
    paddingLeft: 12,
    paddingTop: 7,
    paddingRight: 12,
  },
  signin: {
    fontFamily: 'Teko-SemiBold',
    fontSize: 55,
    color: '#45474B',
    height: 65,
    letterSpacing: -3,
  },
  bottomtext: {
    color: '#E1C124',
    fontFamily: 'Teko-Regular',
  },
  inputHolder: {
    marginTop: 30,
    justifyContent: 'space-between',
    height: 230,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#45474B',
    height: 65,
    paddingHorizontal: 15,
    color: '#fff',
    fontFamily: 'Teko-SemiBold',
    fontSize: 18,
    letterSpacing: -0.78,
    // borderRadius: 5,
    position: 'relative',
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'Teko-SemiBold',
    position: 'absolute',
    top: -20, // Position the error message above the input field
    left: 10,
  },
  submitButton: {
    backgroundColor: '#F4CE14',
    height: 71,
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  submitText: {
    color: '#45474B',
    fontFamily: 'Teko-SemiBold',
    fontSize: 28,
    letterSpacing: -1,
  },
  arrow: {
    height: 71,
    width: 55,
    resizeMode: 'contain',
  },
  googleAuthHolder: {
    height: 120,
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  orText: {
    fontFamily: 'Teko-SemiBold',
    fontSize: 20,
    color: '#45474B',
  },
  googleAuth: {
    height: 50,
    backgroundColor: '#45474B',
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    paddingLeft: 10,
    borderRadius: 10,
  },
  googleText: {
    fontFamily: 'Teko-SemiBold',
    fontSize: 20,
    marginTop: 5,
    marginLeft:5,
    color:"#FFFFFF"
  },
  bottom: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 90,
    width: 100,
    resizeMode: 'contain',
    zIndex: 90,
  },
});

export default SignIn;
