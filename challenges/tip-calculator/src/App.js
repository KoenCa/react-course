/*
- Components:
    - Bill
    - ServicePercentage x 2
        - Reusable
        - Changeable text
        - Percentages
            - Dissatisfied (0%)
            - It was okay (5%)
            - It was good (10%)
            - Absolutelty amazing! (20%)
    - Result
        - Gets bill and two Percentages
        - Derived state calculates the tip
            - Average of the two percentages is used to calculate it
    - Reset
        - Button that resets all inputs to default state.
*/

import { Bill } from "./components/Bill";
import { ServicePercentage } from "./components/ServicePercentage";
import { Result } from "./components/Result";
import { Reset } from "./components/Reset";

export default function App() {
  return (
    <div>
      <h1>Tip Calculator</h1>

      <Bill />
      <ServicePercentage />
      <Result />
      <Reset />
    </div>
  );
}
