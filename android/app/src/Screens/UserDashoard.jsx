import React from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import Navbar from '../Components/Navbar';
import ProfileDrawer from '../Components/ProfileDrawer';

const UserDashboard = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleProfilePress = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };
  return (
    <>
      <Navbar backgroundColor="#45474b" ticketCount={16} onTicketPress={() => Toast.show({ type: 'info', text1: 'Tickets Clicked' })} onProfilePress={handleProfilePress} />
      <ProfileDrawer visible={drawerVisible} onClose={handleCloseDrawer} />
      <View style={styles.container}>
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});

export default UserDashboard;
