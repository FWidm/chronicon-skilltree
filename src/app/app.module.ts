import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {ChroniconSkillComponent} from './chronicon-skill/chronicon-skill.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ConnectorComponent} from './connector/connector.component';
import {SkilltreeComponent} from './skilltree/skilltree.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HelpButtonComponent} from './help-button/help-button.component'; // <-- NgModel lives here


@NgModule({
  declarations: [
    AppComponent,
    ChroniconSkillComponent,
    ConnectorComponent,
    SkilltreeComponent,
    HelpButtonComponent
  ],
  imports: [
    BrowserModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    FormsModule,
    CommonModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
