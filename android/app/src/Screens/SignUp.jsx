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
} from 'react-native';
import arrow from '../Assets/Arrow.png';
import google from '../Assets/Google.png';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import {SelectCountry} from 'react-native-element-dropdown';
import UseAPI from '../Hooks/UseAPI';
import AppCountryInput from '../Components/AppCountryInput';
import AppLogo from '../Components/AppLogo';
import useShakeAnimation from '../Hooks/UseShakeAnimation';
import AppInput from '../Components/AppInput';
const SignUp = () => {
  const [phone_no, setPhone_no] = useState('');
  const [phoneCode, setPhoneCode] = useState('+91');
  const [name, setName] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [email, setEmail] = useState('');
  const [game, setGame] = useState('');
  const {requestAPI, error, loading} = UseAPI();
  const navigate = useNavigation();
  const { shakeAnimation, startShake } = useShakeAnimation();

  const local_data = [
    {
      value: 'ff',
      lable: 'Free Fire',
      image: {
        uri: 'https://i.pinimg.com/736x/51/e9/29/51e9298355dedb9e8981babeca340f61.jpg',
      },
    },
    {
      value: 'bgmi',
      lable: 'BGMI',
      image: {
        uri: 'https://staticg.sportskeeda.com/editor/2021/09/ce3be-16324974686158-800.jpg',
      },
    },
    {
      value: 'cod',
      lable: 'CALL OF DUTY',
      image: {
        uri: `https://logowik.com/content/uploads/images/call-of-duty-mobile7368.jpg`,
      },
    },
  ];

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleSubmit = async () => {
    if (!phone_no) {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: 'Please enter your phone number',
      });
      startShake();
      return;
    }
    if (!name) {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: 'Please enter your name',
      });
      startShake();
      return;
    }
    if (!email) {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: 'Please enter your email',
      });
      startShake();
      return;
    }
    if (!game) {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: 'Please select your favorite game',
      });
      startShake();
      return;
    }

    const response = await requestAPI('POST', '/api/auth/signUp', {
      country_code: phoneCode,
      phone_number: phone_no,
      email,
      name,
      game,
    });

    if (response.status === 'success') {
      navigate.navigate('OTP', `${phone_no} ${phoneCode}`);
    } else {
      Toast.show({
        type: 'myErrorToast',
        text1: 'Error',
        text2: response?.error || 'Invalid response from server', // Use returned error
      });
      startShake();
    }
  };

  const handleGoogleAuth = () => {
    Toast.show({
      type: 'myInfoToast',
      text1: 'Info',
      text2: 'Service unavalible!',
      visibilityTime: 4000,
    });
  };

  

  useEffect(() => {
    if (errorMessage) {
      startShake();
    }
  }, [errorMessage]);

  return (
    <>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.wrapperSignup}>
          <View style={styles.top}>
            <AppLogo />
          </View>
          <Animated.View
            style={[styles.mid, {transform: [{translateX: shakeAnimation}]}]}>
            <Text style={styles.signin}>Sign UP</Text>
            <Text style={styles.bottomtext}>
              Create your ESPIRONS account & play real esports
            </Text>
            <View style={styles.inputHolder}>
              <View style={styles.inputContainer}>
                <AppCountryInput
                  style={[styles.input]}
                  placeholder="Phone Number"
                  value={phone_no}
                  onChangeText={setPhone_no}
                  onChangeCode={setPhoneCode}
                  keyboardType="phone-pad"
                  placeholderTextColor="rgba(245, 247, 248, 0.75)"
                />
              </View>
              <View style={styles.inputContainer}>
                <AppInput
                  placeholder="Your Real Name"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="rgba(245, 247, 248, 0.75)"
                />
              </View>
              <View style={styles.inputContainer}>
                <AppInput
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholderTextColor="rgba(245, 247, 248, 0.75)"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.inputContainer}>
                <SelectCountry
                  style={[styles.dropdown]}
                  selectedTextStyle={styles.selectedTextStyle}
                  placeholderStyle={styles.placeholderStyle}
                  imageStyle={styles.imageStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  maxHeight={900}
                  value={game}
                  data={local_data}
                  valueField="value"
                  labelField="lable"
                  imageField="image"
                  placeholder="Select Game"
                  searchPlaceholder="Search..."
                  onChange={e => {
                    setGame(e.value);
                  }}
                />
              </View>

              <TouchableOpacity
                style={styles.submitButton}
                onPress={loading ? null : handleSubmit}>
                <Text style={styles.submitText}>Proceed To Join</Text>
                {loading ? (
                  <ActivityIndicator size="large" color="#45474B" />
                ) : (
                  <Image source={arrow} style={styles.arrow} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.bottomForm}>
              <Text style={styles.orText}>OR</Text>
              <TouchableOpacity
                style={styles.googleAuth}
                onPress={handleGoogleAuth}>
                <Image source={google} />
                <Text style={styles.googleText}>Sign Up with Google</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          <View style={styles.bottom}>
            <TouchableOpacity>
              <Text style={styles.bottomtext}>Terms and conditions apply</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate.navigate('signIn')}>
              <Text style={styles.bottomtext}>I already have an account?</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
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
    height: 110,
  },
  mid: {
    backgroundColor: '#D9D9D9',
    height: 'auto',
    borderRadius: 10,
    paddingLeft: 12,
    paddingTop: 7,
    paddingRight: 12,
    paddingBottom: 18,
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
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 1,
    paddingHorizontal: 4,
    borderRadius: 4,
  },
  inputHolder: {
    marginTop: 18,
    gap: 20,
    height: 415,
  },
  inputContainer: {
    marginBottom: 0,
  },
  input: {
    backgroundColor: '#45474B',
    height: 65,
    paddingHorizontal: 15,
    color: '#fff',
    fontFamily: 'Teko-SemiBold',
    fontSize: 20,
    letterSpacing: -0.78,
    position: 'relative',
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'Teko-SemiBold',
    position: 'absolute',
    top: -20,
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
    height: 80,
    marginTop: 0,
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  bottomForm: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orText: {
    fontFamily: 'Teko-SemiBold',
    fontSize: 25,
    color: '#45474B',
    marginTop: 4,
  },
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
  logo: {
    height: 90,
    width: 100,
    resizeMode: 'contain',
    zIndex: 90,
  },
  placeholderStyle: {
    color: 'rgba(245, 247, 248, 0.75)',
    fontFamily: 'Teko-SemiBold',
    fontSize: 21,
    letterSpacing: -0.78,
    backgroundColor: '#45474B',
  },
  selectedTextStyle: {
    color: 'rgba(245, 247, 248, 0.75)',
    backgroundColor: '#45474B',
    borderRadius: 5,
    paddingLeft: 10,
    height: 25,
    fontFamily: 'Teko-SemiBold',
    fontSize: 20,
    marginTop: 5,
    marginLeft: 5,
    letterSpacing: -0.78,
  },
  dropdown: {
    backgroundColor: '#45474B',
    height: 65,
    paddingHorizontal: 15,
    color: 'black',
    fontFamily: 'Teko-SemiBold',
    fontSize: 20,
    letterSpacing: -0.78,
    position: 'relative',
  },
  imageStyle: {
    width: 40,
    borderRadius: 10,
    height: 40,
  },
  iconStyle: {
    height: 30,
    width: 40,
  },
});

export default SignUp;
