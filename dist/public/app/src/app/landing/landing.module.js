"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const router_1 = require("@angular/router");
const common_1 = require("@angular/common");
const forms_1 = require("@angular/forms");
const core_2 = require("@angular-mdl/core");
const landing_component_1 = require("./landing.component");
const landing_routing_module_1 = require("./landing-routing.module");
let LandingModule = class LandingModule {
};
LandingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule,
            common_1.CommonModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            core_2.MdlModule,
            landing_routing_module_1.LandingRouting
        ],
        declarations: [landing_component_1.LandingComponent],
        providers: [],
        bootstrap: [landing_component_1.LandingComponent]
    })
], LandingModule);
exports.LandingModule = LandingModule;
//# sourceMappingURL=landing.module.js.map