import {Directive, Attribute, ViewContainerRef, DynamicComponentLoader} from "angular2/core";
import {UserService} from "../services/user";
import {RouterOutlet, Router, ComponentInstruction} from "angular2/router";


@Directive({
  selector: 'router-outlet'
})
export class AuthRouterComponent extends RouterOutlet {
  constructor(
    _elementRef: ViewContainerRef,
    _loader: DynamicComponentLoader,
    private parentRouter: Router,
    @Attribute('name') nameAttr: string,
    private _user: UserService) {
    super(_elementRef, _loader, parentRouter, nameAttr);

  }

  activate(instruction: ComponentInstruction) {
    if (this._canActivate(instruction.urlPath)) {
      return super.activate(instruction);
    }

    this.parentRouter.navigate(['Login']);
  }

  _canActivate(url) {
    console.log("CHECK URL: ", url);
    if(url.indexOf("account") === 0) {
      return this._user.isAuthenticated();
    }

    return true;
  }
}