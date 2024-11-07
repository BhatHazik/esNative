import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import MyToast from '../Components/MyToast'
import Toast from 'react-native-toast-message';

const UserDashoard = ({route}) => {
    const { params } = route;
console.log(params);  
    const Message = params

    useEffect(() => {
        Toast.show({
          type: 'mySuccussToast',
          text1: 'Succuss',
          text2: `${Message}`,
          visibilityTime: 8000,
        });
      }, [Message]);                                                                                                                                          




  return (
    <View>
        <MyToast/>
        <Text style={{color:"green"}}>This is the user dashboard!</Text>
        </View>
  )
}

export default UserDashoard