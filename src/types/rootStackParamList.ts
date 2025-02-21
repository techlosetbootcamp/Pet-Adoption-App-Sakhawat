export type RootStackParamList = {
    MainApp: undefined;
    Login: undefined;
    RecoverPassword: undefined;
    SignUp: undefined;
    PetDetails: { petId: string };  // Ensure petId is always a string

  };