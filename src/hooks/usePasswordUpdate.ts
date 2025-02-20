import { useState } from 'react';
import auth from '@react-native-firebase/auth';

const usePasswordUpdate = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const user = auth().currentUser;

      if (!user || !user.email) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      // Reauthenticate user with their current password
      const credential = auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await user.reauthenticateWithCredential(credential);

      // Update password in Firebase Authentication
      await user.updatePassword(newPassword);

      console.log('Password updated successfully!');
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      console.error('Error updating password:', err);
      setError(err.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    error,
    loading,
    handleUpdatePassword,
  };
};

export default usePasswordUpdate;
