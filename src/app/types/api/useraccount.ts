import { Rol } from "./rol";

export interface Useraccount{
  userId? : number;
  rolId : number;
  name : string;
  password : string;

  rol?: Rol;
}
