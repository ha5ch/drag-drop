import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FileDraggerModule } from './file-dragger/file-dragger.module';
import { FileDraggerComponent } from './file-dragger/file-dragger.component';
import { DirectoryComponent } from './directory/directory.component';
import { DirectoryModule } from './directory/directory.module';

const routes: Routes = [
  { path: 'files', component: FileDraggerComponent },
  { path: 'dirs', component: DirectoryComponent },
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
    DirectoryModule,
    FileDraggerModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
