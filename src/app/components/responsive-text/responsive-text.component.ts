import {
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  Renderer2,
} from '@angular/core'

@Component({
  selector: 'app-responsive-text',
  templateUrl: './responsive-text.component.html',
  styleUrls: ['./responsive-text.component.css'],
})
export class ResponsiveTextComponent implements AfterViewInit {
  private _text = ''
  @Input()
  set text(value: string) {
    this._text = value
    this.adjustFontSize()
  }
  get text() {
    return this._text
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {}

  ngAfterViewInit() {
    this.adjustFontSize()
    window.addEventListener('resize', () => this.adjustFontSize())
  }

  private adjustFontSize() {
    requestAnimationFrame(() => {
      const element = this.el.nativeElement.querySelector('.text-container')
      const containerWidth = element.clientWidth

      let fontSize = 300
      this.renderer.setStyle(element, 'font-size', `${fontSize}px`)

      let textWidth = element.scrollWidth

      while (textWidth > containerWidth && fontSize > 10) {
        fontSize -= 1
        this.renderer.setStyle(element, 'font-size', `${fontSize}px`)
        textWidth = element.scrollWidth
      }
    })
  }
}
