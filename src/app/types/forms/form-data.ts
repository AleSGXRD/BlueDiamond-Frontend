import { FormGroup } from "@angular/forms";
import { ApiService } from "../../services/apis/api.service";
import { FormField } from "./form-field";
import { ApiManagerService } from "../../services/managers/api/api-manager.service";

export interface FormData{
  apiService: ApiManagerService,
  form : FormGroup,
  inputs: FormField[]
}
