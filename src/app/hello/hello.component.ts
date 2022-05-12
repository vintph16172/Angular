import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  @Input() data!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
// const myName = props.data;
// console.log(props.data)