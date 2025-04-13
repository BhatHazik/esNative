import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
} from 'react-native';
import Toast from 'react-native-toast-message';
import Navbar from '../Components/Navbar';
import ProfileDrawer from '../Components/ProfileDrawer';
import BottomNavBar from '../Components/BottomNavBar';
import userIcon from '../Assets/user.png'; // Same user icon as in Navbar
import bermuda from '../Assets/images/squad.png';

const {width} = Dimensions.get('window');

const UserDashboard = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('UPCOMING');

  // Create animated value for tab slider
  const [translateValue] = useState(new Animated.Value(0));

  // Calculate tab width - for 3 tabs
  const tabWidth = (width - 32) / 3; // account for container padding

  // Handle tab change with animation
  const handleTabChange = (tab, index) => {
    setActiveTab(tab);
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      tension: 70,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  // Get dynamic border radius based on active tab
  const getSliderStyle = () => {
    let borderRadiusStyle = {};

    if (activeTab === 'UPCOMING') {
      borderRadiusStyle = {
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 0,
      };
    } else if (activeTab === 'PLAYED') {
      borderRadiusStyle = {
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
      };
    } else if (activeTab === 'MISSED') {
      borderRadiusStyle = {
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 0,
      };
    }

    return {
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      backgroundColor: '#000',
      width: tabWidth,
      transform: [{translateX: translateValue}],
      zIndex: 0,
      ...borderRadiusStyle,
    };
  };

  useEffect(() => {
    console.log('Drawer visible state changed to:', drawerVisible);
  }, [drawerVisible]);

  const handleProfilePress = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <>
      <Navbar
        // backgroundColor="#45474b"
        backgroundColor="#fff"
        ticketCount={16}
        onTicketPress={() =>
          Toast.show({type: 'info', text1: 'Tickets Clicked'})
        }
        onProfilePress={handleProfilePress}
      />
      <ProfileDrawer visible={drawerVisible} onClose={handleCloseDrawer} />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Score Section */}
          <View style={styles.scoreSection}>
            <Text style={styles.scoreTitle}>Your Score</Text>
            <View style={styles.scoreContainer}>
              <Text style={styles.scoreValue}>560 P</Text>
            </View>
          </View>

          {/* Team Work and Player Progress Card */}
          <View style={styles.teamWorkCard}>
            <View style={styles.cardContent}>
              <View style={styles.teamWorkSide}>
                <Text style={styles.teamWorkLabel}>Team Work</Text>
                <Text style={styles.teamWorkScore}>3560 P</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.playerProgressSide}>
                <Text style={styles.playerProgressLabel}>Player Progress</Text>
                <View style={styles.playersList}>
                  <PlayerRow name="Hero Hill" score="120" />
                  <PlayerRow name="Adrian Angel" score="75" />
                  <PlayerRow name="Haziq Hillal" score="205" />
                  <PlayerRow name="Sabir Dar" score="80" />
                </View>
              </View>
            </View>
          </View>

          {/* Team Mates Section */}
          <View style={styles.TeamMatesContainer}>
            {/* Tab Section */}
            <View style={styles.tabContainer}>
              <Text style={styles.sectionTitle}>TEAM Mates</Text>
            </View>

            {/* Connected Card Section */}
            <View style={styles.matesContainer}>
              <TeamMateItem name="REX HAZIQ" position="TEAM LEADER" />
              <TeamMateItem name="REX SAHIL" position="DEFENDER" />
              <TeamMateItem name="REX TAYLAN" position="SNIPER" />
              <TeamMateItem isAddButton={true} />
            </View>
          </View>

          {/* Matches Section */}
          <Text style={styles.matchesTitle}>MATCHES</Text>
          <View style={styles.matchesContainer}>
            <View style={styles.tabsContainer}>
              {/* Animated slider with dynamic border radius */}
              <Animated.View style={getSliderStyle()} />

              {/* Tab buttons */}
              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabChange('UPCOMING', 0)}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'UPCOMING' && styles.activeTabText,
                  ]}>
                  UPCOMING
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabChange('PLAYED', 1)}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'PLAYED' && styles.activeTabText,
                  ]}>
                  PLAYED
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.tab}
                onPress={() => handleTabChange('MISSED', 2)}>
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'MISSED' && styles.activeTabText,
                  ]}>
                  MISSED
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.matchCard}>
              <View style={styles.matchCardContent}>
                <Image source={bermuda} style={styles.matchImage} />
                <View style={styles.topMatchCard}>
                  <Text style={styles.matchTypeLabel}>BATTLE ARENA</Text>
                  <Text style={styles.matchTypeLabel}>05-07-2024</Text>
                </View>

                <View style={styles.matchDetailsContainer}>
                  <View>
                    <View style={styles.matchDetailRow}>
                      <Text style={styles.matchDetailLabel}>MAP</Text>
                      <View
                        style={{position: 'relative', alignSelf: 'flex-start'}}>
                        <Text style={styles.matchDetailValue}>Bermuda</Text>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 2, // adjust this value
                            left: 10,
                            right: 0,
                            height: 2,
                            backgroundColor: '#F4CE14',
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.matchDetailRow}>
                      <Text style={styles.matchDetailLabel}>PLAYERS</Text>
                      <View
                        style={{position: 'relative', alignSelf: 'flex-start'}}>
                        <Text style={styles.matchDetailValue}>48</Text>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 2, // adjust this value
                            left: 10,
                            right: 0,
                            height: 2,
                            backgroundColor: '#F4CE14',
                          }}
                        />
                      </View>
                    </View>
                    <View style={styles.matchDetailRow}>
                      <Text style={styles.matchDetailLabel}>To Win</Text>
                      <View
                        style={{position: 'relative', alignSelf: 'flex-start'}}>
                        <Text style={styles.matchDetailValue}>Booyah</Text>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 2, // adjust this value
                            left: 10,
                            right: 0,
                            height: 2,
                            backgroundColor: '#F4CE14',
                          }}
                        />
                      </View>
                    </View>
                  </View>

                  <View>
                    <View style={styles.matchDetailRow}>
                      <Text style={styles.matchDetailLabel}>TIME</Text>
                      <View
                        style={{position: 'relative', alignSelf: 'flex-start'}}>
                        <Text style={styles.matchDetailValue}>5:00 PM</Text>
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 2, // adjust this value
                            left: 10,
                            right: 0,
                            height: 2,
                            backgroundColor: '#F4CE14',
                          }}
                        />
                      </View>
                    </View>
                    <TouchableOpacity style={styles.joinButton}>
                      <Text style={styles.joinButtonText}>
                      GO TO UPCOMMING
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* Bottom Navigation Bar - Placed outside container to have full width */}
      <BottomNavBar />
    </>
  );
};

// Helper Components
const PlayerRow = ({name, score}) => (
  <View style={styles.playerRow}>
    <Text style={styles.playerName}>{name}</Text>
    <Text style={styles.playerScore}>{score} P</Text>
  </View>
);

const TeamMateItem = ({name, position, isAddButton = false}) => (
  <TouchableOpacity style={styles.teamMateItem}>
    {isAddButton ? (
      <View style={styles.addButtonContainer}>
        <Text style={styles.teamMateName}>ADD MEMBER</Text>
        <Text style={styles.addButtonPlus}>+</Text>
      </View>
    ) : (
      <>
        <View style={styles.teamMateDetails}>
          <Text style={styles.teamMateName}>{name}</Text>
          <Text
            style={[
              styles.teamMatePosition,
              position === 'TEAM LEADER'
                ? styles.leaderPosition
                : styles.regularPosition,
            ]}>
            {position}
          </Text>
        </View>
        <Image source={userIcon} style={styles.profileIcon} />
      </>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 0, // Remove bottom padding to accommodate BottomNavBar
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreTitle: {
    fontSize: 35,
    color: '#45474B',
    fontFamily: 'Teko-Medium',
    letterSpacing: -1,
    marginLeft: 2,
  },
  scoreContainer: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  scoreValue: {
    color: '#F4CE14',
    fontSize: 23,
    fontFamily: 'Teko-Medium',
    paddingTop: 4,
  },
  teamWorkCard: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 13,
    marginBottom: 20,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
  },
  teamWorkSide: {
    flex: 1,
    paddingRight: 16,
  },
  teamWorkLabel: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 13,
    fontFamily: 'Teko-Medium',
    // letterSpacing:-1
  },
  teamWorkScore: {
    fontSize: 38,
    color: '#F4CE14',
    fontFamily: 'Teko-Medium',
    letterSpacing: -1,
  },
  divider: {
    width: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 8,
  },
  playerProgressSide: {
    flex: 1.5,
    paddingLeft: 16,
  },
  playerProgressLabel: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 10,
    fontFamily: 'Teko-Medium',
  },
  playersList: {
    flex: 1,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  playerName: {
    fontSize: 13,
    color: '#fff',
    fontFamily: 'Teko-Medium',
  },
  playerScore: {
    fontSize: 13,
    color: '#F4CE14',
    fontFamily: 'Teko-Medium',
  },
  TeamMatesContainer: {
    width: '100%', // overall container width (adjust as needed)
    alignSelf: 'center',
    // backgroundColor: '#f3f3f3', // card background color
    borderRadius: 10,
    overflow: 'hidden', // clips children so the rounded corners work
  },
  tabContainer: {
    alignSelf: 'flex-start', // width adjusts to the content width
    backgroundColor: '#D9D9D9', // tab background color (customize as needed)
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderTopRightRadius: 10, // rounds the corner where tab meets card
  },
  sectionTitle: {
    fontSize: 17,
    color: '#45474B',
    whiteSpace: 'nowrap',
    paddingTop: 5,
    fontFamily: 'Teko-Medium',
    letterSpacing: -0.5,
    alignSelf: 'center',
    // marginVertical:5
  },
  matchesTitle: {
    fontSize: 23,
    color: '#45474B',
    whiteSpace: 'nowrap',
    paddingTop: 5,
    fontFamily: 'Teko-Medium',
    letterSpacing: -0.5,
    alignSelf: 'center',
    marginVertical: 5,
    // marginVertical:5
  },

  matesContainer: {
    backgroundColor: '#D9D9D9',
    padding: 10,
    paddingVertical: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
  },
  teamMateItem: {
    width: '45%',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    height: 30,
    width: 30,
    borderRadius: 18,
    resizeMode: 'cover',
  },
  teamMateDetails: {
    flex: 1,
  },
  teamMateName: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Teko-Medium',
  },
  teamMatePosition: {
    fontSize: 12,
    fontFamily: 'Teko-Medium',
  },
  leaderPosition: {
    color: '#F4CE14',
  },
  regularPosition: {
    color: '#CACACA',
  },
  addButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  addButtonPlus: {
    fontSize: 20,
    color: '#FFC107',
    fontFamily: 'Teko-Medium',
  },
  addButtonText: {
    fontSize: 12,
    color: '#777',
    fontFamily: 'Teko-Medium',
  },
  matchesContainer: {
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    // borderWidth: 1,
  },
  topMatchCard: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    paddingTop: 3,
    paddingHorizontal: 10,

    // backgroundColor:"blue",
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 33,
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  tabText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Teko-Medium',
  },
  activeTabText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Teko-Medium',
  },
  slider: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#000',
    zIndex: 0,
  },
  matchCard: {
    padding: 10,
  },
  matchCardContent: {
    padding: 5,
    backgroundColor: '#45474B',
    borderRadius: 10,
    position: 'relative',
    overflow: 'hidden',
    height: 160,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  matchImage: {
    position: 'absolute',
    height: '110%',
    width: '110%',
    opacity: 0.5,
  },
  matchTypeLabel: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'Teko-Medium',
  },
  matchDate: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '600',
    // marginTop: 4,
    marginBottom: 12,
    fontFamily: 'Teko',
  },
  matchDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor:"blue",
    padding: 10,
    paddingBottom: 0,
  },
  matchDetailRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },
  matchDetailLabel: {
    fontSize: 19,
    color: '#fff',
    width: 60,
    fontFamily: 'Teko-Medium',
  },
  matchDetailValue: {
    fontSize: 19,
    // fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'Teko-Medium',
    marginLeft:10
    // backgroundColor:"blue"
  },
  joinButton: {
    backgroundColor: '#F4CE14',
    color:"#fff",
    paddingVertical: 8,
    paddingHorizontal: 10,
    paddingBottom:5,
    borderRadius: 10,
    marginTop: 8,
    alignSelf:"flex-end"
  },
  joinButtonText: {
    // color: '#333',
    fontSize: 19,
    // fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Teko-Medium',
  },
});

export default UserDashboard;
