import React, {useState, useEffect} from 'react';
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
import useProfile from '../../hooks/useProfile';
import Input from '../../components/input/Input';
import Button from '../../components/buttons/Buttons';
import {updateProfile} from '../../redux/slices/authSlice';
import {useAppDispatch} from '../../hooks/useSelector';

export default function Profile() {
  const {user, handleUpdateProfile, handleImageSelect} = useProfile();
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setPhotoURL(user.photoURL || '');
    }
  }, [user]);

  const onUpdateProfile = () => {
    handleUpdateProfile(username, photoURL);
  };

  const getImage = async () => {
    const imageurl = await handleImageSelect();
    if (imageurl) {
      setPhotoURL(imageurl);
    }
    try {
      if (user?.username && imageurl) {
        dispatch(updateProfile({username: user?.username, photoURL: imageurl}));
      }
    } catch (error) {
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

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

          <TouchableOpacity
            style={styles.profileImageContainer}
            onPress={getImage}>
            {photoURL ? (
              <Image source={{uri: photoURL}} style={styles.profileImage} />
            ) : (
              <Text style={styles.placeholderText}>+</Text>
            )}
          </TouchableOpacity>

          <Input
            label="Username"
            value={username}
            onChangeText={text => setUsername(text)}
          />
          <Input
            label="Email"
            value={user.email || ''}
            editable={false}
            onChangeText={text => setUsername(text)}
          />

          <Button title="Update Profile" onPress={onUpdateProfile} />

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
