import { AsyncPipe, JsonPipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormRecord, ReactiveFormsModule } from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-reactive-forms',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    JsonPipe,
    AsyncPipe
  ],
  templateUrl: './reactive-forms.component.html',
  styleUrl: './reactive-forms.component.css'
})
export class ReactiveFormsComponent implements OnInit {

  phoneLabels = ['Main', 'Mobile', 'Work', 'Home']
  user: any
  skils$!: Observable<string[]>

  standControl = new FormControl('')

  form = new FormGroup({
    name: new FormControl(''),
    age: new FormControl(null),
    job: new FormControl(''),
    phones: new FormArray([
      new FormGroup({
        label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
        phone: new FormControl(null)
      })
    ]),
    skills: new FormRecord<FormControl<boolean>>({})
  })

  get Phones() {
    return this.form.controls.phones as FormArray<FormGroup<any>>
  }

  constructor(
    private http: HttpClient,
    private userService: UserService
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
    console.log(this.form.getRawValue());
  }


}
