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
const core_2 = require("@angular-mdl/core");
const dashboard_component_1 = require("./dashboard.component");
const navigation_component_1 = require("./sections/navigation/navigation.component");
const user_image_header_component_1 = require("./sections/user-image-header/user-image-header.component");
const dashboard_routing_module_1 = require("./dashboard-routing.module");
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            core_2.MdlModule,
            dashboard_routing_module_1.DashboardRouting
        ],
        declarations: [
            dashboard_component_1.DashboardComponent,
            navigation_component_1.NavigationComponent,
            user_image_header_component_1.UserImageHeaderComponent
        ],
        providers: []
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map