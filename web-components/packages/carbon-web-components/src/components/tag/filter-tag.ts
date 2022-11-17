/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, query, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import Close16 from '@carbon/icons/lib/close/16';
import FocusMixin from '../../globals/mixins/focus';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import { TAG_SIZE, TAG_TYPE } from './defs';
import styles from './tag.scss';

export { TAG_SIZE, TAG_TYPE };

const { prefix } = settings;

/**
 * Filter tag.
 *
 * @element bx-filter-tag
 */
@customElement(`${prefix}-filter-tag`)
export default class BXFilterTag extends HostListenerMixin(FocusMixin(LitElement)) {
  @query('button')
  protected _buttonNode!: HTMLButtonElement;

  /**
   * Handles `click` event on this element.
   *
   * @param event The event.
   */
  @HostListener('shadowRoot:click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    if (event.composedPath().indexOf(this._buttonNode!) >= 0) {
      if (this.disabled) {
        event.stopPropagation();
      } else if (this.open) {
        const init = {
          bubbles: true,
          cancelable: true,
          composed: true,
          detail: {
            triggeredBy: event.target,
          },
        };
        if (this.dispatchEvent(new CustomEvent((this.constructor as typeof BXFilterTag).eventBeforeClose, init))) {
          this.open = false;
          this.dispatchEvent(new CustomEvent((this.constructor as typeof BXFilterTag).eventClose, init));
        }
      }
    }
  };

  /**
   * Text to show on filter tag "clear" buttons. Corresponds to the attribute with the same name
   */
  @property({ type: String, reflect: true })
  title = 'Clear filter';

  /**
   * `true` if the tag should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the tag should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  /**
   * The size of the tag.
   */
  @property({ reflect: true })
  size = TAG_SIZE.REGULAR;

  /**
   * The type of the tag.
   */
  @property({ reflect: true })
  type = TAG_TYPE.RED;

  render() {
    const { disabled } = this;
    return html`
      <slot></slot>
      <button class="${prefix}--tag__close-icon" ?disabled=${disabled}>${Close16({ 'aria-label': this.title })}</button>
    `;
  }

  /**
   * The name of the custom event fired before this tag is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this tag.
   */
  static get eventBeforeClose() {
    return `${prefix}-filter-tag-beingclosed`;
  }

  /**
   * The name of the custom event fired after this tag is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-filter-tag-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}
