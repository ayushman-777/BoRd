import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {SHELF} from "../../constants/routes.const";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: any;

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    // private onetap: NgOneTapService
  ) {
  }

  ngOnInit() {
    this.user = this.auth.user$;
  }

  //
  // ngOnInit() {
  //   // this.onetap.tapInitialize();
  //   // this.onetap.promtMoment.subscribe(res => {
  //     res.getDismissedReason();
  //     res.getMomentType();
  //     res.getNotDisplayedReason();
  //     res.getSkippedReason();
  //     res.isDismissedMoment();
  //     res.isDisplayed();
  //     res.isNotDisplayed();
  //     res.isSkippedMoment();
  //   });
  //   this.onetap.oneTapCredentialResponse.subscribe(res => {
  //     console.log(res);
  //   });
  //   this.onetap.authUserResponse.subscribe(res => {
  //     console.log(res);
  //   });
  //
  // }
  //
  // tapcancel() {
  //   this.onetap.cancelTheTap();
  // }

  login() {
    this.auth
      .GoogleAuth();
  }

  logout() {
    this.auth
      .logout().then(() => {
      this.router.navigate([`/${SHELF}`]);
      this.snackBar.open('Come back soon to read! 📚', 'Close', {
        duration: 4000,
      });
    });
  }

}
