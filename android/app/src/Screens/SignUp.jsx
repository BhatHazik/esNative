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
  ScrollView,
  KeyboardAvoidingView,
  
} from 'react-native';
import logo from '../Assets/LOGO.png';
import arrow from '../Assets/Arrow.png';
import google from '../Assets/Google.png';
import BASE_URL from '../config/url.config';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import { SelectCountry } from 'react-native-element-dropdown';
import MyToast from '../Components/myToast';
const SignUp = () => {
  const [phone_no, setPhone_no] = useState(null);
  const [password, setPassword] = useState(null);
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [game, setGame] = useState('');
  const [country, setCountry] = useState('1');
  // const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const navigate = useNavigation();



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
    }
  ];















  const handleSubmit = async () => {
    setLoading(true);
    await axios({
      method: 'POST',
      url: `${BASE_URL}/api/user/userOTP`,
      data: {
        phone_no: phone_no,
        password: password,
        email: email,
        game: game,
      },
    }).then(
      response => {
        // await delay(4000);
        setLoading(false);
        // setData(`${phone_no} ${password} ${email} ${game}`);
        // console.log(response.data, game);
        const responseData = `${phone_no} ${password} ${email} ${game}`;
        navigate.navigate('OTP', `SignUp ${response.data.OTP} ${responseData} `);
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
  const handleGoogleAuth = () => {
    Toast.show({
      type: 'myInfoToast',
      text1: 'Info',
      text2: 'Service unavalible!',
      visibilityTime: 4000,
    });
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
    <>
   
      <View style={styles.toast}>
        <MyToast/>
      </View>
      <ScrollView>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.wrapperSignup}>
      
        <View style={styles.top}>
          <Image source={logo} style={styles.logo} />
        </View>
        <View style={styles.mid}>
          <Text style={styles.signin}>Sign UP</Text>
          <Text style={styles.bottomtext}>
            Create your PUSG account & play real esports
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
              {errorMessage === 'Please provide your email address!' && (
                <Animated.Text
                  style={[
                    styles.errorMessage,
                    {transform: [{translateX: shakeAnimation}]},
                  ]}>
                  Required*
                </Animated.Text>
              )}{
                errorMessage === 'Invalid email format' && (
                <Animated.Text
                  style={[
                    styles.errorMessage,
                    {transform: [{translateX: shakeAnimation}]},
                  ]}>
                  Invalid email format*
                </Animated.Text>
                )
              }
              <TextInput
                style={[
                  styles.input,
                  errorMessage === 'Please provide your email address!'
                    ? {borderColor: 'red', borderWidth: 1}
                    : null,
                ]}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="rgba(245, 247, 248, 0.75)"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
                
              />
              
            </View>
            <View style={styles.inputContainer}>
              {errorMessage === 'select an game!' && (
                <Animated.Text
                  style={[
                    styles.errorMessage,
                    {transform: [{translateX: shakeAnimation}]},
                  ]}>
                  Required*
                </Animated.Text>
              )}
              <SelectCountry
        style={[
            styles.dropdown,
            
            errorMessage === 'select an game!'
              ? {borderColor: 'red', borderWidth: 1}
              : null,
          ]}
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
                placeholder="Set Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="rgba(245, 247, 248, 0.75)"
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
          <View style={styles.googleAuthHolder}>
            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity
              style={styles.googleAuth}
              onPress={handleGoogleAuth}>
              <Image source={google} />
              <Text style={styles.googleText}>Sign UP with Google</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    height: 600,
    borderRadius: 10,
    paddingLeft: 12,
    paddingTop: 7,
    paddingRight: 12,
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
    height: 415,
    // backgroundColor:"blue"
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
    height: 80,
    marginTop: 0,
    paddingBottom: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor:"blue"
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
    marginLeft: 5,
    color: '#FFFFFF',
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
  placeholderStyle:{
    color: 'rgba(245, 247, 248, 0.75)',
    fontFamily: 'Teko-SemiBold',
    fontSize: 18,
    letterSpacing: -0.78,
    backgroundColor:"#45474B",
    
  },
  selectedTextStyle:{
    color: 'rgba(245, 247, 248, 0.75)',
    backgroundColor:"#45474B",
    borderRadius:5,
    paddingLeft:10,
    height:25,
    fontFamily: 'Teko-SemiBold',
    fontSize: 18,
    marginTop:5,
    marginLeft:5,
    letterSpacing: -0.78,
  },
  dropdown:{
    backgroundColor: '#45474B',
    height: 65,
    paddingHorizontal: 15,
    color: 'black',
    fontFamily: 'Teko-SemiBold',
    fontSize: 18,
    letterSpacing: -0.78,
    // borderRadius: 5,
    position: 'relative',
  },
  imageStyle:{
    width:40,
    borderRadius:10,
    height:40,
    
  },
  iconStyle:{
    height:30,
    width:40
  }
});

export default SignUp;
