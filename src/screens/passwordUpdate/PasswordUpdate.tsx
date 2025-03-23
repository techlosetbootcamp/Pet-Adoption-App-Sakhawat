import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import usePasswordUpdate from '../../hooks/usePasswordUpdate';
import BackButton from '../../components/backbutton/BackButton';
import {passwordUpdateStyles} from '../../styles/passwordUpdate';

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
    <View style={passwordUpdateStyles.container}>
      <BackButton />

      <Text style={passwordUpdateStyles.title}>Update Password</Text>

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

      {error ? (
        <Text style={passwordUpdateStyles.errorText}>{error}</Text>
      ) : null}
      {loading ? <ActivityIndicator size="large" /> : null}
      <Button
        title="Update Password"
        onPress={handleUpdatePassword}
        disabled={loading}
        buttonStyle={passwordUpdateStyles.updateButton}
      />
    </View>
  );
}
