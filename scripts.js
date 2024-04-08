let votes = [0, 0, 0];
let chart;

// Cek apakah pengguna telah memberikan polling sebelumnya
if (localStorage.getItem('hasVoted')) {
    showResults(); // Jika sudah memberikan polling, tampilkan hasil polling
} else {
    showPoll(); // Jika belum memberikan polling, tampilkan form polling
}

function vote(candidate) {
    // Cek apakah pengguna telah memberikan polling sebelumnya
    if (!localStorage.getItem('hasVoted')) {
        votes[candidate - 1]++;
        showResults();
        localStorage.setItem('hasVoted', true); // Set informasi bahwa pengguna telah memberikan polling
    } else {
        alert('Anda sudah memberikan polling.');
    }
}

function showPoll() {
    document.getElementById('pollContent').style.display = 'block';
    document.getElementById('resultContent').style.display = 'none';
}

function showResults() {
    document.getElementById('pollContent').style.display = 'none';
    document.getElementById('resultContent').style.display = 'block';
    
    if (chart) {
        chart.destroy();
    }
    
    let totalVotes = votes.reduce((a, b) => a + b, 0);
    let percentages = votes.map(vote => ((vote / totalVotes) * 100).toFixed(2));
    
    let ctx = document.getElementById('pollChart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Kandidat 1', 'Kandidat 2', 'Kandidat 3'],
            datasets: [{
                label: 'Jumlah Suara',
                data: percentages,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.raw + '%';
                        }
                    }
                }
            }
        }
    });
}
