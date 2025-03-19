
export interface Payload{
  id:number;
  name: string;
}
export interface AuthRepsonse{
  payload:Payload,
  token:string
}
