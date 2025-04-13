import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions, Animated, Image } from 'react-native';

// Import custom icons
import homeIcon from '../Assets/icons/homeIcon.png';
import teamIcon from '../Assets/icons/teamIcon.png';
import leaderBoardIcon from '../Assets/icons/leaderBoardIcon.png';
import rewardsIcon from '../Assets/icons/rewards.png';

const { width } = Dimensions.get('window');

const BottomNavBar = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Home');
  const [translateValue] = useState(new Animated.Value(0));
  
  // Calculate tab width for 4 tabs
  const tabWidth = width / 4;
  
  // Handle tab change with animation
  const handleTabChange = (tab, index) => {
    setActiveTab(tab);
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      tension: 80,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Animated indicator */}
      <Animated.View 
        style={[
          styles.indicator,
          {
            transform: [{ translateX: translateValue }],
            width: tabWidth * 0.8, // Make indicator 80% of tab width
            left: tabWidth * 0.1, // Center the indicator (10% padding on each side)
          }
        ]} 
      />
      
      {/* Tab buttons */}
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => handleTabChange('Home', 0)}>
        <Image 
          source={homeIcon} 
          style={[styles.tabIcon, activeTab === 'Home' && styles.activeTabIcon]} 
        />
        <Text style={[
          styles.tabText, 
          activeTab === 'Home' && styles.activeTabText
        ]}>
          Home
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => handleTabChange('Team', 1)}>
        <Image 
          source={teamIcon} 
          style={[styles.tabIcon, activeTab === 'Team' && styles.activeTabIcon]} 
        />
        <Text style={[
          styles.tabText, 
          activeTab === 'Team' && styles.activeTabText
        ]}>
          Team
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => handleTabChange('Leaderboard', 2)}>
        <Image 
          source={leaderBoardIcon} 
          style={[styles.tabIcon, activeTab === 'Leaderboard' && styles.activeTabIcon]} 
        />
        <Text style={[
          styles.tabText, 
          activeTab === 'Leaderboard' && styles.activeTabText
        ]}>
          Leaderboard
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.tab}
        onPress={() => handleTabChange('Rewards', 3)}>
        <Image 
          source={rewardsIcon} 
          style={[styles.tabIcon, activeTab === 'Rewards' && styles.activeTabIcon]} 
        />
        <Text style={[
          styles.tabText, 
          activeTab === 'Rewards' && styles.activeTabText
        ]}>
          Rewards
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 65, // Increased from 60
    backgroundColor: '#45474b',
    position: 'relative',
    borderTopLeftRadius: 0, // Remove border radius
    borderTopRightRadius: 0, // Remove border radius
    width: '100%', // Ensure full width
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    height: 3, // Indicator height
    backgroundColor: '#F4CE14',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    zIndex: 1,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabText: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 2,
    fontFamily: 'Teko-Medium',
  },
  activeTabText: {
    color: '#fff',
  },
  tabIcon: {
    width: 28,
    height: 28,
    tintColor: '#ccc',
    resizeMode: 'contain',
  },
  activeTabIcon: {
    tintColor: '#fff',
  }
});

export default BottomNavBar; 