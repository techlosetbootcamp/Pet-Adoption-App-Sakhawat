export interface PetData {
    id: string;
    type: string;
    breed: string;
    amount: number;
    vaccinated: boolean;
    gender: string;
    weight: number;
    location: string;
    description: string;
    image: string | null;
    date: Date;
  }
  export type fireError = {
    response?: {
      data: string;
    };
    message: string;
  };
  export type ProfileState = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  };