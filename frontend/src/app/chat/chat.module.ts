import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatExpansionModule} from '@angular/material/expansion';
import { ScrollTrackerDirective } from './scroll-tracker.directive';
import { MessagesComponent } from './messages/messages.component';
import { UsersComponent } from './users/users.component';
import { ChatInputComponent } from './chat-input/chat-input.component';

const config: SocketIoConfig = { url: 'http://localhost:8988', options: {} };

@NgModule({
  declarations: [
    ChatComponent,
    ScrollTrackerDirective,
    MessagesComponent,
    UsersComponent,
    ChatInputComponent
  ],
  imports: [
    BrowserModule,
    ChatRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    BrowserModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule
  ],
  exports: [
    ChatComponent,
    MessagesComponent,
    UsersComponent,
    ChatInputComponent
  ]
})
export class ChatModule { }
