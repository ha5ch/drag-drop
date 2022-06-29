import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DropAreaComponent } from './drop-area/drop-area.component';
import { FileContainerModule } from './file-container/file-container.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DropAreaComponent,
  ],
  imports: [
    BrowserModule,
    FileContainerModule,
  ],
  providers: [],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
