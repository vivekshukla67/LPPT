import { Component, OnInit } from '@angular/core';
import { AppRootVM } from '../AppComponent/ViewModel/AppRootVM';
import { ThemeService } from 'src/app-lib/themes/theme.service';
import { PositiionType } from '../alert/alert.model';
// import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  
  Position = PositiionType;
  constructor(private appRootVM: AppRootVM,
  public themeService: ThemeService) { }
  sidewidth:number = 60;
  isExpanded = false;
  
  ngOnInit() {}

  signOut() {
    localStorage.clear();
    this.appRootVM.navigateToSingleLogin();
  }

  changetheme(event){
    if (event.target.checked) {
      this.themeService.setDarkTheme();
    } else {
      this.themeService.setLightTheme();
    }
  }

  togglewidth(){
    this.sidewidth = 200;
  }
}
