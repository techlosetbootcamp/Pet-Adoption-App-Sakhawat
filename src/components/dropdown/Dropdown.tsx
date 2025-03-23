import React from 'react';
import {View, Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {DropDwonStyles} from '../../styles/DropDown';

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
    <View style={DropDwonStyles.container}>
      <Text style={DropDwonStyles.label}>{label}</Text>
      <View style={DropDwonStyles.pickerContainer}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={itemValue => onValueChange(itemValue)}
          style={[
            DropDwonStyles.picker,
            {color: selectedValue ? COLORS.black : COLORS.gray},
          ]}
          dropdownIconColor={COLORS.white}>
          {options?.map(option => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>
        <View style={DropDwonStyles.iconContainer} pointerEvents="none">
          <Ionicons
            name="chevron-down-outline"
            size={20}
            color={COLORS.black}
          />
        </View>
      </View>
    </View>
  );
};

export default Dropdown;
