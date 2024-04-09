

    let chartHead;
    let chartVP;

    function showPoll(section) {
        if (section === 'poll') {
            window.location.href = "index.html";
        } else if (section === 'result') {
            document.getElementById('pollContent').style.display = 'none';
            document.getElementById('resultContent').style.display = 'block';
            showResults();
        }
    }

    function showResults() {
        if (chartHead) {
            chartHead.destroy();
        }
        if (chartVP) {
            chartVP.destroy();
        }

        // Ambil data hasil polling dari halaman index.html
        let headVotes = [];
        let vpVotes = [];
        let candidateNames = [];
        let candidateElements = document.querySelectorAll('.candidate');

        // Loop melalui setiap elemen kandidat pada halaman index.html
        candidateElements.forEach((candidate) => {
            let candidateName = candidate.querySelector('p').textContent;
            candidateNames.push(candidateName);
            let votes = candidate.getAttribute('data-votes');
            let position = candidate.getAttribute('data-position');

            // Tambahkan jumlah suara ke array yang sesuai berdasarkan posisi kandidat
            if (position === 'head') {
                headVotes.push(votes);
            } else if (position === 'vp') {
                vpVotes.push(votes);
            }
        });

        let ctxHead = document.getElementById('pollChartHead').getContext('2d');
        let ctxVP = document.getElementById('pollChartVP').getContext('2d');

        chartHead = new Chart(ctxHead, {
            type: 'bar',
            data: {
                labels: candidateNames,
                datasets: [{
                    label: 'Kepala Daerah',
                    data: headVotes,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
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
                    title: {
                        display: true,
                        text: 'Hasil Polling Kepala Daerah'
                    }
                }
            }
        });

        chartVP = new Chart(ctxVP, {
            type: 'bar',
            data: {
                labels: candidateNames,
                datasets: [{
                    label: 'Wakil Kepala Daerah',
                    data: vpVotes,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
                    title: {
                        display: true,
                        text: 'Hasil Polling Wakil Kepala Daerah'
                    }
                }
            }
        });
    }

