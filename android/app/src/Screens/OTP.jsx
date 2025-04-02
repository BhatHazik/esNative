import React, {useEffect, useRef, useState} from 'react';
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
  TouchableWithoutFeedback,
} from 'react-native';
import arrow from '../Assets/Arrow.png';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import UseAPI from '../Hooks/UseAPI';
import useShakeAnimation from '../Hooks/UseShakeAnimation';
import AppLogo from '../Components/AppLogo';

const OTP = ({route}) => {
  const {params} = route;
  const phone_no = params.split(' ')[0];
  const phoneCode = params.split(' ')[1];
  const [otp, setOtp] = useState(['', '', '', '']);
  const [errorMessage, setErrorMessage] = useState(null);
  const {requestAPI, error, loading} = UseAPI();
  const {shakeAnimation, startShake} = useShakeAnimation();
  const navigate = useNavigation();

  const inputRefs = useRef([]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (!otpString || otpString.length !== 4) {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: 'Please enter 4 digit OTP',
      });
      startShake();
      return;
    }
    const response = await requestAPI('POST', '/api/auth/verifyOTP', {
      phone_number: phone_no,
      country_code: phoneCode,
      otp: otpString,
    });
    if (response.status === 'success') {
      navigate.navigate('userDashboard', response.message);
    } else {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: response?.error || 'Invalid response from server',
      });
      startShake();
    }
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    if (text && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    setOtp(newOtp);
  };

  const handleKeyPress = ({nativeEvent: {key}}, index) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
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
        style={styles.wrapperSignup}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.top}>
            <AppLogo />
          </View>
          <Animated.View
            style={[styles.mid, {transform: [{translateX: shakeAnimation}]}]}>
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
                    onChangeText={text => handleOtpChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    ref={ref => (inputRefs.current[index] = ref)}
                    keyboardType="number-pad"
                    textAlign="center"
                    placeholder="_"
                  />
                ))}
              </View>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}>
                <Text style={styles.submitText}>Confirm OTP</Text>
                {loading ? (
                  <ActivityIndicator size="large" color="#45474B" />
                ) : (
                  <Image source={arrow} style={styles.arrow} />
                )}
              </TouchableOpacity>
            </View>
          </Animated.View>
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
    fontSize: 16,
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
    gap: 13,
  },
  otpInput: {
    backgroundColor: '#45474B',
    height: 78,
    width: 78,
    color: '#fff',
    fontFamily: 'Teko-SemiBold',
    fontSize: 40,
    paddingTop: 20,
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

export default OTP;
