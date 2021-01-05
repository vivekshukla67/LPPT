import { NgModule } from "@angular/core";
import { HighlightDirective } from "src/app-lib/UIControls/Highlight.directive";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    exports: [
        HighlightDirective
    ],
    declarations: [
        HighlightDirective
    ],
})
export class SharedDirectiveModule { }