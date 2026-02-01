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
