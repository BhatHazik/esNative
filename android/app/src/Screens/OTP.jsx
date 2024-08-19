import React, { useEffect, useRef, useState } from 'react';
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
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import logo from '../Assets/LOGO.png';
import arrow from '../Assets/Arrow.png';
import BASE_URL from '../config/url.config';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import MyToast from '../Components/myToast';

const OTP = ({ route }) => {
  const { params } = route;
  const FromComponent = params.split(' ')[0];
  const OTPMessage = params.split(' ')[1];
  const phone_no = params.split(' ')[2];
  const email = params.split(' ')[4];
  const password = params.split(' ')[3];
  const game = params.split(' ')[5];
  console.log(params);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [data, setData] = useState(null);
  useEffect(() => {
    Toast.show({
      type: 'mySuccussToast',
      text1: 'OTP RECEIVED',
      text2: `Your OTP is ${OTPMessage}`,
      visibilityTime: 8000,
    });
  }, [OTPMessage]);

  
  const navigate = useNavigation();

  const inputRefs = useRef([]);

  const handleSignUpSubmit = async () => {
    const otpString = otp.join('');
    console.log("signUp hited")
    setLoading(true);
    await axios({
        method:"POST",
        url:`${BASE_URL}/api/user/userRegisterVerify`,
        data:{
            phone_no:phone_no,
            password:password,
            email,email,
            game:game,
            givenOTP:otpString
        }
    }).then((response)=>{
        setLoading(false);
        navigate.navigate('userDashboard', "Account Created!");
    },(err)=>{
        setLoading(false);
      setErrorMessage(err.response.data.message || err.message);
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: err.response.data.message || err.message,
        visibilityTime: 4000,
      });
    })
  };

  const handleSignInSubmit = async () => {
    const otpString = otp.join('');
    console.log(otpString,"signin hited");
    setLoading(true);

    await axios({
        method:"POST",
        url:`${BASE_URL}/api/user/userLoginVerifyOTP`,
        data:{
            phone_no:phone_no,
            password:password,
            givenOTP:otpString
        }
    }).then((response)=>{
        setLoading(false)
        navigate.navigate('userDashboard', "Logged in!");
    },(err)=>{
        setLoading(false);
      setErrorMessage(err.response.data.message || err.message);
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: err.response.data.message || err.message,
        visibilityTime: 4000,
      });
    })
    
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;

    // Move to the next input field if text is entered
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    // Move to the previous input field if text is deleted and it's not the first input
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    setOtp(newOtp);
  };

  const handleKeyPress = ({ nativeEvent: { key } }, index) => {
    // Handle backspace to focus previous input field
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.wrapperSignup}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps='handled'
        >
            <MyToast/>
          <View style={styles.top}>
            <Image source={logo} style={styles.logo} />
          </View>
          <View style={styles.mid}>
            <Text style={styles.signin}>OTP</Text>
            <Text style={styles.bottomtext}>Provide OTP to continue</Text>
            <View style={styles.inputHolder}>
              <View style={styles.otpContainer}>
                {otp.map((value, index) => (
                  <TextInput
                    key={index}
                    style={styles.otpInput}
                    maxLength={1}
                    value={value}
                    onChangeText={(text) => handleOtpChange(text, index)}
                    onKeyPress={(e) => handleKeyPress(e, index)}
                    ref={(ref) => inputRefs.current[index] = ref}
                    keyboardType="number-pad"
                    textAlign="center"
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={loading ? null : FromComponent === 'SignIn' ?  handleSignInSubmit: FromComponent === 'SignUp' && handleSignUpSubmit }
              >
                <Text style={styles.submitText}>Confirm OTP</Text>
                {loading ? (
                  <ActivityIndicator size="large" color="#45474B" />
                ) : (
                  <Image source={arrow} style={styles.arrow} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity> 
              <Text style={styles.bottomtext}>Terms and conditions apply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Text style={styles.bottomtext}>Edit phone number?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  scrollContainer: {
    flexGrow: 1,
  },
  top: {
    height: 400,
  },
  mid: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    paddingLeft: 12,
    paddingTop: 7,
    paddingRight: 12,
    paddingBottom: 20,
  },
  signin: {
    fontFamily: 'Teko-SemiBold',
    fontSize: 55,
    color: '#45474B',
    height: 58,
    letterSpacing: -3,
  },
  bottomtext: {
    color: '#E1C124',
    fontFamily: 'Teko-Regular',
  },
  inputHolder: {
    marginTop: 18,
    gap: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10
  },
  otpInput: {
    backgroundColor: '#45474B',
    height: 75,
    width: 72,
    color: '#fff',
    fontFamily: 'Teko-SemiBold',
    fontSize: 40,
    paddingTop:20,
    textAlign: 'center',
    borderRadius: 18,
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
  bottom: {
    height: 80,
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

export default OTP;
