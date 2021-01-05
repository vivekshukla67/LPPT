import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  public myInnerHeight: number;
  cardDetail:Array<Object>;
  public hoveredElement:any;

  constructor(private router: Router) {
     }

  ngOnInit() {
    this.onResize();

  this.cardDetail = [
    {heading: "Optimizing Modal Mix", color: "#ffe9ec",outlinecolor:"lightpink",img:"assets/Pie.png", dashboards:"dashboard1"},
    {heading: "Connectivity Enhancement", color: "#ffe5b4",outlinecolor:"orange",img:"assets/Pie.png",dashboards:"dashboard2"},
    {heading: "Congestion Reduction", color: "#cbf2fb",outlinecolor:"cyan",img:"assets/Pie.png",dashboards:"dashboard3"},
    {heading: "Commodity Optimization", color: "#81dff6",outlinecolor:"blue",img:"assets/Pie.png",dashboards:"dashboard4"},
    {heading: "Process Optimization", color: "#effbfe",outlinecolor:"lightblue",img:"assets/Pie.png",dashboards:"dashboard5"},
    {heading: "User Feedback", color: "#E6E6FA",outlinecolor:"violet",img:"assets/Pie.png",dashboards:"dashboard6"},
    {heading: "Rolling Stock Availability", color: "#D8BFD8",outlinecolor:"purple",img:"assets/Pie.png",dashboards:"dashboard7"},
    {heading: "Monitoring Logistics Performance", color: "#CDE699",outlinecolor:"green",img:"assets/Pie.png",dashboards:"dashboard8"},
  ];
}

toggleHover(id) {
  this.hoveredElement = id
}

removeHover() {
  this.hoveredElement = null;
}

onResize() {
  this.myInnerHeight = window.innerHeight - 200;
}

optionColor(ele){
    let x = ele.color;
    return x;
  }

  optionOutline(ele){
    let x = ele.outlinecolor;
    return x;
  }

  visualization() {
    this.router.navigate(['app/createForm']);
  }

  dashBoard() {
    this.router.navigate(['/app/dashboard']);
  }

  example(){
    this.router.navigate(['/app/example']);
  }

  drag(){
    this.router.navigate(['/app/drag']);
  }
  dragFilter(){
    this.router.navigate(['/app/dragfilter']);
  }
  linkBtn(){
    this.router.navigate(['/app/dashboard']);
  }

}