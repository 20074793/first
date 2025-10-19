class XCounter extends HTMLElement {
  static get observedAttributes() { return ['initial', 'step']; }

  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });

    // Create internal elements
    this.valueEl = document.createElement('span');
    this.incBtn = document.createElement('button');
    this.resetBtn = document.createElement('button');
    this.incBtn.textContent = '+';
    this.resetBtn.textContent = 'Reset';

    const wrap = document.createElement('div');
    wrap.className = 'wrap';
    this.valueEl.className = 'value';
    wrap.append('Count:', this.valueEl, this.incBtn, this.resetBtn);

    // Scoped styles (only apply inside this component)
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
        background: #ffffff;
        margin: 6px;
        box-shadow: 0 1px 4px rgba(0,0,0,0.1);
        transition: background-color 0.3s ease;
      }
      .wrap.flash {
        background-color: #bbf7d0; /* light green highlight */
      }
      .value {
        font-weight: 700;
        min-width: 28px;
        text-align: center;
      }
      button {
        padding: 4px 10px;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        background: #f8fafc;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s, transform 0.1s;
      }
      button:hover { background: #e0e7ff; }
      button:active { transform: scale(0.97); }
    `;

    root.append(style, wrap);

    // Internal state
    this._count = 0;
    this._initial = 0;
    this._step = 1;
    this._wrap = wrap;

    // Event handlers
    this.incBtn.addEventListener('click', () => {
      this._count += this._step;
      this._render();
    });

    this.resetBtn.addEventListener('click', () => {
      this._count = this._initial;
      this._render();

      // Visual flash effect
      this._wrap.classList.add('flash');
      setTimeout(() => this._wrap.classList.remove('flash'), 400);
    });

    this._syncFromAttr();
    this._render();
  }

  attributeChangedCallback() {
    this._syncFromAttr();
    this._render();
  }

  _syncFromAttr() {
    const n = Number(this.getAttribute('initial'));
    this._initial = Number.isFinite(n) ? n : 0;

    const s = Number(this.getAttribute('step'));
    this._step = Number.isFinite(s) && s > 0 ? s : 1;

    if (!this._initialized) {
      this._count = this._initial;
      this._initialized = true;
    }
  }

  _render() {
    this.valueEl.textContent = String(this._count);
  }
}

if (!customElements.get('x-counter')) {
  customElements.define('x-counter', XCounter);
}
