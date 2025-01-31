// PasswordUpdate.tsx
import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Input from '../../components/input/Input'; // Import Input component
import Button from '../../components/buttons/Buttons'; // Import Button component
import auth from '@react-native-firebase/auth'; // Import Firebase Auth
import { useSelector, useDispatch } from 'react-redux';
import { updateUserPassword } from '../../redux/slices/userSlice'; // Redux action for updating password in store

export default function PasswordUpdate() {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user); // Assuming user is stored in auth slice
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      const userCredential = auth().currentUser;

      if (!userCredential) {
        setError('User is not authenticated');
        return;
      }

      // Reauthenticate the user with their current password
      const credential = auth.EmailAuthProvider.credential(
        userCredential.email!,
        currentPassword
      );

      await userCredential.reauthenticateWithCredential(credential);

      // Update password in Firebase Auth
      await userCredential.updatePassword(newPassword);

      // Update password in Firestore (if needed) or Redux store
      dispatch(updateUserPassword(newPassword));

      console.log('Password updated successfully!');
      setError('');
      // Optionally navigate or show a success message
    } catch (err: any) {
      console.error('Error updating password:', err);
      setError('Failed to update password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Password</Text>

      <Input
        label="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        secureTextEntry
      />

      <Input
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <Input
        label="Confirm New Password"
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
        secureTextEntry
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <Button title="Update Password" onPress={handleUpdatePassword} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});
