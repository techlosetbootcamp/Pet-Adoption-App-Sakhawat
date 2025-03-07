import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  
} from 'react-native';
import Input from '../../components/input/Input';
import Button from '../../components/button/Buttons';
import usePasswordUpdate from '../../hooks/usePasswordUpdate';
import BackButton from '../../components/back/BackButton';

export default function PasswordUpdate() {
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    error,
    loading,
    handleUpdatePassword,
  } = usePasswordUpdate();

  return (

      <View style={styles.container}>
      <BackButton  />
      
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
        {loading ? <ActivityIndicator size="large" color="blue" /> : null}

        <Button
          title="Update Password"
          onPress={handleUpdatePassword}
          disabled={loading}
          buttonStyle={{    position: "absolute",
            bottom: 30,
          width:"100%"}}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  
  errorText: {
    marginBottom: 15,
  },
 
});
