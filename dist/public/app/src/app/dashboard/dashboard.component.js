"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", {value: true});
const core_1 = require("@angular/core");
const navigation_component_1 = require("./sections/navigation/navigation.component");
const user_image_header_component_1 = require("./sections/user-image-header/user-image-header.component");
let DashboardComponent = class DashboardComponent {
    constructor() {
    }
};
DashboardComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'tms-dashboard',
        templateUrl: 'dashboard.component.html',
        styleUrls: ['dashboard.component.css'],
        entryComponents: [
            navigation_component_1.NavigationComponent,
            user_image_header_component_1.UserImageHeaderComponent
        ]
    })
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map