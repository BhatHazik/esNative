import React, { useState, memo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";

// List of country codes (you can replace or import this from a separate file)
const countryCodes = [
  { code: "+1", country: "United States" },
  { code: "+7", country: "Russia" },
  { code: "+20", country: "Egypt" },
  { code: "+27", country: "South Africa" },
  { code: "+30", country: "Greece" },
  { code: "+31", country: "Netherlands" },
  { code: "+32", country: "Belgium" },
  { code: "+33", country: "France" },
  { code: "+34", country: "Spain" },
  { code: "+36", country: "Hungary" },
  { code: "+39", country: "Italy" },
  { code: "+40", country: "Romania" },
  { code: "+41", country: "Switzerland" },
  { code: "+43", country: "Austria" },
  { code: "+44", country: "United Kingdom" },
  { code: "+45", country: "Denmark" },
  { code: "+46", country: "Sweden" },
  { code: "+47", country: "Norway" },
  { code: "+48", country: "Poland" },
  { code: "+49", country: "Germany" },
  { code: "+51", country: "Peru" },
  { code: "+52", country: "Mexico" },
  { code: "+53", country: "Cuba" },
  { code: "+54", country: "Argentina" },
  { code: "+55", country: "Brazil" },
  { code: "+56", country: "Chile" },
  { code: "+57", country: "Colombia" },
  { code: "+58", country: "Venezuela" },
  { code: "+60", country: "Malaysia" },
  { code: "+61", country: "Australia" },
  { code: "+62", country: "Indonesia" },
  { code: "+63", country: "Philippines" },
  { code: "+64", country: "New Zealand" },
  { code: "+65", country: "Singapore" },
  { code: "+66", country: "Thailand" },
  { code: "+81", country: "Japan" },
  { code: "+82", country: "South Korea" },
  { code: "+84", country: "Vietnam" },
  { code: "+86", country: "China" },
  { code: "+90", country: "Turkey" },
  { code: "+91", country: "India" },
  { code: "+92", country: "Pakistan" },
  { code: "+93", country: "Afghanistan" },
  { code: "+94", country: "Sri Lanka" },
  { code: "+95", country: "Myanmar" },
  { code: "+98", country: "Iran" },
  // … (add more codes as needed)
];

// Memoized list item to prevent unnecessary re-renders
const CountryListItem = memo(({ item, onSelect }) => (
  <TouchableOpacity
    style={styles.modalItem}
    onPress={() => onSelect(item.code)}
  >
    <Text style={styles.modalText}>
      {item.code} - {item.country}
    </Text>
  </TouchableOpacity>
));

const AppCountryInput = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  style,
  onChangeCode,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCode, setSelectedCode] = useState("+91");

  const handleSelectCode = (code) => {
    setSelectedCode(code);
    onChangeCode(code);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.countryContainer}
      >
        <Text style={styles.countryCode}>{selectedCode} ▼</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholderTextColor="rgba(245, 247, 248, 0.75)"
      />

      {/* Country Code Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <CountryListItem item={item} onSelect={handleSelectCode} />
              )}
              // Use getItemLayout if your items have fixed height (e.g., 50)
              getItemLayout={(data, index) => ({
                length: 50,
                offset: 50 * index,
                index,
              })}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#45474B",
    width: "100%",
    height: 65,
    paddingLeft: 15,
  },
  countryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  countryCode: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Teko-SemiBold",
  },
  input: {
    flex: 1,
    color: "#fff",
    fontFamily: "Teko-SemiBold",
    fontSize: 20,
    height: "100%",
    borderRadius: 0,
    // paddingTop: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    maxHeight: "50%",
  },
  modalItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    height: 50, // Fixed height for better performance with getItemLayout
  },
  modalText: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Teko-SemiBold",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#F4CE14",
    borderRadius: 5,
  },
  closeText: {
    color: "#45474B",
    fontSize: 20,
    fontFamily: "Teko-SemiBold",
  },
});

export default AppCountryInput;
