export const GET_PET_DETAILS_LIST = (pet: {
  age: number;
  gender: string;
  weight: number;
  vaccinated: boolean;
}) => [
  {label: 'Age', value: `${pet.age} months`},
  {label: 'Gender', value: pet.gender},
  {label: 'Weight', value: `${pet.weight} kg`},
  {label: 'Vaccine', value: pet.vaccinated ? 'Yes' : 'No'},
];
