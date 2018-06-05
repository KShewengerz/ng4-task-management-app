"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const landing_component_1 = require("./landing.component");
const routes = [
    { path: "", component: landing_component_1.LandingComponent }
];
exports.LandingRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=landing-routing.module.js.map