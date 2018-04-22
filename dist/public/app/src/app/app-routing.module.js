"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const router_1 = require("@angular/router");
const routes = [
    {path: '', loadChildren: './landing/landing.module#LandingModule'},
    {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'}
];
exports.AppRouting = router_1.RouterModule.forRoot(routes, {useHash: false});
//# sourceMappingURL=app-routing.module.js.map