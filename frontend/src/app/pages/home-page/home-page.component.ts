import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
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

  @ViewChild('confirmationTemplate', { static: true }) confirmationTemplate: TemplateRef<{}>;

  constructor(
    private modalService: NzModalService,
    private apiService: ApiService,
  ) { }

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
    const transformedData = transformFormData(this.form.value);
    this.modalService.confirm({
      nzTitle: 'Please confirm your reservation data',
      nzContent: this.confirmationTemplate,
      nzOnOk: () => this.createReservation(transformedData),
      nzComponentParams: {
        items: [
          { title: 'Check-in date', value: new Date(transformedData.checkInDate).toLocaleDateString("en-US") },
          { title: 'Check-out date', value: new Date(transformedData.checkOutDate).toLocaleDateString("en-US") },
          { title: 'Number of guests', value: transformedData.guestsAmount },
          { title: 'First Name', value: transformedData.firstName },
          { title: 'Last Name', value: transformedData.lastName },
          { title: 'Billing Address', value: transformedData.address },
          { title: 'Billing Country', value: transformedData.country },
          { title: 'Postal Code', value: transformedData.postalCode },
          { title: 'City', value: transformedData.city },
          { title: 'Email', value: transformedData.email },
          { title: 'Phone Number', value: transformedData.phone }
        ]
      },
    });
  }

  private async createReservation(data: CreateReservationRequest) {
    try {
      console.log('! data', data);
      const result = await this.apiService.createReservation({ reservationData: data });
      console.log('! result', result);
    } catch (err) {
      console.log('! error', err);
    }
  }

}
