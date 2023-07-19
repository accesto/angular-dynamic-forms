import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  formStructure = [
    {
      "type": "text",
      "label": "Name",
      "name": "name",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Name is required"
        }
      ]
    },
    {
      "type": "email",
      "label": "Email",
      "name": "email",
      "value": "",
      "validations": [
        {
          "name": "required",
          "validator": "required",
          "message": "Email is required"
        },
        {
          "name": "pattern",
          "validator": "email",
          "message": "Invalid email format"
        }
      ]
    }
  ];

  getFormStructure() {
    return this.formStructure;
  }
}
