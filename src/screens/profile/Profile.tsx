import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {updateUser} from '../../redux//slices/userSlice';
import firestore from '@react-native-firebase/firestore';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Buttons';
import {launchImageLibrary} from 'react-native-image-picker'; // Import Image Picker

interface RootState {
  auth: {
    user: {
      photoURL: string;
      username: string;
      email: string;
    } | null;
  };
}

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [username, setUsername] = useState(user?.username || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || ''); // State for photo URL

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  const handleUpdateProfile = async () => {
    const userId = auth().currentUser?.uid;

    if (userId) {
      try {
        // 1. Update Firebase Authentication username (optional)
        await auth().currentUser?.updateProfile({
          displayName: username,
          photoURL, // Update photo URL in Firebase Auth
        });

        // 2. Update Firestore document with the new username and photo URL
        await firestore()
          .collection('users')
          .doc(userId)
          .update({
            username,
            photoURL, // Update photo URL in Firestore
          });

        // Dispatch action to update Redux state
        dispatch(updateUser({ username, photoURL }));

        console.log('Profile updated successfully!');
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    } else {
      console.error('No current user found');
    }
  };

  const handleImageSelect = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.error('Image picker error: ', response.errorMessage);
      } else {
        if (response.assets && response.assets.length > 0) {
          const source = response.assets[0].uri; // Get the image URI
          if (source) {
            setPhotoURL(source); // Update photo URL in the local state
          } else {
            console.error('Image URI is undefined');
          }
        } else {
          console.error('No assets found in the response');
        }
      }
    });
  };

  console.log(user.photoURL)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Profile Settings</Text>

          {/* Profile Image */}
          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={handleImageSelect}>
            {photoURL ? (
              <Image source={{uri: photoURL}} style={styles.profileImage} />
            ) : (
              <Text style={styles.placeholderText}>+</Text>
            )}
          </TouchableOpacity>

          {/* Input Fields */}
          <Input
            label="Username"
            value={username}
            editable={true}
            onChangeText={setUsername}
          />
          <Input
            label="Email"
            value={user.email}
            editable={false}
            onChangeText={() => {}}
          />

          {/* Update Profile Button */}
          <Button title="Update Profile" onPress={handleUpdateProfile} />

          <View style={{height: 30}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  placeholderText: {
    color: 'gray',
    fontSize: 24,
  },
});
