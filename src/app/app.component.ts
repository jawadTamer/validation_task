import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  form!: FormGroup;

  // Define all fields in one array
  fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      validators: [Validators.required, Validators.pattern(/^[^\d]+$/)],
      errors: {
        required: 'Name is required.',
        pattern: 'Name cannot contain numbers.',
      },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      validators: [Validators.required, Validators.email],
      errors: {
        required: 'Email is required.',
        email: 'Invalid email format.',
      },
    },
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      validators: [Validators.required, Validators.min(18)],
      errors: { required: 'Age is required.', min: 'Must be at least 18.' },
    },
    {
      name: 'phone',
      label: 'Phone',
      type: 'tel',
      validators: [Validators.required, Validators.pattern(/^\d{11}$/)],
      errors: { required: 'Phone is required.', pattern: 'Must be 11 digits.' },
    },
    {
      name: 'address',
      label: 'Address',
      type: 'text',
      validators: [Validators.required, Validators.minLength(5)],
      errors: { required: 'Address is required.', minlength: 'Too short.' },
    },
    {
      name: 'city',
      label: 'City',
      type: 'text',
      validators: [Validators.required],
      errors: { required: 'City is required.' },
    },
    {
      name: 'country',
      label: 'Country',
      type: 'text',
      validators: [Validators.required],
      errors: { required: 'Country is required.' },
    },
    {
      name: 'postalCode',
      label: 'Postal Code',
      type: 'text',
      validators: [Validators.required, Validators.pattern(/^\d{5}$/)],
      errors: {
        required: 'Postal code is required.',
        pattern: 'Must be 5 digits.',
      },
    },
    {
      name: 'username',
      label: 'Username',
      type: 'text',
      validators: [Validators.required, Validators.minLength(4)],
      errors: { required: 'Username is required.', minlength: 'Too short.' },
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      validators: [Validators.required, Validators.minLength(6)],
      errors: { required: 'Password is required.', minlength: 'Too short.' },
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      validators: [Validators.required],
      errors: { required: 'Please confirm your password.' },
    },
    {
      name: 'website',
      label: 'Website',
      type: 'url',
      validators: [
        Validators.required,
        Validators.pattern(
          /^(https?:\/\/)?([\w\-])+\.[\w\-]+(\.[\w\-]+)*(\/[\w\-.,@?^=%&:/~+#]*)?$/
        ),
      ],
      errors: {
        required: 'Website is required.',
        pattern: 'Enter a valid URL.',
      },
    },
    {
      name: 'linkedin',
      label: 'LinkedIn',
      type: 'url',
      validators: [
        Validators.pattern(
          /^(https?:\/\/)?([\w\-])+\.[\w\-]+(\.[\w\-]+)*(\/[\w\-.,@?^=%&:/~+#]*)?$/
        ),
        ,
      ],
      errors: {
        pattern: 'Enter a valid URL.',
      },
    },
    {
      name: 'github',
      label: 'GitHub',
      type: 'url',
      validators: [
        Validators.pattern(
          /^(https?:\/\/)?([\w\-])+\.[\w\-]+(\.[\w\-]+)*(\/[\w\-.,@?^=%&:/~+#]*)?$/
        ),
        ,
      ],
      errors: {
        pattern: 'Enter a valid URL.',
      },
    },
    {
      name: 'birthdate',
      label: 'Birthdate',
      type: 'date',
      validators: [Validators.required],
      errors: { required: 'Birthdate is required.' },
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'Select Gender', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
      validators: [Validators.required],
      errors: { required: 'Gender is required.' },
    },
    {
      name: 'jobTitle',
      label: 'Job Title',
      type: 'text',
      validators: [Validators.required],
      errors: { required: 'Job title is required.' },
    },
    {
      name: 'company',
      label: 'Company',
      type: 'text',
      validators: [],
      errors: {},
    },
    {
      name: 'bio',
      label: 'Bio',
      type: 'textarea',
      validators: [Validators.maxLength(200)],
      errors: { maxlength: 'Max 200 characters.' },
    },
    {
      name: 'newsletter',
      label: 'Subscribe to Newsletter',
      type: 'checkbox',
      validators: [],
      errors: {},
    },
  ];

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.fields.forEach((field) => {
      if (field.type === 'checkbox') {
        group[field.name] = this.fb.control(
          false,
          (field.validators
            ? field.validators.filter(Boolean)
            : []) as import('@angular/forms').ValidatorFn[]
        );
      } else {
        group[field.name] = this.fb.control(
          '',
          (field.validators
            ? field.validators.filter(Boolean)
            : []) as import('@angular/forms').ValidatorFn[]
        );
      }
    });
    this.form = this.fb.group(group, {
      validators: this.passwordMatchValidator,
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.form.valid) {
      Swal.fire('Success!', 'Form submitted successfully!', 'success');
      console.log(this.form.value);
    } else {
      Swal.fire('Error', 'Please fix the errors in the form.', 'error');
    }
  }

  getErrorMessage(field: any, errorKey: string): string | null {
    if (field.errors && field.errors[errorKey]) {
      return field.errors[errorKey];
    }
    return null;
  }
}
