export interface Api {
  isEdit: boolean;
  isSelected: boolean;
  name: String;
  picture: any;
  phone: Number;
  email: String;
  location: String;
}

export const UserSchema = {
  isSelected: 'isSelected',
  name: 'text',
  email: 'text',
  phone: 'text',
  isEdit: 'isEdit',
};

export class Api2 {
  name: string;
  phone?: number;
  picture: any;
  email: string;
  location: string;

  constructor(
    phone: number,
    name: string = '',
    email: string = '',
    location: string = ''
  ) {
    this.phone = phone;
    this.name = name;
    this.email = email;
    this.location = location;
  }
}
