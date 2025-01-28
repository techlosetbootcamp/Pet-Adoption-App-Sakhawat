import { View, StyleSheet } from 'react-native';
import React from 'react';
import Button from '../../components/buttons/Buttons'; // Import the Button component
import auth from '@react-native-firebase/auth'; // Firebase Auth for logging out
import { useNavigation, CommonActions } from '@react-navigation/native'; // To navigate to the login screen

export default function Logout() {
  const navigation = useNavigation(); // Use the navigation hook to navigate

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Sign out the current user from Firebase
      console.log('User logged out successfully.');

      // Navigate to the login screen after logout
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }], // Reset navigation stack and go to the Login screen
        })
      );
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Log Out"
        onPress={handleLogout} // Trigger the logout function on button press
        buttonStyle={styles.buttonStyle}
        textStyle={styles.buttonText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: '#FF6347', // Red button for logout
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
