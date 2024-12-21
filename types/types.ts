export type Character = {
  name: string;
  birthday: string;
  description: string;
};

export type ApiResponse = {
  title_name: string;
  characters: Character[];
};

export type IcalFile = {
  name: string;
  content: string;
};
