export type User= {
    uid: string;
    favorites: string[];
    username?: string;
    photoURL?: string;
    email?: string;
    location?: string;
  }
  export type userData= {
    uid: string;
    username: string;
    email: string | null;
    photoURL: string;
    favorites: string[];
}