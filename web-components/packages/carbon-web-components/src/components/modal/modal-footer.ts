/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './modal.scss';

const { prefix } = settings;

/**
 * Modal footer.
 *
 * @element bx-modal-footer
 */
@customElement(`${prefix}-modal-footer`)
class BXModalFooter extends LitElement {
  /**
   * `true` if this modal footer has more than two buttons.
   */
  private _hasMoreThanTwoButtons = false;

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange(event: Event) {
    const { selectorButtons } = this.constructor as typeof BXModalFooter;
    this._hasMoreThanTwoButtons =
      (event.target as HTMLSlotElement)
        .assignedNodes()
        .filter(node => node.nodeType === Node.ELEMENT_NODE && (node as Element).matches(selectorButtons)).length > 2;
    this.requestUpdate();
  }

  render() {
    const { _hasMoreThanTwoButtons: hasMoreThanTwoButtons, _handleSlotChange: handleSlotChange } = this;
    const classes = classMap({
      [`${prefix}--modal-footer`]: true,
      [`${prefix}--modal-footer--three-button`]: hasMoreThanTwoButtons,
    });
    return html`
      <div class="${classes}">
        <slot @slotchange="${handleSlotChange}"></slot>
      </div>
    `;
  }

  /**
   * A selector that selects the child buttons.
   */
  static get selectorButtons() {
    return `${prefix}-btn,${prefix}-modal-footer-button`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXModalFooter;
