import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Ionicons from "react-native-vector-icons/Ionicons";

interface DropdownProps {
  label: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
  options: string[];
}


const Dropdown: React.FC<DropdownProps> = ({
  label,
  selectedValue,
  onValueChange,
  options,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerContainer}>
      <Picker
          selectedValue={selectedValue}
          onValueChange={(itemValue) => onValueChange(itemValue)}
          style={[
            styles.picker,
            { color: selectedValue ? "black" : "gray" }, 
          ]}
          dropdownIconColor="white" 
        >
          {options.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        <View style={styles.iconContainer} pointerEvents="none">
          <Ionicons name="chevron-down-outline" size={20} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  pickerContainer: {
    borderRadius: 5,
    borderBottomWidth: 2,
    borderColor: "black",
    paddingHorizontal: 10,
    position: "relative", 
  },
  picker: {
    height: 50,
    width: "100%",
  },
  iconContainer: {
    position: "absolute",
    right: 15, 
    top: "50%",
    marginTop: -10, 
  },
});

export default Dropdown;
