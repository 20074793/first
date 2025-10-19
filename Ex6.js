class XCounter extends HTMLElement {
  static get observedAttributes() { return ['initial', 'step']; }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });

    // Shadow DOM elements
    this.valueEl = document.createElement('span');
    this.incBtn = document.createElement('button');
    this.resetBtn = document.createElement('button');
    this.incBtn.textContent = '+';
    this.resetBtn.textContent = 'Reset';

    // Styles are scoped to the shadow root
    const style = document.createElement('style');
    style.textContent = `
      .wrap {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 10px;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        font-family: system-ui, sans-serif;
        background: #fff;
        margin: 6px;
      }
      .value { font-weight: 700; min-width: 28px; text-align: center; }
      button {
        padding: 4px 10px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: #f8fafc;
        cursor: pointer;
        font-size: 14px;
      }
      button:hover { background: #e0e7ff; }
      button:active { transform: scale(0.98); }
    `;

    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    this.valueEl.className = 'value';
    wrap.append('Count:', this.valueEl, this.incBtn, this.resetBtn);

    root.append(style, wrap);

    // Internal state
    this._count = 0;
    this._initial = 0;
    this._step = 1;

    // Button actions
    this.incBtn.addEventListener('click', () => {
      this._count += this._step;
      this._render();
    });

    this.resetBtn.addEventListener('click', () => {
      this._count = this._initial;
      this._render();
    });

    // Initialize from attributes
    this._syncFromAttr();
    this._render();
  }

  attributeChangedCallback() {
    this._syncFromAttr();
    this._render();
  }

  _syncFromAttr() {
    // initial
    const n = Number(this.getAttribute('initial'));
    this._initial = Number.isFinite(n) ? n : 0;
    if (!this._initializedOnce) {
      // Only set count from initial the first time
      this._count = this._initial;
      this._initializedOnce = true;
    }
    // step
    const s = Number(this.getAttribute('step'));
    this._step = Number.isFinite(s) && s > 0 ? s : 1;
  }

  _render() {
    this.valueEl.textContent = String(this._count);
  }
}

// Guard if the script is included multiple times
if (!customElements.get('x-counter')) {
  customElements.define('x-counter', XCounter);
}
