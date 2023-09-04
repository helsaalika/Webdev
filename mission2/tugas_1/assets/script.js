
const produkList = document.getElementById('produkList');
const produkDipilih = []; // Daftar produk yang dipilih
const produkDipilihContainer = document.getElementById('produkDipilih');
const cetakStrukButton = document.getElementById('cetakStrukButton');

//data-data produk
const produkData = [
    { foto: 'assets/img/boba.png', harga: 20000, nama: 'Minuman Boba'},
    { foto: 'assets/img/tea.jfif', harga: 15000, nama: 'Minuman Hot Tea'},
    { foto: 'assets/img/coffee.jfif', harga: 25000, nama: 'Minuman Coffee'},
    { foto: 'assets/img/donat.png', harga: 10000, nama: 'Makanan Donat'},
    { foto: 'assets/img/cake.jfif', harga: 15000, nama: 'Makanan Choco Cake'},
    { foto: 'assets/img/ice.jfif', harga: 10000, nama: 'Vanilla Ice Cream'},
];

produkData.forEach(item => {
    //mmebuat card
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-md-4 mb-3';
    cardDiv.innerHTML = `
        <div class="card shadow">
            <div class="row no-gutters">
                <div class="col-md-4 d-flex align-items-center justify-content-center">
                    <!-- Gambar -->
                    <img src="${item.foto}" alt="Gambar" class="img-fluid card-img-top">
                </div>
                <div class="col-md-8">
                    <!-- Teks -->
                    <div class="card-body">
                        <h5 class="card-title" id="nama-produk">${item.nama}</h5>
                        <p class="card-text" id="harga">Rp. ${item.harga}</p>
                        <div class="input-group">
                            <button class="btn btn-outline-secondary" type="button" id="kurang">-</button>
                            <input type="text" class="form-control" id="jumlah" value="0"> <!-- Ubah nilai default menjadi 0 -->
                            <button class="btn btn-outline-secondary" type="button" id="tambah">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    produkList.appendChild(cardDiv); // Tambahkan card ke dalam produkList

    const jumlahInput = cardDiv.querySelector('#jumlah');// Ambil elemen-elemen yang diperlukan dalam card
    const tambahButton = cardDiv.querySelector('#tambah');
    const kurangButton = cardDiv.querySelector('#kurang');

    tambahButton.addEventListener('click', () => { // Tambahkan event listener untuk tombol tambah
        let jumlah = parseInt(jumlahInput.value);
        jumlah += 1;

        jumlahInput.value = jumlah; // Update nilai input jumlah

        // cek apakah produk sudah ada di dalam daftar produk yang dipilih
        const index = produkDipilih.findIndex(produk => produk.nama === item.nama);
        if (index !== -1) { // Jika produk sudah ada, tambahkan jumlah dan harga
            produkDipilih[index].jumlah += 1;
            produkDipilih[index].jumlah * item.harga;
        } else { // Jika produk belum ada, tambahkan produk ke dalam daftar
            produkDipilih.push({
                foto: item.foto,
                nama: item.nama,
                harga: item.harga,
                jumlah: 1 // Jumlah default saat menambahkan
            });
        }
        
        // Tampilkan data produk yang dipilih di konten kanan
        tampilkanDataProdukDipilih();
    });

    kurangButton.addEventListener('click', () => {  // Tambahkan event listener untuk tombol kurang
        let jumlah = parseInt(jumlahInput.value); // Ambil nilai saat ini dari input jumlah
    
        if (jumlah > 0) {  // Pastikan tidak kurang dari 0
            jumlah -= 1;
            jumlahInput.value = jumlah;
    
            // Cek apakah produk sudah ada di dalam daftar produk yang dipilih
            const index = produkDipilih.findIndex(produk => produk.nama === item.nama);
            if (index !== -1) { // Jika produk sudah ada dan jumlah lebih dari 0, kurangi jumlah dan harga
                if (produkDipilih[index].jumlah > 0) {
                    produkDipilih[index].jumlah -= 1;
                    produkDipilih[index].jumlah * item.harga;
                }
                if (produkDipilih[index].jumlah === 0) { // Hapus produk dari daftar jika jumlah menjadi 0
                    produkDipilih.splice(index, 1);
                }
            }
            
            tampilkanDataProdukDipilih(); // Tampilkan data produk yang dipilih di konten kanan
        }
    });
});

function tombolCetak() {
    const tombolCetakStruk = document.getElementById('cetakStrukButton');
    if (produkDipilih.length > 0) {
      tombolCetakStruk.style.display = 'block'; // Tampilkan tombol jika ada produk yang dipilih
    } else {
      tombolCetakStruk.style.display = 'none'; // Sembunyikan tombol jika tidak ada produk yang dipilih
    }
}

function tampilkanDataProdukDipilih() {
    const totalHargaElement = document.getElementById('totalHarga');
    const pajak = document.getElementById('pajak');
    const total = document.getElementById('total');

    produkDipilihContainer.innerHTML = '';

    let totalHarga = 0;

    produkDipilih.forEach(produk => {
        const produkItem = document.createElement('div'); // Buat elemen produk
        produkItem.className = 'produk-item';

        const gambarKecil = document.createElement('img');  // Buat elemen gambar kecil
        gambarKecil.src = produk.foto;
        gambarKecil.className = 'gambar-kecil';

        const namaProduk = document.createElement('p'); // Buat elemen nama produk
        namaProduk.textContent = produk.nama;

        const jumlahHarga = document.createElement('p'); // Buat elemen jumlah dan harga
        jumlahHarga.textContent = `Jumlah : ${produk.jumlah}, Harga Rp.${produk.harga * produk.jumlah}`;

        produkItem.appendChild(gambarKecil); // Tambahkan elemen-elemen ke dalam produkItem
        produkItem.appendChild(namaProduk);
        namaProduk.appendChild(jumlahHarga);

        produkDipilihContainer.appendChild(produkItem); // Tambahkan produkItem ke dalam produkDipilihContainer
        produkDipilihContainer.appendChild(document.createElement('hr'));

        totalHarga += produk.harga * produk.jumlah; // Tambahkan harga produk ke total harga

    });

    if (produkDipilih.length > 0) { //menampilkan harga dan pajak di konten kanan
        totalHargaElement.textContent = `Total Harga: Rp. ${totalHarga}`;
        totalHargaElement.style.display = 'block';
        totalHargaElement.style.textAlign = 'right';
        pajak.textContent = `Pajak (11%) : Rp. ${totalHarga*0.11}`;
        pajak.style.display = 'block';
        total.textContent = `Total yang harus dibayar : Rp.${totalHarga+(totalHarga*0.11)}`;
        total.style.display = 'block';
    } else {
        totalHargaElement.style.display = 'none'; // Sembunyikan elemen total harga jika tidak ada produk yang dipilih
    }

    tombolCetak();
}

cetakStrukButton.addEventListener('click', () => {
    isiModalProdukDipilih(); // Panggil fungsi untuk memanggil modal
});

// Fungsi memanggil modal
function isiModalProdukDipilih() {
    const tanggalStrukElement = document.getElementById('tanggalStruk');
    const totalHargaStrukElement = document.getElementById('totalHargaStruk');
    const produkDipilihModalElement = document.getElementById('produkDipilihModal');
    const pajak = document.getElementById('pajakModal');
    const total = document.getElementById('totalModal');
  
    const tanggal = new Date().toLocaleDateString(); // Tambahkan tanggal
    tanggalStrukElement.textContent = tanggal;
  
    let totalHargaKeseluruhan = 0; // Hitung total harga keseluruhan
    produkDipilih.forEach(produk => {
      totalHargaKeseluruhan += produk.harga * produk.jumlah;
    });
  
    totalHargaStrukElement.textContent = totalHargaKeseluruhan.toLocaleString();
    pajak.textContent = totalHargaKeseluruhan * 0.11;
    total.textContent = (totalHargaKeseluruhan * 0.11)+totalHargaKeseluruhan;
  
    produkDipilihModalElement.innerHTML = '';
  
    produkDipilih.forEach(produk => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${produk.nama}</td>
        <td>${produk.jumlah}</td>
        <td>Rp. ${produk.harga * produk.jumlah.toLocaleString()}</td>
      `;
      produkDipilihModalElement.appendChild(row);
    });
}
  

tampilkanDataProdukDipilih();


