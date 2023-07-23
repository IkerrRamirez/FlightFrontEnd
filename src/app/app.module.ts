import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommentTableComponent } from './comment-table/comment-table.component';
import { CommentFormComponent } from './comment-form/comment-form.component';
import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: SidebarComponent },
  { path: 'comments/:flightId', component: CommentTableComponent },
  { path: 'create-comment', component: CommentFormComponent },
];

@NgModule({
  declarations: [AppComponent, SidebarComponent, CommentTableComponent, CommentFormComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, AppRoutingModule, RouterModule.forRoot(routes), BrowserAnimationsModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})

export class AppModule {}
