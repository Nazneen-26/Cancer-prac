const donations = [
  { name: "Amit Sharma", amount: 500, date: "2024-12-01" },
  { name: "Neha Khan", amount: 1200, date: "2024-12-02" },
  { name: "Rahul Verma", amount: 800, date: "2024-12-03" },
  { name: "Sneha Patel", amount: 1500, date: "2024-12-04" },
  { name: "Arjun Singh", amount: 600, date: "2024-12-05" }
];

const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);
document.getElementById("totalDonations").innerText = "₹" + totalAmount;
document.getElementById("totalDonors").innerText = donations.length;

const table = document.getElementById("donationTable");
table.innerHTML = ""; // Clear existing table data from HTML
donations.forEach(d => {
  table.innerHTML += `
    <tr>
      <td>${d.name}</td>
      <td>₹${d.amount}</td>
      <td>${d.date}</td>
    </tr>
  `;
});

// Donation Form Submission Logic
document.getElementById('donationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const amountInput = this.querySelector('input[type="number"]');
    const amount = parseInt(amountInput.value);
    
    if (amount > 0) {
        // Simple simulation of donation logging
        const newDonation = { 
            name: this.querySelector('input[type="text"]').value || "Anonymous", 
            amount: amount, 
            date: new Date().toISOString().slice(0, 10) 
        };
        donations.push(newDonation);

        // Update Stats (for the current session)
        const currentTotal = donations.reduce((sum, d) => sum + d.amount, 0);
        document.getElementById("totalDonations").innerText = "₹" + currentTotal;
        document.getElementById("totalDonors").innerText = donations.length;

        // Update Table
        const newRow = document.createElement('tr');
        newRow.innerHTML = `<td>${newDonation.name}</td><td>₹${newDonation.amount}</td><td>${newDonation.date}</td>`;
        document.getElementById("donationTable").prepend(newRow); // Add to top

        // Show success message
        const successMessage = document.getElementById("successMessage");
        successMessage.classList.remove('hidden');
        setTimeout(() => successMessage.classList.add('hidden'), 3000);

        // Reset form and update chart
        this.reset();
        updateChart();
    }
});

function updateChart() {
    const ctx = document.getElementById("donationChart").getContext("2d");
    
    // Destroy existing chart if it exists
    if (window.myLineChart) {
        window.myLineChart.destroy();
    }
    
    // Create new chart
    window.myLineChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: donations.map(d => d.date),
            datasets: [{
                label: "Donations",
                data: donations.map(d => d.amount),
                borderColor: "#ffffff",
                backgroundColor: "rgba(255,255,255,0.2)",
                tension: 0.4,
                fill: true,
                pointBackgroundColor: "#e91e63",
                pointBorderColor: "#ffffff"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 1500,
                easing: 'easeInOutCubic'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false
                }
            }
        }
    });
}

// Initial chart rendering with a slight delay for smooth animation
setTimeout(updateChart, 100);