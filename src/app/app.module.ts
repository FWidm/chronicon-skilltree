import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {ChroniconSkillComponent} from './components/chronicon-skill/chronicon-skill.component';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ConnectorComponent} from './components/connector/connector.component';
import {SkilltreeComponent} from './components/skilltree/skilltree.component';
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
