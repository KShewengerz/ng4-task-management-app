"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) {
        decorator(target, key, paramIndex);
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
let LandingService = class LandingService {
    constructor(http, apiUrl) {
        this.http = http;
        this.apiUrl = apiUrl;
        this.url = `${apiUrl}/user`;
    }

    login(credentials) {
        return this.http
            .post(`${this.url}/login`, credentials)
            .map(response => response.json());
    }
};
LandingService = __decorate([
    core_1.Injectable(),
    __param(1, core_1.Inject("API_URL"))
], LandingService);
exports.LandingService = LandingService;
//# sourceMappingURL=landing.service.js.map