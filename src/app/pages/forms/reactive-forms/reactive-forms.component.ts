import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormRecord, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';
import { banWords } from '../custom-validator/band-words.validator';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    JsonPipe,
    AsyncPipe,
    FormsModule,
  ],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css',

})
export class ReactiveFormsComponent implements OnInit {
 val: string = ''
  phoneLabels = ['Main', 'Mobile', 'Work', 'Home']
  user: any
  skils$!: Observable<string[]>

  standControl = new FormControl('')

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[\w.]+$/), banWords]),
    age: new FormControl(null, [Validators.min(18), Validators.required]),
    job: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{2}[0-9]{8}$/)]),
    phones: new FormArray([
      new FormGroup({
        label: new FormControl(this.phoneLabels[0]),
        phone: new FormControl('')
      })
    ]),
    skills: new FormRecord<FormControl<boolean>>({})
  })

  get Phones() {
    return this.form.controls.phones as FormArray<FormGroup<any>>
  }

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.skils$ = this.userService.getSkills().pipe(
      tap((skills) => this.buildSkillsControls(skills))
    )
    this.standControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((searchItem) => this.http.get<any>(`https://jsonplaceholder.typicode.com/users?username=${searchItem}`)
        .pipe(
          map((res) => res[0])
        )
      )
    ).subscribe({
      next: (res) => {
        this.user = res
      }
    })
  }

  addPhoneControl() {
    this.Phones.push(this.createPhoneForm())
  }

  createPhoneForm() {
    return new FormGroup({
      label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
      phone: new FormControl(null)
    })
  }

  buildSkillsControls(skills: string[]) {
    skills.forEach((skill) => {
      this.form.controls.skills.addControl(skill, new FormControl(false, { nonNullable: true }))
    })
  }

  removePhoneControl(i: number) {
    this.Phones.removeAt(i)
  }

  onSubmit(e: Event) {
    console.log(this.form);
    if (!this.form.valid) {
      
      this.form.markAllAsTouched()
    }else{
      console.log(this.form.getRawValue());
    }
  }


}
