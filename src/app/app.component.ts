// We need Inject and PLATFORM_ID for localStorage to work with SSR
import {Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular8-SSR';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // This is how you can user window, localStorage and document
      window.scrollTo(0, 0);

      const item = {key1: 'value1', key2: 'value2'};
      localStorage.setItem('testItem', JSON.stringify(item));
    }
  }
}
