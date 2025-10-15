class MyCounter extends HTMLElement {
  constructor() {
    super();

    // Attach shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Add inner HTML to shadow root
    shadow.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: "Inter", system-ui, sans-serif;
        }

        .card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 20px 30px;
          border-radius: 16px;
          background: linear-gradient(145deg, #ffffff, #e6e9ef);
          box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1), 
                      -2px -2px 6px rgba(255, 255, 255, 0.8);
          transition: transform 0.2s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-3px);
          box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.15), 
                      -3px -3px 8px rgba(255, 255, 255, 0.9);
        }

        button {
          background: #4e6ef2;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.3s ease, transform 0.1s ease;
        }

        button:hover {
          background: #3654d1;
        }

        button:active {
          transform: scale(0.97);
        }

        .reset {
          background: #e74c3c;
        }

        .reset:hover {
          background: #c0392b;
        }

        .count {
          font-size: 20px;
          font-weight: 600;
          color: #4e6ef2;
        }
      </style>

      <div class="card">
        <div class="count">Count: <span id="count">0</span></div>
        <div class="buttons">
          <button id="btn">Click Me</button>
          <button id="reset" class="reset">Reset</button>
        </div>
      </div>
    `;

    // Select elements inside shadow root
    this._btn = shadow.querySelector("#btn");
    this._resetBtn = shadow.querySelector("#reset");
    this._countEl = shadow.querySelector("#count");
    this._count = 0;

    // Bind methods
    this._onClick = this._onClick.bind(this);
    this._onReset = this._onReset.bind(this);
  }

  // First function: increment counter
  _onClick() {
    this._count++;
    this._countEl.textContent = String(this._count);
    this._countEl.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.3)" }, { transform: "scale(1)" }],
      { duration: 150 }
    );
  }

  // Second function: reset counter
  _onReset() {
    this._count = 0;
    this._countEl.textContent = "0";
    this._countEl.animate(
      [{ opacity: 0.5 }, { opacity: 1 }],
      { duration: 200 }
    );
  }

  connectedCallback() {
    this._btn.addEventListener("click", this._onClick);
    this._resetBtn.addEventListener("click", this._onReset);
  }

  disconnectedCallback() {
    this._btn.removeEventListener("click", this._onClick);
    this._resetBtn.removeEventListener("click", this._onReset);
  }
}

customElements.define("my-counter", MyCounter);
