function vote(candidate, position) {
    const userIP = getUserIP(); // Mendapatkan IP pengguna
    
    // Memeriksa apakah pengguna telah memberikan suara dari IP yang sama sebelumnya
    if (votedIPs.includes(userIP)) {
        alert("Anda sudah memberikan suara untuk Kepala Daerah dan Wakil Kepala Daerah.");
        return;
    }
    
    // Jika belum memberikan suara, tambahkan IP ke daftar votedIPs
    votedIPs.push(userIP);

    if (position === 'head') {
        headVotes[candidate - 1]++; // Menambah jumlah suara untuk Kepala Daerah
    } else if (position === 'vp') {
        vpVotes[candidate - 1]++; // Menambah jumlah suara untuk Wakil Kepala Daerah
    }
    showResults();
}



// Simpan hasil vote kepala daerah ke dalam localStorage
localStorage.setItem('headVotes', JSON.stringify(headVotes));

// Simpan hasil vote wakil kepala daerah ke dalam localStorage
localStorage.setItem('vpVotes', JSON.stringify(vpVotes));
