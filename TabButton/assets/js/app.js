const about = document.querySelector('.about');
const btns = document.querySelectorAll('.btn');
const contents = document.querySelectorAll('.content');

about.addEventListener('click', e => {
    // Tkklanan elemanlarin data=id özelliğini al. data-id yok ise işlem durur.
    const id = e.target.dataset.id
    if (!id) return
    // Tüm butonların ve içeriklerin "active" özelliğini kaldırı.
    btns.forEach(btn => btn.classList.remove('active'))
    contents.forEach(content => content.classList.remove('active'))
    // Tıklanan butonu "active" ekler
    e.target.classList.add('active')
    // About içinde id olanlara active ekler burada karışıklık olmaz 
    // sadece about içinden işlem yapılmaktadır.
    const el = document.getElementById(id)
    if (el) {
        el.classList.add('active')
    }

})

//! İkinci Yöntem about seçilmeden de işlem yapılabilir.

//BTN CLASS Active deActive
// btns.forEach(btn => {
//     // Her bir butona sadece bir kez olay dinleyicisi ekleniyor.
//     btn.addEventListener('click', () => {
//         // 1. Tüm butonların 'active' sınıfını temizle.
//         btns.forEach(item => {
//             item.classList.remove('active')
//         })
//         // 2. Tıklanan butonu aktifleştir.
//         btn.classList.add('active')
//         // 3. Tüm içeriklerin 'active' sınıfını temizle ve sadece ilgili olanı göster.
//         const targetId = btn.dataset.id
//         contents.forEach(cont => {
//             // content'in id'si, tıklanan butonun data-id'si ile eşleşiyorsa aktifleştir.
//             if (cont.id === targetId) {
//                 cont.classList.add('active')
//             } else {
//                 cont.classList.remove('active')
//             }
//         })

//     })
// })



