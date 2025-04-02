import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AppLogo from '../Components/AppLogo';
import ProceedButton from '../Components/ProceedButton';
import google from '../Assets/Google.png';
import arrow from '../Assets/Arrow.png';
import UseAPI from '../Hooks/UseAPI';
import AppCountryInput from '../Components/AppCountryInput';
import useShakeAnimation from '../Hooks/UseShakeAnimation';

const SignIn = () => {
  const [phoneNo, setPhoneNo] = useState('');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [errorMessage, setErrorMessage] = useState(null);
  const {requestAPI, loading, error} = UseAPI();
  const navigation = useNavigation();
  const {shakeAnimation, startShake} = useShakeAnimation();

  useEffect(() => {
    if (errorMessage) startShake();
  }, [errorMessage]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleSubmit = async () => {
    if (!phoneNo.trim()) {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: 'Please enter your phone number',
      });
      startShake();
      return;
    }

    const response = await requestAPI('POST', '/api/auth/login', {
      phone_number: phoneNo,
      country_code: phoneCode,
    });

    if (response.status === 'success') {
      navigation.navigate('OTP', `${phoneNo} ${phoneCode}`);
    } else {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: response?.error || 'Invalid response from server',
      });
      startShake();
    }
  };

  const handleGoogleAuth = () => {
    Toast.show({
      type: 'myInfoToast',
      text1: 'Info',
      text2: 'Service unavailable!',
      visibilityTime: 4000,
    });
  };

  return (
    <View style={styles.wrapperSignup}>
      <View style={styles.top}>
        <AppLogo />
      </View>

      <View>
        <Animated.View
          style={[
            styles.formContainer,
            {transform: [{translateX: shakeAnimation}]},
          ]}>
          <Text style={styles.signin}>Sign In</Text>
          <Text style={styles.bottomtext}>
            Use your ESPIRONS account to continue
          </Text>

          <AppCountryInput
            placeholder="Phone Number"
            onChangeText={setPhoneNo}
            onChangeCode={setPhoneCode}
            keyboardType="phone-pad"
            value={phoneNo}
            style={{marginBottom: 15}}
          />

          <ProceedButton
            onPress={handleSubmit}
            loading={loading}
            title="Proceed To Play"
            icon={arrow}
          />
          <View style={styles.bottomForm}>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              style={styles.googleAuth}
              onPress={handleGoogleAuth}>
              <Image source={google} />
              <Text style={styles.googleText}>Sign In with Google</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        <View style={styles.bottom}>
          <TouchableOpacity>
            <Text style={styles.otherButtons}>Terms and conditions apply</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
            <Text style={styles.otherButtons}>I don't have an account?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapperSignup: {flex: 1, padding: 15, justifyContent: 'space-between'},
  top: {height: 170},
  formContainer: {
    backgroundColor: '#D9D9D9',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  signin: {
    fontFamily: 'Teko-SemiBold',
    fontSize: 60,
    color: '#45474B',
    height: 65,
    letterSpacing: -3,
  },
  bottomtext: {
    color: '#E1C124',
    fontFamily: 'Teko-Regular',
    marginBottom: 25,
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 1,
    paddingHorizontal: 4,
    marginTop: 5,
    borderRadius: 4,
  },
  otherButtons: {color: '#E1C124', fontFamily: 'Teko-Regular', fontSize: 16},
  bottomForm: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orText: {fontFamily: 'Teko-SemiBold', fontSize: 25, color: '#45474B'},
  googleAuth: {
    height: 60,
    backgroundColor: '#45474B',
    flexDirection: 'row',
    alignItems: 'center',
    width: 250,
    paddingLeft: 10,
    borderRadius: 20,
    marginTop: 5,
  },
  googleText: {
    fontFamily: 'Teko-SemiBold',
    fontSize: 20,
    marginTop: 5,
    marginLeft: 5,
    color: '#FFFFFF',
  },
  bottom: {height: 100, alignItems: 'center', justifyContent: 'center'},
});

export default SignIn;
