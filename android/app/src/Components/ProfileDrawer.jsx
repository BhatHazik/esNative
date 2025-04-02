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
} from 'react-native';

const { width, height } = Dimensions.get('window');

const MENU_ITEMS = [
  { id: 1, label: 'PROFILE' },
  { id: 2, label: 'NOTIFICATIONS' },
  { id: 3, label: 'MY SUBSCRIPTION' },
  { id: 4, label: 'SETTINGS' },
];

const ProfileDrawer = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(width)).current; // start off-screen to the right
  const fadeAnim = useRef(new Animated.Value(0)).current;      // background overlay fade
  const itemAnimations = useRef(MENU_ITEMS.map(() => new Animated.Value(0))).current; 
  // each menu item gets its own Animated.Value for staggering

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5, // dim background to 50% opacity
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        // Stagger in the menu items after the drawer slides in
        Animated.stagger(100, 
          itemAnimations.map(anim =>
            Animated.spring(anim, {
              toValue: 1,
              useNativeDriver: true,
            })
          )
        ).start();
      });
    } else {
      // Slide out
      // reset itemAnimations to 0 first
      itemAnimations.forEach(anim => anim.setValue(0));

      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: width,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [visible]);

  // If not visible and slideAnim is at "width", we can skip rendering for performance
  // (Optional) You can skip or do a conditional render to avoid showing the drawer at all.
  if (!visible && slideAnim.__getValue() === width) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      {/* Background overlay */}
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        {/* Capture background taps to close if you want: */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.overlayTouchable} />
        </TouchableWithoutFeedback>
      </Animated.View>

      {/* Sliding drawer */}
      <Animated.View
        style={[
          styles.drawerContainer,
          {
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {/* Top arrow / close button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>{'←'}</Text>
        </TouchableOpacity>

        {/* Menu items */}
        <View style={styles.menuItemsContainer}>
          {MENU_ITEMS.map((item, index) => {
            const itemScale = itemAnimations[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0.8, 1],
            });
            const itemOpacity = itemAnimations[index];
            return (
              <Animated.View
                key={item.id}
                style={[
                  styles.menuItem,
                  {
                    transform: [{ scale: itemScale }],
                    opacity: itemOpacity,
                  },
                ]}
              >
                <Text style={styles.menuItemText}>{item.label}</Text>
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>
    </View>
  );
};

export default ProfileDrawer;

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    // The parent screen needs to position this absolutely above everything.
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
    right: 0, // slide from right
    width: width, // full width to cover entire screen
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  closeButton: {
    marginBottom: 30,
  },
  closeButtonText: {
    fontSize: 26,
    color: '#000',
  },
  menuItemsContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  menuItem: {
    marginBottom: 25,
  },
  menuItemText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
  },
});
