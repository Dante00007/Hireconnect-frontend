import { Component, inject, Output, EventEmitter, Input, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AddressFormComponent } from '../../../../shared/components/address/address-form.component';
import { ProfileService } from '../../../../core/services/profile.service';
import { UserProfileDTO } from '../../../../core/models/profile.model';


@Component({
  selector: 'app-candidate-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AddressFormComponent,
  ],
  templateUrl: './candidate-profile-form.component.html',
  styleUrl: './candidate-profile-form.component.css'
})
export class CandidateProfileFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private profileService = inject(ProfileService);

  @Input()
  isEditMode = false;
  @Input()
  profile: UserProfileDTO | null = null;

  @Output()
  profileSaved = new EventEmitter<void>();

  selectedResume: File | null = null;
  selectedProfileImage: File | null = null;

  loading = signal(false);
  error = signal<string | null>(null);

  candidateForm = this.fb.group({

    firstName: ['',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/)
      ]
    ],

    dob: [''],

    skills: [
      '',
      Validators.required
    ],

    experience: [0],


    address: this.fb.group({

      houseNo: [''],
      street: [''],
      city: [''],
      state: [''],
      pincode: ['']

    })

  });

  hasError(
    controlName: string,
    errorName: string
  ): boolean {

    const control =
      this.candidateForm.get(controlName);

    return !!(
      control &&
      control.touched &&
      control.hasError(errorName)
    );
  }

  ngOnInit() {

    if (this.isEditMode && this.profile) {

      const names =
        this.profile.fullName?.split(' ');

      this.candidateForm.patchValue({

        firstName: names?.[0] ?? '',

        lastName: names?.slice(1).join(' ') ?? '',

        email: this.profile.email,

        mobile: this.profile.mobile,

        dob: this.profile.dob
          ? this.profile.dob.toString().split('T')[0]
          : '',

        skills: this.profile.skills,

        experience: this.profile.experience,

        address: {

          houseNo:
            this.profile.address?.houseNo,

          street:
            this.profile.address?.street,

          city:
            this.profile.address?.city,

          state:
            this.profile.address?.state,

          pincode:
            this.profile.address?.pincode

        }

      });

    }

  }

  onResumeSelected(event: Event) {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file = input.files[0];

    // Allow only PDF
    if (file.type !== 'application/pdf') {

      alert('Only PDF files are allowed');

      return;
    }

    this.selectedResume = file;

  }
  onProfileImageSelected(event: Event) {

    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    // Allow only images
    if (!input.files[0].type.startsWith('image/')) {

      alert('Only image files are allowed');

      return;
    }

    const file = input.files[0];

    this.selectedProfileImage = file;
  }
  submit() {

    if (this.candidateForm.invalid) return;

    const formValue = this.candidateForm.value;

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
      'Mobile',
      formValue.mobile ?? ''
    );

    formData.append(
      'DOB',
      formValue.dob ?? ''
    );

    formData.append(
      'Skills',
      formValue.skills ?? ''
    );

    formData.append(
      'Experience',
      String(formValue.experience ?? 0)
    );

    // Address
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

    // Resume
    if (this.selectedResume) {

      formData.append(
        'Resume',
        this.selectedResume
      );
    }

    // Profile Image
    if (this.selectedProfileImage) {

      formData.append(
        'ProfileImage',
        this.selectedProfileImage
      );
    }

    this.loading.set(true);
    const request = this.isEditMode ? this.profileService.updateCandidateProfile(formData)
      : this.profileService.createCandidateProfile(formData);
    request
      .subscribe({

        next: (res) => {
          console.log('Profile Updated');
          this.profileSaved.emit();
          this.loading.set(false);
        },

        error: (err) => {
          this.error.set(err.error?.message || 'Failed to update profile.');
          this.loading.set(false);
        }

      });
  }

}