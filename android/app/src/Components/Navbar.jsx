import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import logo from '../Assets/LOGO.png';
import ticketIcon from '../Assets/ticket.png'; // Replace with your ticket icon asset
import userIcon from '../Assets/user.png'; // Replace with your user profile icon asset
import ProfileDrawer from './ProfileDrawer';

const Navbar = ({
  logoSource = logo,
  backgroundColor = '#fff',
  ticketCount = 0,
  style,
  onTicketPress = () => {},
  onProfilePress = () => {},
}) => {
  
  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <ProfileDrawer visible={drawerVisible} onClose={handleCloseDrawer} />
      {/* Left Side: Logo */}
      <View style={styles.leftContainer}>
        <Image source={logoSource} style={styles.logo} />
      </View>

      {/* Right Side: Ticket button and Profile icon */}
      <View style={styles.rightContainer}>
        <TouchableOpacity style={[styles.ticketButton, backgroundColor === '#45474b' ? styles.whiteTheme : null]} onPress={onTicketPress}>
          <Text style={styles.ticketCount}>{ticketCount}</Text>
          <Image source={ticketIcon} style={styles.ticketIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={onProfilePress} style={styles.profileButton}>
          <Image source={userIcon} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 85,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    height: 90,
    width: 110,
    resizeMode: 'contain',
    zIndex: 90,
  },
  ticketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:"center",
    borderWidth: 1.5,
    borderStyle: 'dotted',
    borderColor: '#000',
    paddingVertical:2,
    paddingBottom:1,
    paddingHorizontal:10,
    paddingEnd:7,
    borderRadius: 10,
    marginRight: 10,
    gap:10
  },
  ticketIcon: {
    height: 27,
    width: 25,
    resizeMode: 'contain',
  },
  ticketCount: {
    fontSize: 23,
    color: '#F4CE14',
    fontFamily: 'Teko-Regular',
    // marginTop:3
  },
  profileButton: {
    // padding: 5,
  },
  profileIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  whiteTheme:{
    // backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 1.5,
    borderStyle: 'dotted',
    color: '#000',
  }
});

export default Navbar;
