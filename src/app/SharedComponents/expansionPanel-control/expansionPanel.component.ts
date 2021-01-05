import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-expansion-control',
    templateUrl: './expansionPanel.component.html',
    styleUrls: ['./expansionPanel.component.scss']
})

export class ExpansionControlComponent {
    @Output() AddSubFilter: EventEmitter<any> = new EventEmitter();
    @Output() Edit: EventEmitter<any> = new EventEmitter();
    @Output() Delete: EventEmitter<boolean> = new EventEmitter(false);
    @Output() RemoveProperty: EventEmitter<boolean> = new EventEmitter(false);
    public panelOpenState = false;
    public expansionList: Object = {};
    @Input() set ExpansionList(value: Object) {
        this.expansionList = value;
    }
    get ExpansionList() {
        return this.expansionList;
    }

    delete() {
        this.removeProperty(event);
        this.Delete.emit(true);
        this.RemoveProperty.emit(true);
    }

    removeProperty(event) {
        delete this.expansionList['filters'];
    }

    addSubFilter() {
        this.AddSubFilter.emit(this.ExpansionList);
    }

    editFilter() {
        this.Edit.emit(this.expansionList);
    }

}