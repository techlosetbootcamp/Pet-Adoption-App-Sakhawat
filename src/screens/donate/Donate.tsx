import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Alert, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPet, selectPhoto } from '../../redux/slices/petDonationSlice';
import { AppDispatch, RootState } from '../../redux/store';
import Input from '../../components/input/Input';
import Dropdown from '../../components/input/Dropdown';
import Button from '../../components/buttons/Buttons';
import  Picker  from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Donate: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [pet, setPet] = useState({
    name: '',
    age: '',
    type: '',
    breed: '',
    amount: '',
    vaccinated: '',
    gender: '',
    weight: '',
    location: '',
    description: '',
    image: null as string | null,
  });

  const { status } = useSelector((state: RootState) => state.petDonation);

  const handleChange = (key: string, value: string) => {
    setPet((prevPet) => ({ ...prevPet, [key]: value }));
  };

  

  const handleImagePicker = async () => {
    try {
      const response = await dispatch(selectPhoto()).unwrap();
      setPet((prevPet) => ({ ...prevPet, image: response || null }));
    } catch (error) {
      Alert.alert('Image Upload Error');
      setPet((prevPet) => ({ ...prevPet, image: null }));
    }
  };

  const handleDonate = async () => {
    if (status === 'loading') return;
  
    if (!pet.type || !pet.breed || !pet.amount || !pet.image) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }
  
    try {
      await dispatch(addPet({
        ...pet,
        age: Number(pet.age),
        amount: Number(pet.amount),
        weight: Number(pet.weight),
        image: pet.image || '',
        photoURL: pet.image || '', // Add this line
      })).unwrap();
  
      Alert.alert('Success', 'Pet donated successfully!');
      setPet({
        name: '',
        age: '',
        type: '',
        breed: '',
        amount: '',
        vaccinated: '',
        gender: '',
        weight: '',
        location: '',
        description: '',
        image: null,
      });
    } catch (err) {
      Alert.alert('Error', 'Failed to donate pet. Please try again.');
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input label="Pet Name" value={pet.name} onChangeText={(value) => handleChange('name', value)} />
      <Input label="Pet Age" value={pet.age} keyboardType="numeric" onChangeText={(value) => handleChange('age', value)} />

      <Dropdown
        label="Pet Type"
        selectedValue={pet.type}
        onValueChange={(value) => handleChange('type', value)}
        options={["Dog", "Cat", "Bird", "Bunny", "Turtle"]}
      />

      <Input label="Pet Breed" value={pet.breed} onChangeText={(value) => handleChange('breed', value)} />
      <Input label="Amount" value={pet.amount} keyboardType="numeric" onChangeText={(value) => handleChange('amount', value)} />

      <Dropdown
        label="Vaccinated"
        selectedValue={pet.vaccinated}
        onValueChange={(value) => handleChange('vaccinated', value)}
        options={["Yes", "No"]}
      />

      <Dropdown
        label="Gender"
        selectedValue={pet.gender}
        onValueChange={(value) => handleChange('gender', value)}
        options={["Male", "Female"]}
      />

      <Input label="Weight" value={pet.weight} keyboardType="numeric" onChangeText={(value) => handleChange('weight', value)} />
      <Input label="Location" value={pet.location} onChangeText={(value) => handleChange('location', value)} />
      <Input label="Description" value={pet.description} multiline onChangeText={(value) => handleChange('description', value)} />
      
      {/* Image Upload Box */}
      <TouchableOpacity onPress={handleImagePicker} style={styles.uploadBox}>
        {pet.image ? (
          <Image source={{ uri: pet.image }} style={styles.uploadedImage} />
        ) : (
          <View style={styles.uploadPlaceholder}>
<Ionicons name="image-outline" size={40} color="black" />
<Text style={styles.uploadText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Button buttonStyle={{
              backgroundColor: '#101C1D',
              width: "100%",
            }} title={status === 'loading' ? 'Processing...' : 'Donate'} onPress={handleDonate} disabled={status === 'loading'} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  uploadBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
    width: '100%',
  },
  uploadedImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  uploadPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
  },
  uploadText: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
});

export default Donate;
