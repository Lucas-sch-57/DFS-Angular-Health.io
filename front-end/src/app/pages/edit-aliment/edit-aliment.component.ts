import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-aliment',
  templateUrl: './edit-aliment.component.html',
  styleUrls: ['./edit-aliment.component.scss'],
})
export class EditAlimentComponent {
  constructor(private fb: FormBuilder, private http: HttpClient) {}
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  formulaire: FormGroup = this.fb.group({
    name: ['', Validators.required],
    calories: ['', Validators.required],
    proteines: ['', Validators.required],
    glucides: ['', Validators.required],
    lipides: ['', Validators.required],
  });

  onAlimentFormSubmit() {
    if (this.formulaire.valid) {
      this.http
        .post('http://localhost:3000/aliment', {
          aliment: this.formulaire.value,
        })
        .subscribe({
          next: (data) => {
            //success message
            this.isSuccess = true;
            setTimeout(() => {
              this.isSuccess = false;
            }, 3000);
            //Reset form
            this.formulaire.reset();
          },
          error: (err) => {
            //error message
            this.isError = true;
            this.errorMessage = err.error.message;
            setTimeout(() => {
              this.isError = false;
            }, 3000);
          },
        });
    }
  }
}
