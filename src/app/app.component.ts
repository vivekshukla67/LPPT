import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { AppRootVM } from './AppComponent/ViewModel/AppRootVM';
import { LocationStrategy } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar, MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'BAM';
  constructor(private appRootVM: AppRootVM,
    private locationStrategy: LocationStrategy,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private toast: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  @Output() toggleSideNav = new EventEmitter();

  ngOnInit() {
    this.appRootVM.AppInitialization();
  }

  toggleMobileNav(nav: MatSidenav) {
    if (this.mobileQuery.matches) {
      nav.toggle();
    }
  }

  preventBackButton() {
    let url = "http://localhost:4200/#/app/project";
    this.locationStrategy.onPopState(() => {
      if (url == location.href)
        history.pushState(null, null, location.href);
    })
  }
}