"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
let LandingComponent = class LandingComponent {
    constructor(router, fb, landingService) {
        this.router = router;
        this.fb = fb;
        this.landingService = landingService;
        this.isLogin = true;
        this.isSignUp = false;
    }
    ngOnInit() {
        this.buildForm();
    }
    buildForm() {
        this.loginForm = this.fb.group({
            "email": ["", forms_1.Validators.required],
            "password": ["", forms_1.Validators.required]
        });
        this.signupForm = this.fb.group({
            "firstName": ["", forms_1.Validators.required],
            "lastName": ["", forms_1.Validators.required],
            "emailAddress": ["", forms_1.Validators.required],
            "username": ["", forms_1.Validators.required],
            "password": ["", forms_1.Validators.required]
        });
    }
    login(credential) {
        this.landingService
            .login(credential)
            .subscribe(response => {
                const user = JSON.stringify(response);
                localStorage.setItem("user", user);
                this.router.navigate(["/dashboard"]);
            }, err => this.errorMessage = err._body.replace(/['"]+/g, ""));
    }
    register(user) {
        console.log(user);
        this.router.navigate(["/dashboard"]);
    }
};
LandingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: "tms-landing",
        templateUrl: "landing.component.html",
        styleUrls: ["landing.component.css"]
    })
], LandingComponent);
exports.LandingComponent = LandingComponent;
//# sourceMappingURL=landing.component.js.map