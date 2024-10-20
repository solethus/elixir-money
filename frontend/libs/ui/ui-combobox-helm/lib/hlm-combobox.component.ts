import { HlmIconComponent } from '@spartan-ng/ui-icon-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  BrnPopoverComponent,
  BrnPopoverContentDirective,
  BrnPopoverTriggerDirective,
} from '@spartan-ng/ui-popover-brain';
import { HlmPopoverContentDirective } from '@spartan-ng/ui-popover-helm';
import { provideIcons } from '@ng-icons/core';
import {
  lucideChevronsUpDown,
  lucideCheck,
  lucideSearch,
} from '@ng-icons/lucide';
import { Component, input, signal } from '@angular/core';
import { HlmCommandImports } from '@spartan-ng/ui-command-helm';
import { BrnCommandImports } from '@spartan-ng/ui-command-brain';

export interface ComboBoxOption {
  label: string;
  value: string;
}

@Component({
  selector: 'hlm-combobox',
  standalone: true,
  imports: [
    ...BrnCommandImports,
    ...HlmCommandImports,
    HlmIconComponent,
    HlmButtonDirective,
    BrnPopoverComponent,
    BrnPopoverTriggerDirective,
    HlmPopoverContentDirective,
    BrnPopoverContentDirective,
  ],
  providers: [
    provideIcons({ lucideChevronsUpDown, lucideSearch, lucideCheck }),
  ],
  template: `
    <brn-popover
      [state]="state()"
      (stateChanged)="stateChanged($event)"
      sideOffset="5"
      closeDelay="100"
    >
      <button
        class="w-[200px] justify-between"
        id="edit-profile"
        variant="outline"
        brnPopoverTrigger
        hlmBtn
      >
        @if (currentOption(); as currentOption) {
          {{ currentOption.label }}
        } @else {
          Select {{ name() }}...
        }
        <hlm-icon size="sm" name="lucideChevronsUpDown" />
      </button>
      <brn-cmd
        *brnPopoverContent="let ctx"
        hlmPopoverContent
        hlm
        class="p-0 w-[200px]"
      >
        <hlm-cmd-input-wrapper>
          <hlm-icon name="lucideSearch" />
          <input [placeholder]="'Search' + name() + '...'" brnCmdInput hlm />
        </hlm-cmd-input-wrapper>
        <div *brnCmdEmpty hlmCmdEmpty>No results found.</div>
        <brn-cmd-list hlm>
          <brn-cmd-group hlm>
            @for (option of options(); track option.value) {
              <button
                brnCmdItem
                [value]="option.value"
                (selected)="commandSelected(option)"
                hlm
              >
                <hlm-icon
                  [class.opacity-0]="currentOption()?.value !== option.value"
                  name="lucideCheck"
                  hlmCmdIcon
                />
                {{ option.label }}
              </button>
            }
          </brn-cmd-group>
        </brn-cmd-list>
      </brn-cmd>
    </brn-popover>
  `,
})
export class HlmComboboxComponent {
  options = input.required<ComboBoxOption[]>();
  name = signal<string>('currency');

  currentOption = signal<ComboBoxOption | undefined>(undefined);
  state = signal<'closed' | 'open'>('closed');

  stateChanged(state: 'open' | 'closed') {
    this.state.set(state);
  }

  commandSelected(option: ComboBoxOption) {
    this.state.set('closed');
    if (this.currentOption()?.value === option.value) {
      this.currentOption.set(undefined);
    } else {
      this.currentOption.set(option);
    }
  }
}
