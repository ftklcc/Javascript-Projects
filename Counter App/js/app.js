//Counter with state management.
class Counter {
    constructor() {
        // UI mapping
        this.DOM = {
            text: document.querySelector('.text'),
            buttonContainer: document.querySelector('.button-container')
        }
        /// Load state
        this.count = Number(localStorage.getItem('counter')) || 0;
        // Start processes
        this.bindEvents()
        this.render()
    }
    //Save to storage.
    save() {
        localStorage.setItem('counter', this.count)
    }
    //initialize events
    bindEvents() {
        //check if container exists to prevent runtime errors
        if (!this.DOM.buttonContainer) return;

        // Bind context to instance
        this.DOM.buttonContainer.addEventListener(
            'click',
            this.handleButtonClick.bind(this)
        )
    }
    //Event delegation logic.
    handleButtonClick(e) {
        const button = e.target.closest('button')
        if (!button) return;

        if (button.classList.contains('decrease')) this.decrease();
        else if (button.classList.contains('increase')) this.increase();
        else this.reset()
    }
    //decrement count
    decrease() {
        this.count--
        this.update()
    }
    //increment count
    increase() {
        this.count++
        this.update()
    }
    //Reset count
    reset() {
        this.count = 0
        this.update()
    }
    //Sync UI with state
    render() {
        this.DOM.text.textContent = this.count;

        this.DOM.text.classList.remove('positive', 'negative');

        if (this.count > 0) this.DOM.text.classList.add('positive');
        else if (this.count < 0) this.DOM.text.classList.add('negative')
    }
    //Refresh UI and Storage
    update() {
        this.render()
        this.save()
    }
}

//run when the page load
document.addEventListener('DOMContentLoaded', () => {
    new Counter()
})





