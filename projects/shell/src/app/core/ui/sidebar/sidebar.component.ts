import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { PushModule } from '@ngrx/component';
import { DynamicUiService } from '../../../shared/logic/dynamic-ui.service';
import { DynamicUiWidgetComponent } from '../../../shared/ui/dynamic-ui-widget.component';
import { DynamicUiNavComponent } from "../../../shared/ui/dynamic-ui-nav.component";


@Component({
    selector: 'app-sidebar-cmp',
    standalone: true,
    templateUrl: 'sidebar.component.html',
    imports: [
        NgFor, PushModule,
        RouterLinkWithHref, RouterLinkActive,
        DynamicUiWidgetComponent,
        DynamicUiNavComponent
    ]
})
export class SidebarComponent {
  connect = inject(DynamicUiService);
  navItems =  [
    {
      label: 'Home',
      link: '/home',
      icons: ['nc-icon', 'nc-bank']
    },
    {
      label: 'Flights',
      link: '/booking/flight',
      icons: ['nc-icon', 'nc-send']
    },
    {
      label: 'Passengers',
      link: '/booking/passenger',
      icons: ['nc-icon', 'nc-single-02'],
    },
    {
      label: 'Tickets',
      link: '/booking/ticket',
      icons: ['nc-icon', 'nc-tag-content']
    }
  ];
}
