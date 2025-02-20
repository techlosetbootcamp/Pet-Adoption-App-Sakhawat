// Define the Pet type
export type Pet = {
  id: string; // Unique identifier for the pet
  name: string; // Name of the pet
  breed: string; // Breed of the pet (e.g., Labrador Retriever, Persian)
  age: number; // Age of the pet in months or years
  amount: number; // Price or adoption fee for the pet
  location: string; // Location of the pet (e.g., city, state)
  image: string;
   // URL or path to the pet's image
  type: string; // Type of pet (e.g., Dog, Cat, Bird)
  gender?: string; // Optional: Gender of the pet (e.g., Male, Female)
  description?: string; // Optional: Description of the pet
  weight?: number; // Optional: Weight of the pet in kilograms or pounds
  vaccinated?: boolean; // Optional: Whether the pet is vaccinated
  userName?: string;
  userId:string; // Optional: Name of the user who owns or listed the pet
};

// Define a type for the list of pets

// Define a type for the filters (e.g., All, Dog, Cat)

