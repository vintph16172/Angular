import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-input',
  templateUrl: './test-input.component.html',
  styleUrls: ['./test-input.component.css']
})
export class TestInputComponent implements OnInit {
  @Input() data!: string
 

  constructor() { }

  ngOnInit(): void {
  }

}
