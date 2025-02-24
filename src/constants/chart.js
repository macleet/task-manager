export const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        backgroundColor: '#f0f0f0',
        padding: {
            top: 15,
            left: 20, 
            right: 20,
        },
    },
    plugins: {
        legend: {
            position: 'top',
            labels: {
                font: {
                    size: 13, 
                    weight: 600,
                },
                pointStyle: 'rectRounded',
                usePointStyle: true,
                color: "#333b4b",
            },
        },
    },
    scales: {
        x: {
            stacked: false, 
            grid: {
                display: false,
            },
            ticks: {
                font: {
                    size: 11.5,
                    weight: 600,
                },
                color: "#333b4b",
            },
        },
        y: {
            grid: {
                display: false,
                color: "rgb(204, 162, 126)",
            },
            ticks: {
                font: {
                    size: 11,
                    weight: 600,
                },
                maxTicksLimit: 6,
                color: "#333b4b",
            },
            beginAtZero: true,
            title: {
                display: true,
                text: "Hours",
                padding: {
                    bottom: 10
                }
            }
        },
    },
};

export const restedDataset = {
    label: 'Rested',
    data: [],
    backgroundColor: '#547bc9',
    borderRadius: 2,
};

export const workedDataset = {
    label: 'Worked',
    data: [],
    backgroundColor: 'rgb(204, 162, 126)',
    borderRadius: 2,
};

export const daysLabel = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']