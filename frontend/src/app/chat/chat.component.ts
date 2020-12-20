import { Component, AfterViewInit, Input, HostListener } from '@angular/core';
import { Message } from "./message";
import { User } from "./user";
import { SocketReturnObject } from './socket-return-object';
import { MessagingService } from "./messaging.service";
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { Cookie } from './cookie';


@Component({
  selector: 'chat-root',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements AfterViewInit {
  title = 'DollarsChatClient';

  // @Input()
  // public get hideChat(): boolean {
  //   return this._hideChat;
  // }
  // public set hideChat(value: boolean) {
  //   this._hideChat = value;
  // }

  public _hideUsers = true;
  //public _hideChat = false;
  public onlineUsers: User[];
  public messages: Message[];
  public renderMessages: boolean = false;
  public cookie: Cookie = new Cookie();
  


  constructor (private breakpointObserver: BreakpointObserver) {
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.breakpointObserver.observe([
      Breakpoints.Medium
    ]).subscribe(result => {
      if (result.matches) {
        this.activateMediumLayout();
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.Small
    ]).subscribe(result => {
      if (result.matches) {
        this.activateSmallLayout();
      }
    });
    this.breakpointObserver.observe([
      Breakpoints.XSmall
    ]).subscribe(result => {
      if (result.matches) {
        this.activateXSmallLayout();
      }
    });
  
  }

  public updateStateFromMesssages(data) {
    console.log("Parent updating state from messages.");
    this.messages = data.messages;
    this.cookie.setUsername(data.cookieUsername);
    this.updateUsers(data.users);
    console.log("Parent's cookie:");
    console.log(this.cookie.getUsernameFromCookie());
  }

  public updateStateFromUsers(data) {
    console.log("Parent updating state from users.");
    this.messages = data.messages;
    this.cookie.setUsername(data.cookieUsername);
    this.updateUsers(data.users);
    this.renderMessages = data.renderMessages;
    console.log("Parent's cookie:");
    console.log(this.cookie.getUsernameFromCookie());
  }

  public updateUsers(users: User[]) {
    this.onlineUsers = this.filterOutDuplicatedFromOnlineUsersList(users);
    console.log("Updated users list (parent):");
    console.log(this.onlineUsers);
  }

  private filterOutDuplicatedFromOnlineUsersList(usersList: User[]): User[] {
    console.log("In filterOutDuplicates");
    let uniqueUsersList: User[] = []
    let filteredUsernames: string[] = usersList.map<string>((user: User): string => {return user.username});
    console.log("filteredUsernames:");
    console.log(filteredUsernames);
    let usernamesSet: string[] = [...new Set<string>(filteredUsernames)];
    console.log("usernamesSet:");
    console.log(usernamesSet);
    usernamesSet.forEach((usernameValue) => {
      uniqueUsersList.push(
        usersList.find((user) => user.username === usernameValue));
    });
    console.log("Unique users list:");
    console.log(uniqueUsersList);
    return uniqueUsersList;
  }


///////////////// Media Queries from Angular Material //////////////////

  private activateMediumLayout() {
    document.getElementsByTagName("mat-sidenav")[1].setAttribute("style", "min-width: 0");
    document.getElementById("send-button").style.marginRight = "1rem";
  }

  private activateSmallLayout() {
    document.getElementsByTagName("mat-sidenav")[0].setAttribute("style", "min-width: 0");
    document.getElementById("send-button").style.marginRight = "0rem";
  }
  
  private activateXSmallLayout() {
    document.getElementById("main-content").style.gridTemplateRows = "100% 26%";
    document.getElementById("send-button").style.marginLeft = "0.2rem";
    document.getElementById("main-content").style.gridTemplateRows = "100% 26%";
    document.getElementsByTagName("mat-sidenav-container")[0].setAttribute("style",
      "position: absolute; top: 48px; bottom: 0; left: 0; right: 0;");
  }

}
