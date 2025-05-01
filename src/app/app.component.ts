import { Component, OnInit, OnDestroy } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { InputFieldComponent } from './components/input-field/input-field.component'
import { ResponsiveTextComponent } from './components/responsive-text/responsive-text.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputFieldComponent, ResponsiveTextComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  eventName = ''
  countdownText = ''
  date = ''

  private debounceTimeout: any
  private countdownInterval: any

  ngOnInit(): void {
    const savedName = localStorage.getItem('eventName')
    const savedDate = localStorage.getItem('date')

    if (savedName) this.eventName = savedName
    if (savedDate) this.date = savedDate

    this.updateCountdown()
    this.countdownInterval = setInterval(() => this.updateCountdown(), 1000)
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval)
  }
  onEventNameChange(value: string): void {
    clearTimeout(this.debounceTimeout)

    this.debounceTimeout = setTimeout(() => {
      this.eventName = value
      localStorage.setItem('eventName', value)
      this.updateCountdown()
    }, 500)
  }

  onDateChange(value: string) {
    this.date = value
    localStorage.setItem('date', value)
    this.updateCountdown()
  }

  updateCountdown() {
    if (!this.date) {
      this.countdownText = ''
      return
    }

    const now = new Date()
    const end = new Date(this.date)
    const diff = end.getTime() - now.getTime()

    if (diff <= 0) {
      this.countdownText = `0 days, 0 h, 0 m, 0 s`
      return
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    this.countdownText = `${days} days, ${hours} h, ${minutes} m, ${seconds} s`
  }
}
