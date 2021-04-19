import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user-service';


@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.css']
})
export class UserformComponent implements OnInit { // controller
  title:string = 'userform';
  user:User=new User(); // model - stores all form data, change detection happens in model
  userArray:any;
  constructor(private userService:UserService) { }
  save(){
    const observable = this.userService.save(this.user);
    observable.subscribe(response=> { // success function
      console.log(response);
      this.user.id = response;
      alert('user added..')
      this.userArray.push(Object.assign({}, this.user));
    },
    error=> { // failure function
      console.log(error);
      alert("error happened..");
    })
  }
  deleteUser(userid:number,index:number){
    const observable = this.userService.delete(userid);
    observable.subscribe(response => this.userArray.splice(index,1));
  }
  ngOnInit(): void {
    const observable = this.userService.getAllUsers();
    observable.subscribe(response => this.userArray = response);
  }

}
