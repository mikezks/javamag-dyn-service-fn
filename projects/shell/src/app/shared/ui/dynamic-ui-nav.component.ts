import { NgClass, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";


export interface DynamicNavConfig {
  label: string;
  link: string;
  icons: string[];
}

@Component({
  selector: 'app-dyn-ui-nav',
  standalone: true,
  imports: [
    NgFor, NgClass,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="nav">
      <li
        *ngFor="let nav of navItems"
        routerLinkActive="active"
      >
        <a [routerLink]="nav.link">
          <i [ngClass]="nav.icons"></i>
          <p>{{ nav.label }}</p>
        </a>
      </li>
    </ul>
  `,
  styles: [`
    .card {
      margin: 20px;
      background-color: #f4f3ef;
    }
  `]
})
export class DynamicUiNavComponent {
  @Input() navItems: DynamicNavConfig[] = [];
}
