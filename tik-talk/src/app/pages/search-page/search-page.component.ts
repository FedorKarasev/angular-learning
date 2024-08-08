import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/interfaces/profile';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [ProfileCardComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  profileService: ProfileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }
}
