import { Component, EventEmitter, inject, Input, OnInit, Output, signal } from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AddressFormComponent } from '../../../../shared/components/address/address-form.component';
import { ProfileService } from '../../../../core/services/profile.service';
import { UserProfileDTO } from '../../../../core/models/profile.model';
import as from '@angular/common/locales/extra/as';



@Component({
  selector: 'app-recruiter-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddressFormComponent
  ],
  templateUrl: './recruiter-profile-form.component.html',
  styleUrls: ['./recruiter-profile-form.component.css']
})
export class RecruiterProfileFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  @Input()
  isEditMode = false;
  @Input()
  profile: UserProfileDTO | null = null;

  @Output()
  profileSaved = new EventEmitter<void>();

  selectedCompanyLogo?: File;
  loading = signal(false);
  error = signal<string | null>(null);

  recruiterForm = this.fb.group({

    firstName: ['', Validators.required],

    lastName: ['', Validators.required],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    companyName: ['', Validators.required],

    companySize: [''],

    industry: [''],

    website: [''],

    address: this.fb.group({

      houseNo: [''],
      street: [''],
      city: [''],
      state: [''],
      pincode: ['']

    })

  });

  ngOnInit() {

    if (this.isEditMode && this.profile) {
      const names = this.profile.fullName?.split(' ');

      this.recruiterForm.patchValue({
        firstName: names ? names[0] : '',
        lastName: names ? names.slice(1).join(' ') : '',
        email: this.profile.email,
        companyName: this.profile.companyName,
        companySize: this.profile.companySize,
        industry: this.profile.industry,
        website: this.profile.website,
        address: {
          houseNo: this.profile.address?.houseNo,
          street: this.profile.address?.street,
          city: this.profile.address?.city,
          state: this.profile.address?.state,
          pincode: this.profile.address?.pincode
        }
      });
    }
  }

  onCompanyLogoSelected(
    event: Event
  ) {

    const input = event.target as HTMLInputElement;

    if (input.files?.length) {
      this.selectedCompanyLogo =
        input.files[0];
    }

  }

  hasError(
    controlName: string,
    errorName: string
  ): boolean {

    const control =
      this.recruiterForm.get(controlName);

    return !!(
      control &&
      control.touched &&
      control.hasError(errorName)
    );
  }

  submit() {

    if (this.recruiterForm.invalid) return;

    const formValue = this.recruiterForm.value;
    const formData = new FormData();

    formData.append(
      'FullName',
      `${formValue.firstName} ${formValue.lastName}`
    );

    formData.append(
      'Email',
      formValue.email ?? ''
    );

    formData.append(
      'CompanyName',
      formValue.companyName ?? ''
    );

    formData.append(
      'CompanySize',
      formValue.companySize ?? ''
    );

    formData.append(
      'Industry',
      formValue.industry ?? ''
    );

    formData.append(
      'Website',
      formValue.website ?? ''
    );

    formData.append(
      'Address.HouseNo',
      formValue.address?.houseNo ?? ''
    );

    formData.append(
      'Address.Street',
      formValue.address?.street ?? ''
    );

    formData.append(
      'Address.City',
      formValue.address?.city ?? ''
    );

    formData.append(
      'Address.State',
      formValue.address?.state ?? ''
    );
    formData.append(
      'Address.Pincode',
      formValue.address?.pincode ?? ''
    );
    if (this.selectedCompanyLogo) {
      formData.append(
        'CompanyLogo',
        this.selectedCompanyLogo
      );
    }

    this.loading.set(true);
    const request = this.isEditMode ? this.profileService.updateRecruiterProfile(formData)
      : this.profileService.createRecruiterProfile(formData);

    request.subscribe({

      next: (res) => {
        console.log('Recruiter Profile Created', res);
        this.profileSaved.emit();
        this.loading.set(false);
      },

      error: (err) => {
     
        this.error.set(err.error?.message || 'Failed to save profile.');
        this.loading.set(false);
      }

    });
  }

}