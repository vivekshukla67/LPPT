import { Directive, ElementRef, HostListener, Input, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Directive({
    selector: '[appHighlight], [listComp]'
})
export class HighlightDirective {

    @Input('appHighlight') appHighlight: Array<string>;
    // @HostListener('click') onMouseClick() { this.highlight(this.appHighlight); }
    @HostBinding('class.activeList') get valid() { this.autoHighlight(); return true; }

    private queryParamId: string;

    constructor(private el: ElementRef,
        private activateRoute: ActivatedRoute) {
        this.activateRoute.queryParams.subscribe((data) => {
            if (data.Id)
                this.queryParamId = data.Id;
            else{
                this.queryParamId = null;
                this.removeAllClass('activeList');
            }
        });
    }

    private highlight(appHighlight: Array<string>) {

        switch (appHighlight[0]) {
            case 'list':
                this.list();
                break;
            default:
                // console.log("highlight method not implemented.!");
        }
    }

    private async list() {
        let n = await this.el.nativeElement.childNodes.length - 1;
        if (!this.el.nativeElement.childNodes[n]) {
            await this.removeClass("activeList");
            return;
        }

        if (!this.el.nativeElement.childNodes[n].classList.contains('activeList')) {
            await this.removeClass("activeList");
            this.el.nativeElement.childNodes[n].classList.add('activeList');
            return;
        }
    }

    private async removeClass(className: string) {
        var links = document.querySelectorAll('.' + className);
        for (var i = 0; i < links.length; i++) {
            if (event && links[i] === event.target) continue;
            links[i].classList.remove(className);
        }
    }
    
    private async removeAllClass(className: string) {
        var links = document.querySelectorAll('.' + className);
        for (var i = 0; i < links.length; i++) {
            links[i].classList.remove(className);
        }
    }

    private autoHighlight() {
        if(this.appHighlight.length > 1 && this.queryParamId === this.appHighlight[1])
            this.highlight([this.appHighlight[0]]);
    }
}