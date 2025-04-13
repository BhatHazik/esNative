// ProfileDrawer.js
import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Easing,
} from 'react-native';
import userIcon from "../Assets/icons/userIcon.png";
import bellIcon from "../Assets/icons/bellIcon.png";
import subscriptionIcon from "../Assets/icons/subscriptionIcon.png";
import settingsIcon from "../Assets/icons/settingsIcon.png";
import arrow from "../Assets/icons/arrow.png";

const { width, height } = Dimensions.get('window');

// Component for menu item icons with proper styling
const IconComponent = ({ source }) => (
  <View style={styles.iconContainer}>
    <Image source={source} style={styles.icon} />
  </View>
);

// Menu items with their respective icons
const MENU_ITEMS = [
  { id: 1, label: 'PROFILE', icon: <IconComponent source={userIcon} /> },
  { id: 2, label: 'NOTIFICATIONS', icon: <IconComponent source={bellIcon} /> },
  { id: 3, label: 'MY SUBSCRIPTION', icon: <IconComponent source={subscriptionIcon} /> },
  { id: 4, label: 'SETTINGS', icon: <IconComponent source={settingsIcon} /> },
];

const ProfileDrawer = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  // Animation values for each menu item
  const menuItemAnims = useRef(
    MENU_ITEMS.map(() => ({
      opacity: new Animated.Value(0),
      translateX: new Animated.Value(50),
    }))
  ).current;
  
  // Animation value for logo
  const logoAnim = useRef({
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0.95),
  }).current;

  // Reset animation values when component mounts
  useEffect(() => {
    slideAnim.setValue(width);
    fadeAnim.setValue(0);
    
    // Reset menu item animations
    menuItemAnims.forEach(anim => {
      anim.opacity.setValue(0);
      anim.translateX.setValue(50);
    });
    
    // Reset logo animation
    logoAnim.opacity.setValue(0);
    logoAnim.scale.setValue(0.95);
  }, []);

  // Handle animations when visibility changes
  useEffect(() => {
    if (visible) {
      // Prepare animations for showing
      slideAnim.setValue(width);
      
      // Step 1: Slide in the drawer and fade in background
      Animated.parallel([
        // Drawer slide-in
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 65,
          friction: 11,
          useNativeDriver: true,
        }),
        // Fade in background
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 300,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
      
      // Step 2: Almost immediately start the logo animation
      Animated.sequence([
        Animated.delay(80),
        Animated.parallel([
          Animated.timing(logoAnim.opacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(logoAnim.scale, {
            toValue: 1,
            tension: 50,
            friction: 8,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
      
      // Step 3: Start menu item animations with a slight delay after logo
      Animated.sequence([
        Animated.delay(120), // Small delay after drawer starts sliding
        Animated.stagger(
          80, // Time between each item animation starting
          menuItemAnims.map(anim =>
            Animated.parallel([
              // Fade in
              Animated.timing(anim.opacity, {
                toValue: 1,
                duration: 250,
                easing: Easing.out(Easing.quad),
                useNativeDriver: true,
              }),
              // Slide in from right
              Animated.spring(anim.translateX, {
                toValue: 0,
                tension: 70,
                friction: 7,
                useNativeDriver: true,
              }),
            ])
          )
        ),
      ]).start();
    } else {
      // Quick exit animations
      
      // Close all animations in parallel for speed
      Animated.parallel([
        // Drawer slide out
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 250,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        // Fade out background
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        // Fade out logo
        Animated.timing(logoAnim.opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        // Fade out all menu items
        ...menuItemAnims.map(anim =>
          Animated.parallel([
            Animated.timing(anim.opacity, {
              toValue: 0,
              duration: 150,
              useNativeDriver: true,
            }),
            Animated.timing(anim.translateX, {
              toValue: 30,
              duration: 150,
              useNativeDriver: true,
            }),
          ])
        ),
      ]).start();
    }
  }, [visible]);

  return (
    <Animated.View 
      style={[
        styles.wrapper,
        { 
          opacity: fadeAnim.interpolate({
            inputRange: [0, 0.05],
            outputRange: [0, 1],
          }),
          pointerEvents: visible ? 'auto' : 'none',
        }
      ]}
    >
      {/* Background overlay */}
      <Animated.View
        style={[
          styles.overlay,
          { opacity: fadeAnim }
        ]}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Sliding drawer - full height immediately */}
      <Animated.View
        style={[
          styles.drawerContainer,
          {
            transform: [
              { translateX: slideAnim }
            ],
          },
        ]}
      >
        {/* Back button */}
        <TouchableOpacity onPress={onClose} style={styles.backButton} activeOpacity={0.7}>
          <Image source={arrow} style={styles.backArrow} />
        </TouchableOpacity>
        
        {/* Centered logo with animation */}
        <Animated.View 
          style={[
            styles.logoContainer,
            {
              opacity: logoAnim.opacity,
              transform: [{ scale: logoAnim.scale }]
            }
          ]}
        >
          <Image 
            source={require('../Assets/LOGO.png')} 
            style={styles.logoImage} 
          />
        </Animated.View>

        {/* Menu items with staggered animation */}
        <View style={styles.menuItemsContainer}>
          {MENU_ITEMS.map((item, index) => (
            <Animated.View 
              key={item.id} 
              style={[
                styles.menuItemWrapper,
                {
                  opacity: menuItemAnims[index].opacity,
                  transform: [{ translateX: menuItemAnims[index].translateX }]
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.menuItem} 
                activeOpacity={0.7}
                onPress={() => console.log(`${item.label} pressed`)}
              >
                {item.icon}
                <Text style={styles.menuItemText}>{item.label}</Text>
              </TouchableOpacity>
              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
              </View>
            </Animated.View>
          ))}
        </View>
      </Animated.View>
    </Animated.View>
  );
};

const scaleFactor = Math.min(width, height) / 375;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawerContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: width,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: '100%', // Ensure full height from start
  },
  backButton: {
    position: 'absolute',
    top: 20 * scaleFactor,
    left: 20 * scaleFactor,
    padding: 10,
    zIndex: 10,
  },
  backArrow: {
    width: 30 * scaleFactor,
    height: 30 * scaleFactor,
    resizeMode: 'contain',
  },
  logoContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30 * scaleFactor,
    marginBottom: 20 * scaleFactor,
  },
  logoImage: {
    height: 60 * scaleFactor,
    width: 200 * scaleFactor,
    resizeMode: 'contain',
  },
  menuItemsContainer: {
    marginTop: 40 * scaleFactor,
  },
  menuItemWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 35 * scaleFactor,
    height: 35 * scaleFactor,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10 * scaleFactor,
  },
  icon: {
    width: 28 * scaleFactor,
    height: 28 * scaleFactor,
    resizeMode: 'contain',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 25 * scaleFactor,
    paddingHorizontal: 30 * scaleFactor,
    width: '100%',
  },
  menuItemText: {
    fontSize: 35,
    fontFamily: 'Teko-Medium',
    color: '#45474B',
    marginRight: 45 * scaleFactor,
    letterSpacing: -1,
    textAlign: 'center',
  },
  dividerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  divider: {
    height: 2,
    backgroundColor: '#E0E0E0',
    width: '60%',
  },
});

export default ProfileDrawer;
