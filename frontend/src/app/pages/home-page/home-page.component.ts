import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService, CreateReservationRequest } from '../../services/api.service';
import countryList from './country-list.json';

interface CountryListItem {
  id: string;
  label: string;
}

const buildCountryList = (i: { [key: string]: string }): ReadonlyArray<CountryListItem> =>
  Object.entries(i).map(([key, value]) => ({ id: key, label: value }));

const toggleFormControlsValidation = (form: FormGroup) => {
  for (const key in form.controls) {
    form.controls[key].markAsDirty();
    form.controls[key].updateValueAndValidity();
  }
}

interface RawValidFormData {
  checkInOutDates: [Date, Date];
  guestsAmount: number;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  address: string;
  postalCode: string;
  email: string;
  phone: string;
}

const transformFormData = (input: RawValidFormData): CreateReservationRequest => {
  const { checkInOutDates, ...otherData } = input;
  return {
    ...otherData,
    checkInDate: checkInOutDates[0].toISOString(),
    checkOutDate: checkInOutDates[1].toISOString(),
  };
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public form: FormGroup;

  public countryList: ReadonlyArray<CountryListItem> = buildCountryList(countryList);

  constructor(private apiService: ApiService) { }

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

  public async submitForm() {
    toggleFormControlsValidation(this.form);
    if (!this.form.valid) {
      return;
    }
    const data = this.form.value;
    try {
      console.log('! data', data, transformFormData(data));
      const result = await this.apiService.createReservation({ reservationData: transformFormData(data) });
      console.log('! result', result);
    } catch (err) {
      console.log('! error', err);
    }
  }

}
