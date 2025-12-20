class GetImage {
    // Sınıf oluşturulduğunda ilk çalışan hazırlık kısmı
    constructor() {
        // Unsplash arama servisinin ana adresi (Endpoint)
        this.base_Url = 'https://api.unsplash.com/search/photos'
        // Unsplash  (Access Key)
        this.api_Key = '_HL8Yq4U-V2PCSasxaLxSNF9CVVUPeqHMUjx5hmXxKY'
    }
    // Dışarıdan "value" (arama kelimesi) alan asenkron fonksiyon
    async getPhoto(value) {
        // URL'nin sonuna eklenecek parametreleri (key=value) 
        const params = new URLSearchParams({
            client_id: this.api_Key, // Kimliğimizi doğruluyoruz
            query: value, // Arayacağımız kelime (kedi, köpek vs.)
            per_page: 10 // Sayfa başına kaç tane resim gelsin?
        })

        try {
            // fetch ile internet üzerinden API'ye istek atıyoruz
            // `${...}` kullanımı değişkenleri string içine yerleştirmemizi sağlar
            const response = await fetch(`${this.base_Url}?${params}`)

            // Eğer bağlantı başarılı değilse (404, 500 hatası gibi) durdur ve hatayı göster
            if (!response.ok) throw new Error('Api isteği reddedildi', response.status)

            // API'den gelen karmaşık veriyi (JSON) JavaScript'in anlayacağı objeye çeviriyoruz
            const datas = await response.json()

            // Unsplash arama sonuçlarını "results" adlı bir dizide tutar, sadece onu döndürüyoruz
            return datas.results
        }
        catch (error) {
            // Yukarıdaki try bloğunda herhangi bir hata olursa burası çalışır
            console.log('Veri çekme hatası', error);
        }
    }
}
