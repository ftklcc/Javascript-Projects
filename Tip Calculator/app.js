class TipCalculator {
    //Değişkenler tanımlandı
    constructor() {
        this.amount = document.querySelector('.amount')
        this.tip = document.querySelector('.tip')
        this.calcBtn = document.querySelector('.calc')
        this.result = document.querySelector('.result')
        this.resetBtn = document.querySelector('.reset')
        this.modal = document.querySelector('.modal')
        this.closeModal = document.querySelector('.fa-x')

        this.runEvents()
    }
    //Tıklama olayları tetiklendi
    runEvents() {
        this.calcBtn.addEventListener('click', () => this.calculate())
        this.resetBtn.addEventListener('click', () => this.reset())
        this.closeModal.addEventListener('click', () => this.hideModal())
    }
    //Hesaplama işlemi ve değerler boş ise uyarı kutusu
    calculate() {
        const amountValue = parseFloat(this.amount.value.trim())
        const tipValue = parseFloat(this.tip.value.trim())


        if (isNaN(amountValue) || isNaN(tipValue)) {
            this.modal.classList.add('active')
            return;
        }
        const tipPercent = amountValue * (tipValue / 100)
        const Total = amountValue + tipPercent
        this.result.innerHTML = `
        Bahşiş: ${tipPercent.toFixed(2)} TL<br>
        Toplam Tutar: ${Total.toFixed(2)} TL
        `
    }
    // Hesaplama işlemleri sonrası form temizleme
    reset() {
        this.amount.value = "";
        this.tip.value = "";
        this.result.innerHTML = "Liste Temizlendi";
        setTimeout(() => {
            this.result.innerHTML = ""
        }, 2000)
    }
    // Uyarı kutusunu kapatma
    hideModal() {
        this.modal.classList.remove('active')
    }
}

const tips = new TipCalculator()








































































// class TipCalculator {
//     constructor() {
//         this.amount = document.querySelector('.amount');
//         this.tip = document.querySelector('.tip');
//         this.calcBtn = document.querySelector('.calc');
//         this.result = document.querySelector('.result');
//         this.resetBtn = document.querySelector('.reset');
//         this.modal = document.querySelector('.modal');
//         this.closeModal = document.querySelector('.fa-x');

//         this.addEventListeners();
//     }

//     addEventListeners() {
//         this.calcBtn.addEventListener('click', () => this.calculator());
//         this.resetBtn.addEventListener('click', () => this.reset());
//         this.closeModal.addEventListener('click', () => this.hideModal());
//     }

//     calculator() {
//         const amountValue = parseFloat(this.amount.value.trim());
//         const tipPercent = parseFloat(this.tip.value.trim());

//         if (isNaN(amountValue) || isNaN(tipPercent)) {
//             this.modal.classList.add('active')
//             return;
//         }

//         const tipAmount = amountValue * (tipPercent / 100);
//         const total = amountValue + tipAmount;

//         this.result.innerHTML = `
//       Bahşiş: ₺${tipAmount.toFixed(2)}<br>
//       Toplam Tutar: ₺${total.toFixed(2)}
//     `;


//     }

//     reset() {
//         this.amount.value = '';
//         this.tip.value = '';
//         this.result.textContent = '';
//         this.hideModal();
//     }

//     hideModal() {
//         this.modal.classList.remove('active')
//     }
// }






// const newTip = new TipCalculator()