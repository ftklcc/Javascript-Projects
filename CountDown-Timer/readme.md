# Dynamic Countdown Timer
This is a functional and clean Countdown Timer project. It calculates the remaining time for a specific launch date and updates the user interface in real-time.

![alt text](./images/preview.png)

## Ne İşe Yarar? (What it does?)
- **Live Updates:** The timer counts down every second without needing a page refresh.
- **Smart Formatting:** Automatically adds a leading zero ( 09 instead of 9) using a custom format function.
- **Auto-Termination:** Once the countdown reaches zero, the timer stops automatically and displays a "Sales Started" message.
- **Dynamic Text:** Shows the exact target date and time on the screen, properly formatted.
  
## Technologies Used

- **HTML5 & CSS3:** For the layout and styling.
- **JavaScript (Vanilla):** Used for all the logic, calculations, and DOM updates. No external libraries were used.
## Technical Implementation Details
- **Modular JS:** Utilizing `import/export` for data management.
- **Functional Programming:** Heavy use of **Arrow Functions** for concise and readable code.
- **Array Methods:** Implementing `.forEach()` to iterate over DOM collections.
- **String Manipulation:** Advanced formatting using **Template Literals** and `.padStart()`.
- **Memory Management:** Using `clearInterval()` to prevent memory leaks once the countdown is complete.
- **Event Handling:** Leveraging `DOMContentLoaded` to ensure the DOM is fully loaded before executing scripts.


## Key Code Components
- **getRemaining():** The main function that handles the math.
- **format():** A helper function that ensures every number has at least two digits.
- **clearInterval():** Stops the background process once the campaign starts to save browser resources.