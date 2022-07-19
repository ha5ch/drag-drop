import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FileDraggerModule } from './file-dragger/file-dragger.module';
import { FileDraggerComponent } from './file-dragger/file-dragger.component';
import { DirectoryDraggerComponent } from './directory-dragger/directory-dragger.component';
import { DirectoryDraggerModule } from './directory-dragger/directory-dragger.module';

const routes: Routes = [
  { path: 'files', component: FileDraggerComponent },
  { path: 'dirs', component: DirectoryDraggerComponent },
  { path: '', redirectTo: '/files', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    DirectoryDraggerModule,
    FileDraggerModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
