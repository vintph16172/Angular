import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  message: string = 'hello component';
  constructor() { }

  ngOnInit(): void {
  }

}


// function HeaderComponet(){
//   const  [message, setMessagge] = useState<string>("Hello");
//   return (
//     <div>
//       {message}
//     </div>
//   )
// }