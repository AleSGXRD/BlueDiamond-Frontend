import { FormError } from "../types/forms/form-error";

export const FORM_ERROR_NAME: FormError[] =[
  {
    type:'maxlength',
    message: 'El Nombre debe ser menor o de 32 caracteres.'
  },
  {
    type:'minlength',
    message: 'El Nombre debe ser mayor o de 3 caracteres.'
  },
  {
    type:'required',
    message: 'El Nombre es requerido.'
  }
]
export const FORM_ERROR_PASSWORD: FormError[] =[
  {
    type:'maxlength',
    message: 'El Nombre debe ser menor o de 32 caracteres.'
  },
  {
    type:'minlength',
    message: 'El Nombre debe ser mayor o de 6 caracteres.'
  },
  {
    type:'required',
    message: 'El Nombre es requerido.'
  }
]

export const FORM_ERROR_CP: FormError[]=[
  {
    type: 'pattern',
    message: 'El formato del código postal es inválido.'
  },
  {
    type:'required',
    message: 'El Código postal es requerido.'
  }
]

export const FORM_ERROR_EMAIL: FormError[]=[
  {
    type: 'email',
    message: 'El formato de la dirección de correo es inválida.'
  },
  {
    type:'required',
    message: 'La dirección de correo es requerida.'
  }
]

export const FORM_ERROR_PHONE_NUMBER: FormError[]=[
  {
    type:'pattern',
    message:'El formato del número de teléfono es inválido.'
  }
]
