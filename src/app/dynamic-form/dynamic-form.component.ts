import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from '../form-service.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  dynamicForm: FormGroup = this.formBuilder.group({});

  constructor(private formBuilder: FormBuilder, public formService: FormService) { }

  ngOnInit() {
    const formStructure = this.formService.getFormStructure();

    let formGroup: Record<string, any> = {};
    formStructure.forEach(control => {
      let controlValidators: Validators[] = [];

      if (control.validations) {
        control.validations.forEach(validation => {
          if (validation.validator === 'required') controlValidators.push(Validators.required);
          if (validation.validator === 'email') controlValidators.push(Validators.email);
          // Add more built-in validators as needed
        });
      }

      formGroup[control.name] = [control.value || '', controlValidators];
    });

    this.dynamicForm = this.formBuilder.group(formGroup);
  }

  onSubmit() {
    console.log(this.dynamicForm.value);
  }

  getErrorMessage(control: any) {
    const formControl = this.dynamicForm.get(control.name);

    if (!formControl) {
      return '';
    }

    for (let validation of control.validations) {
      if (formControl.hasError(validation.name)) {
        return validation.message;
      }
    }

    return '';
  }
}