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
} from 'react-native';
import useProfile from '../../hooks/useProfile';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import {profileStyles} from '../../styles/profile';

export default function Profile() {
  const {
    user,
    handleUpdateProfile,
    handleImageSelect,
    localPhoto,
    setLocalPhoto,
  } = useProfile();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setLocalPhoto(user.photoURL || '');
    }
  }, [user]);

  const onUpdateProfile = () => {
    handleUpdateProfile(username, localPhoto);
  };

  const getImage = async () => {
    const imageUrl = await handleImageSelect();
    if (imageUrl) {
      setLocalPhoto(imageUrl);
    }
  };

  if (!user) {
    return (
      <View style={profileStyles.container}>
        <Text>Loading user data...</Text>
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={profileStyles.container}>
        <ScrollView
          contentContainerStyle={profileStyles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <Text style={profileStyles.title}>Profile Settings</Text>

          <TouchableOpacity
            style={profileStyles.profileImageContainer}
            onPress={getImage}>
            {localPhoto ? (
              <Image
                source={{uri: localPhoto}}
                style={profileStyles.profileImage}
              />
            ) : (
              <Text style={profileStyles.placeholderText}>+</Text>
            )}
          </TouchableOpacity>

          <Input label="Username" value={username} onChangeText={setUsername} />
          <Input
            label="Email"
            value={user.email || ''}
            editable={false}
            onChangeText={() => {}}
          />

          <Button
            title="Update Profile"
            onPress={onUpdateProfile}
            buttonStyle={profileStyles.button}
          />

          <View style={{height: 30}} />
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
