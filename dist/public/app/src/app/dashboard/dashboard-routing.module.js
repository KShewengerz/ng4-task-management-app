"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router");
const dashboard_component_1 = require("./dashboard.component");
const routes = [
    {
        path: "",
        component: dashboard_component_1.DashboardComponent,
        children: [
            { path: "", redirectTo: "home", pathMatch: "full" },
            { path: "home", loadChildren: "./home/home.module#HomeModule" }
        ]
    }
];
exports.DashboardRouting = router_1.RouterModule.forChild(routes);
//# sourceMappingURL=dashboard-routing.module.js.map