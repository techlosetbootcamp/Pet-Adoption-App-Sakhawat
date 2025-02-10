

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   ScrollView,
//   Image,
//   Alert,
// } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import { useDispatch, useSelector } from 'react-redux';
// import { addPet, selectPhoto } from '../../redux/slices/petDonationSlice';
// import { AppDispatch, RootState } from '../../redux/store';
// import Button from '../../components/buttons/Buttons';

// const Donate: React.FC = () => {
  
//   const dispatch = useDispatch<AppDispatch>();
//   const [pet, setPet] = useState<{
//     name: string;
//     age: number; // Age in months
//     type: string;
//     breed: string;
//     amount: number; // Amount in dollars
//     vaccinated: boolean;
//     gender: string;
//     weight: number;
//     location: string;
//     description: string;
//     image: string | null;
//     date: Date;
//   }>({
//     name: '',
//     age: 0, // Initial value for pet age in months
//     type: '',
//     breed: '',
//     amount: 0, // Initial value for amount in dollars
//     vaccinated: false,
//     gender: '',
//     weight: 0,
//     location: '',
//     description: '',
//     image: null,
//     date: new Date(),
//   });

//   const { status } = useSelector((state: RootState) => state.petDonation);

//   const handleChange = (key: string, value: string | number | boolean) => {
//     setPet((prevPet) => ({ ...prevPet, [key]: value }));
//   };

//   const handleImageUpload = async () => {
//     try {
//       const response = await dispatch(selectPhoto()).unwrap();
//       setPet((prevPet) => ({
//         ...prevPet,
//         image: response || null,
//       }));
//     } catch (error) {
//       Alert.alert('Image Upload Error');
//       setPet((prevPet) => ({
//         ...prevPet,
//         image: null,
//       }));
//     }
//   };

//   const handleDonate = async () => {
//     if (status === 'loading') return;

//     if (!pet.name || !pet.age || !pet.type || !pet.breed || !pet.amount || !pet.image) {
//       Alert.alert('Missing Fields', 'Please fill in all required fields.');
//       return;
//     }

//     try {
//       await dispatch(addPet(pet)).unwrap();
//       Alert.alert('Success', 'Pet donated successfully!');
//       setPet({
//         name: '',
//         age: 0,
//         type: '',
//         breed: '',
//         amount: 0,
//         vaccinated: false,
//         gender: '',
//         weight: 0,
//         location: '',
//         description: '',
//         image: null,
//         date: new Date(),
//       });
//     } catch (err) {
//       Alert.alert('Error', 'Failed to donate pet. Please try again.');
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Donate</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Name</Text>
//         <TextInput
//           style={styles.input}
//           value={pet.name}
//           onChangeText={(value) => handleChange('name', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Age (Months)</Text>
//         <TextInput
//           style={styles.input}
//           value={pet.age.toString()}
//           onChangeText={(value) => handleChange('age', Number(value))}
//           keyboardType="numeric"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Type</Text>
//         <Picker
//           selectedValue={pet.type}
//           onValueChange={(value) => handleChange('type', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select Type" value="" />
//           <Picker.Item label="Dog" value="Dog" />
//           <Picker.Item label="Cat" value="Cat" />
//           <Picker.Item label="Bird" value="Bird" />
//           <Picker.Item label="Bunny" value="Bunny" />
//           <Picker.Item label="Goat" value="Goat" />
//         </Picker>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Breed</Text>
//         <TextInput
//           style={styles.input}
//           value={pet.breed}
//           onChangeText={(value) => handleChange('breed', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Amount ($)</Text>
//         <TextInput
//           style={styles.input}
//           value={pet.amount.toString()}
//           onChangeText={(value) => handleChange('amount', Number(value))}
//           keyboardType="numeric"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Vaccinated</Text>
//         <Picker
//           selectedValue={pet.vaccinated.toString()}
//           onValueChange={(value) =>
//             handleChange('vaccinated', value === 'true')
//           }
//           style={styles.picker}
//         >
//           <Picker.Item label="Select" value="" />
//           <Picker.Item label="Yes" value="true" />
//           <Picker.Item label="No" value="false" />
//         </Picker>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Gender</Text>
//         <Picker
//           selectedValue={pet.gender}
//           onValueChange={(value) => handleChange('gender', value)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Select" value="" />
//           <Picker.Item label="Male" value="Male" />
//           <Picker.Item label="Female" value="Female" />
//         </Picker>
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Weight (KG)</Text>
//         <TextInput
//           style={styles.input}
//           value={pet.weight.toString()}
//           onChangeText={(value) => handleChange('weight', Number(value))}
//           keyboardType="numeric"
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Location</Text>
//         <TextInput
//           style={styles.input}
//           value={pet.location}
//           onChangeText={(value) => handleChange('location', value)}
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Description</Text>
//         <TextInput
//           style={styles.input}
//           value={pet.description}
//           onChangeText={(value) => handleChange('description', value)}
//           multiline
//         />
//       </View>

//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Pet Image</Text>
//         <Button title="Upload Image" onPress={handleImageUpload} />
//         {pet.image && (
//           <Image source={{ uri: pet.image }} style={styles.imagePreview} />
//         )}
//       </View>

//       <Button
//         title={status === 'loading' ? 'Processing...' : 'Donate'}
//         onPress={handleDonate}
//         disabled={status === 'loading'}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//   },
//   picker: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//   },
//   imagePreview: {
//     width: '100%',
//     height: 200,
//     marginTop: 10,
//     borderRadius: 5,
//   },
// });

// export default Donate;
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
            <Ionicons name="cloud-upload-outline-" size={40} color="black" />
            <Text style={styles.uploadText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Button title={status === 'loading' ? 'Processing...' : 'Donate'} onPress={handleDonate} disabled={status === 'loading'} />
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
    borderColor: '#ccc',
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
