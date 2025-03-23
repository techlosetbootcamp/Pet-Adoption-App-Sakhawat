import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {addPet, selectPhoto} from '../../redux/slices/petSlice';
import {RootState} from '../../redux/store';
import Input from '../../components/input/Input';
import Dropdown from '../../components/dropdown/Dropdown';
import Button from '../../components/button/Button';
import BackButton from '../../components/backbutton/BackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {COLORS} from '../../constants/colors';
import {donateStyles} from '../../styles/donate';

const Donate: React.FC = () => {
  const dispatch = useAppDispatch();
  const [pet, setPet] = useState({
    name: '',
    age: '',
    type: '',
    breed: '',
    amount: '',
    vaccinated: true,
    userId: '',
    gender: '',
    weight: '',
    location: '',
    description: '',
    image: null as string | null,
  });

  const {status} = useAppSelector((state: RootState) => state.adoptedPet);

  const handleChange = (key: string, value: string) => {
    setPet(prevPet => ({...prevPet, [key]: value}));
  };

  const handleImagePicker = async () => {
    try {
      const response = await dispatch(selectPhoto()).unwrap();
      setPet(prevPet => ({...prevPet, image: response || null}));
    } catch (error) {
      Alert.alert('Image Upload Error');
      setPet(prevPet => ({...prevPet, image: null}));
    }
  };

  const handleDonate = async () => {
    if (status === 'loading') return;

    if (!pet.type || !pet.breed || !pet.amount || !pet.image) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    try {
      await dispatch(
        addPet({
          ...pet,
          age: Number(pet.age),
          amount: Number(pet.amount),
          weight: Number(pet.weight),
          image: pet.image || '',
          userId: pet.userId,
        }),
      ).unwrap();

      ToastAndroid.show('Pet donated successfully!', ToastAndroid.LONG);
      setPet({
        name: '',
        age: '',
        type: '',
        breed: '',
        amount: '',
        userId: '',
        vaccinated: true,
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
    <ScrollView contentContainerStyle={donateStyles.container}>
      <BackButton />

      <Input
        label="Pet Name"
        value={pet.name}
        onChangeText={value => handleChange('name', value)}
      />
      <Input
        label="Pet Age"
        value={pet.age}
        keyboardType="numeric"
        onChangeText={value => handleChange('age', value)}
      />

      <Dropdown
        label="Pet Type"
        selectedValue={pet.type}
        onValueChange={value => handleChange('type', value)}
        options={['Dog', 'Cat', 'Bird', 'Bunny', 'Turtle']}
      />

      <Input
        label="Pet Breed"
        value={pet.breed}
        onChangeText={value => handleChange('breed', value)}
      />
      <Input
        label="Amount"
        value={pet.amount}
        keyboardType="numeric"
        onChangeText={value => handleChange('amount', value)}
      />

      <Dropdown
        label="Vaccinated"
        selectedValue={pet.vaccinated ? 'Yes' : 'No'}
        onValueChange={value => handleChange('vaccinated', value)}
        options={['Yes', 'No']}
      />

      <Dropdown
        label="Gender"
        selectedValue={pet.gender}
        onValueChange={value => handleChange('gender', value)}
        options={['Male', 'Female']}
      />

      <Input
        label="Weight"
        value={pet.weight}
        keyboardType="numeric"
        onChangeText={value => handleChange('weight', value)}
      />
      <Input
        label="Location"
        value={pet.location}
        onChangeText={value => handleChange('location', value)}
      />
      <Input
        label="Description"
        value={pet.description}
        multiline
        onChangeText={value => handleChange('description', value)}
      />

      <TouchableOpacity
        onPress={handleImagePicker}
        style={donateStyles.uploadBox}>
        {pet.image ? (
          <Image source={{uri: pet.image}} style={donateStyles.uploadedImage} />
        ) : (
          <View style={donateStyles.uploadPlaceholder}>
            <Ionicons name="image-outline" size={40} color={COLORS.black} />
            <Text style={donateStyles.uploadText}>Upload Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <Button
        buttonStyle={{
          backgroundColor: COLORS.black,
          width: '100%',
        }}
        title={status === 'loading' ? 'Processing...' : 'Donate'}
        onPress={handleDonate}
        disabled={status === 'loading'}
      />
    </ScrollView>
  );
};

export default Donate;
