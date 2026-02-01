# ⚖️ Interactive Seesaw Balance Sim

A real-time physics simulation built with vanilla JavaScript that calculates torque, balance, and tilt angles based on weights placed on a dynamic seesaw.

## 🚀 Features

- **Dynamic Torque Calculation:** Real-time physics engine calculating $Torque = Force \times Distance$.
- **Visual Feedback:** The plank rotates dynamically using CSS transforms based on the weight distribution.
- **Ghost Placement:** Preview the weight's position and size with a "ghost" element before dropping it.
- **Persistence:** Integrated with **LocalStorage** to save your simulation state—refresh the page and continue where you left off.
- **Event Logging:** A scrollable history tracking every weight dropped, its mass, and its exact position.

## 🧠 Physics Logic

The simulation is based on the **Principle of Moments**. To determine the tilt, the total torque for each side is calculated:

$$\tau_{total} = \sum_{i=1}^{n} (m_i \times d_i)$$

Where:

- $m_i$: Mass of the object.
- $d_i$: Distance from the fulcrum (center).
- **The Angle:** The difference between $\tau_{left}$ and $\tau_{right}$ is mapped to a maximum tilt degree to provide a realistic visual representation.

## 🛠 Tech Stack & Architecture

- **Vanilla JavaScript (ES6+):**
  - **Modular State:** Centralized `State` object for data logic and LocalStorage synchronization.
  - **DOM Optimization:** Uses `appendChild` for performance. Weights are appended as children of the `seesawPlank` to ensure they rotate naturally with the board.
- **CSS3:** Utilizes `transition` for smooth tilting and `absolute` positioning for precise weight placement.

## ⚖️ Trade-offs

- **DOM-Based vs. Canvas Rendering:** I chose **DOM Manipulation** (`appendChild`) over `<canvas>`.
  - _Pros:_ Easier to handle hover effects, accessibility, and CSS-based transitions.
  - _Cons:_ Performance may degrade if hundreds of weights are added simultaneously compared to a specialized canvas engine.
- **Linear Tilt Mapping:** The tilt angle is calculated using a linear mapping of the torque difference. While not a 100% accurate physical rigid-body simulation, it provides a highly intuitive and responsive user experience for a web interface.
- **Internal State vs. DOM State:** The source of truth is kept in a JavaScript object (`State`), and the UI is updated to match. This adds a slight layer of complexity but prevents the "spaghetti code" that happens when you try to read data directly from HTML elements.

## ⚠️ Limitations

- **Fixed Fulcrum:** The support point (fulcrum) is static at the center. The simulation does not currently support asymmetrical planks.
- **Static Weights:** Once a weight is "dropped," it is locked to its position. It does not slide down the plank even if the angle is steep (no friction/sliding physics).
- **Browser Storage Limits:** `LocalStorage` is limited to ~5MB. While sufficient for thousands of weights, a real database would be needed for a persistent global leaderboard or complex save slots.

## 🤖 AI Usage Disclosure

This project was developed with the assistance of **Gemini (AI)**.

- **Logic Refinement:** AI helped optimize the torque calculation formulas and the logic for relative positioning within the rotating plank.
- **Documentation:** The README structure and technical explanations were co-authored with AI to ensure clarity and professional standards.
- **Code Review:** AI was used to identify potential bugs in the LocalStorage synchronization and to suggest the "Ghost Object" preview feature.

## 📋 How to Use

1.  **Move:** Hover your mouse over the seesaw to position the next weight.
2.  **Click:** Drop the weight. The plank will react instantly.
3.  **Monitor:** Check the "Seesaw Log" to see your placement history.
4.  **Reset:** Use the "Reset" button to clear the board and storage.

## 🔮 Future Improvements

- **Drag & Drop:** Allow users to reposition weights after they have been placed.
- **Collision Detection:** Prevent weights from overlapping on the plank.
- **Dynamic Gravity:** A slider to simulate the seesaw on different planets (e.g., Moon or Jupiter).
- **Game Mode:** A "Balance Challenge" where the user must reach an exact $0^\circ$ angle using randomly generated weights.

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/yourusername/seesaw-sim.git](https://github.com/yourusername/seesaw-sim.git)
   ```
