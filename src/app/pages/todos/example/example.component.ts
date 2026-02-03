import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
})
export class ExampleComponent {
  @Input() name: string = '';

  @Output() notify = new EventEmitter<string>();

  onSubmit() {
    this.notify.emit(this.name);
  }
}
