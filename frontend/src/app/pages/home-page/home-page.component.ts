import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import countryList from './country-list.json';

interface CountryListItem {
  id: string;
  label: string;
}

const buildCountryList = (i: { [key: string]: string }): ReadonlyArray<CountryListItem> =>
  Object.entries(i).map(([key, value]) => ({ id: key, label: value }));

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public form: FormGroup;

  public countryList: ReadonlyArray<CountryListItem> = buildCountryList(countryList);

  constructor() { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      checkInOutDates: new FormControl(null, [Validators.required]),
      guestsAmount: new FormControl(null, [Validators.required]),
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      postalCode: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
    });
  }

  public submitForm() {}

}
