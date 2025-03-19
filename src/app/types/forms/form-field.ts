import { ApiService } from "../../services/apis/api.service";
import { FormError } from "./form-error";
import { FormApiPorperties, FormSelectOption } from "./form-select-option";

export interface FormField{
  type: FormFieldType;
  formControlName: string;
  name:string;
  placeholder?:string;
  value?:any;

  //Errores que pueden salir
  errors? : FormError[];

  //Api para obtener los datos de la tabla directamente en el input
  apiService? : ApiService;
  formApiProperties? : FormApiPorperties;

  //Opciones para los select y multiple select
  //Si no se asignan una api al input, para que tenga datos hay q asignarlo a las options
  options? : FormSelectOption[]

  //Condiciones para que el Input aparezca
  condition? : FormCondition

  //FormControlName del que va a consumir
  //Esto es un caso especial solo para los input de tipo SERVICE_ITEM
  formControlNameLinked? : string;
  inputEmitter? : boolean;
}
export interface FormCondition{
  controlName : string,
  value : any,
}
export enum FormFieldType{
  TEXT=0,
  TEXTAREA =1,
  SELECT=2,
  NUMBER=3,
  BOOLEAN=4,
  EMAIL=5,
  PHONE_NUMBER=6,
  SELECT_MULTIPLE=7,
  DATE=8,
  DATETIME=9,
  SERVICE_ITEM=10,
  DAYSOFWEEK=11,
  PASSWORD=12,
}
