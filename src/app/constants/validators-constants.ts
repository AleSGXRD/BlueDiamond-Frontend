import { Validators } from "@angular/forms";

export const VALIDATORS_NAME = [Validators.required, Validators.minLength(3), Validators.maxLength(32)]
export const VALIDATORS_PASSWORD = [Validators.required, Validators.minLength(6), Validators.maxLength(32)]
