# Detaylı Quiz Uygulaması

Bu proje, HTML, CSS ve Vanilla JavaScript kullanılarak geliştirilmiş modern ve etkileşimli bir Quiz Uygulamasıdır. Kullanıcılar farklı kategorilerde bilgilerini test edebilir ve soru sayısını özelleştirebilirler.

## Özellikle

- **Kategori Seçimi:** Çeşitli konulardan seçim yapabilirsiniz (verilerden dinamik olarak yüklenir).
- **Özelleştirilebilir Soru Limiti:** Quiz oturumunuz için soru sayısını (5, 10, 15 veya 20) seçebilirsiniz.
- **Zamanlayıcı Sistemi:** Her soruyu cevaplamak için 10 saniyeniz vardır.
- **Anlık Geri Bildirim:** Doğru ve yanlış cevaplar için anında görsel geri bildirim alırsınız.
- **Skor Takibi:** Quiz sonunda toplam skorunuzu görebilirsiniz.
- **Responsive Tasarım:** Masaüstü ve mobil cihazlarda sorunsuz çalışır.

## Kullanılan Teknolojiler ve Kod Yapısı

Proje, temiz kod prensiplerine uygun olarak modüler bir yapıda geliştirilmiştir. Aşağıda her bir teknolojinin nasıl kullanıldığına dair detaylar verilmiştir:

### 1. HTML (Yapı)

`index.html` dosyası uygulamanın iskeletini oluşturur ve tek sayfa uygulaması (SPA) mantığıyla çalışır.

- **Kapsayıcılar:** Tüm içerik `.container` içinde merkezilenmiştir.
- **Ekran Yönetimi:** Uygulama üç ana bölümden oluşur:
  1.  `config-screen`: Kategori ve soru sayısı seçimi.
  2.  `quiz-screen`: Soruların ve zamanlayıcının gösterildiği aktif oyun ekranı.
  3.  `end-screen`: Sonuçların ve skorun gösterildiği bitiş ekranı.
- **Gizleme Mantığı:** `.hidden` sınıfı kullanılarak aktif olmayan ekranlar gizlenir, JavaScript ile bu sınıflar değiştirilerek ekranlar arası geçiş sağlanır.

### 2. CSS (Tasarım)

`style.css` dosyası modern ve kullanıcı dostu bir arayüz sağlar.

- **Yerleşim (Layout):** Flexbox ve Grid sistemleri kullanılarak duyarlı (responsive) bir düzen oluşturulmuştur.
  - `display: grid`: Kategori ve sayı seçeneklerini düzenli bir ızgara yapısında göstermek için kullanılmıştır.
- **Renk Paleti:** Gradyan arka planlar (`linear-gradient`) ve uyumlu renk tonları kullanılarak estetik bir görünüm elde edilmiştir.
- **Etkileşimler:** `hover` ve `active` durumları için geçiş efektleri (`transition`) eklenmiştir.
- **Geri Bildirim:** Doğru cevaplar için yeşil (`.correct`), yanlış cevaplar için kırmızı (`.incorrect`) renk kodları tanımlanmıştır.

### 3. JavaScript (Mantık)

`assets/js/app.js` dosyası uygulamanın beynidir ve modern ES6+ özellikleri ile yazılmıştır.

#### Temel Fonksiyonlar:

- **DOM Yönetimi:** Tüm HTML elementleri `DOM` objesi altında toplanarak kodun okunabilirliği artırılmıştır.
- `runEvents()`: Sayfa yüklendiğinde gerekli tüm olay dinleyicilerini (click events) başlatır.
- `showConfigButton()`: `questions.js` dosyasından gelen kategorileri dinamik olarak okur ve butonları oluşturur.
- `startQuiz()`: Seçilen ayarlara göre oyunu başlatır, değişkenleri sıfırlar.
- `getRandomQuestion()`: Seçilen kategoriden rastgele bir soru getirir. Daha önce sorulan soruların tekrar gelmemesini (`indexHistory` dizisi ile) sağlar.
- `renderQuestion()`: Soruyu ve şıkları ekrana basar, zamanlayıcıyı başlatır.
- `handleAnswer()`: Kullanıcının cevabını kontrol eder, doğru/yanlış durumuna göre stil ekler ve skoru günceller.
- `startTimer()`: Her soru için 10 saniyelik geri sayımı yönetir. Süre dolduğunda otomatik olarak sonraki adıma geçer.

## Proje Yapısı

```text
Detail-Quiz-App/
├── assets/
│   ├── css/
│   │   └── style.css      # Grid ve Flexbox tabanlı stiller
│   ├── img/               # Görsel varlıklar
│   └── js/
│       ├── app.js         # Ana mantık ve DOM manipülasyonu
│       └── questions.js   # Kategori ve soru veri havuzu
└── index.html             # Ana HTML yapısı
```

## Nasıl Kullanılır

1.  Repoyu klonlayın veya indirin.
2.  `index.html` dosyasını tarayıcınızda açın.
3.  **Ayarlar Ekranı:**
    - Listeden bir kategori seçin.
    - Oturum için istediğiniz soru sayısını belirleyin.
    - "START QUİZ" butonuna tıklayın.
4.  **Quiz Ekranı:**
    - Soruyu okuyun ve süre dolmadan (10sn) bir cevap seçin.
    - Devam etmek için "Next Question" butonuna tıklayın.
5.  **Sonuç Ekranı:**
    - Final skorunuzu görüntüleyin.
    - Tekrar oynamak için "Restart Quiz" butonuna tıklayın.

## Özelleştirme

`assets/js/questions.js` dosyası JSON benzeri bir veri yapısına sahiptir. Buraya yeni objeler ekleyerek kolayca yeni kategoriler oluşturabilirsiniz. `app.js` bu değişiklikleri otomatik olarak algılayacak şekilde tasarlanmıştır.
