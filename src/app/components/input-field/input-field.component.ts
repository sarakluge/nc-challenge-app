import { Component, Input, Output, EventEmitter } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.css'],
})
export class InputFieldComponent {
  @Input() value: string = ''
  @Input() type: string = 'text'
  @Input() label: string = ''
  @Output() valueChange = new EventEmitter<string>()

  onInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.valueChange.emit(target.value)
  }
}
