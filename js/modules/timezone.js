"use strict";

/**
 * Time Zone Widget Module
 * Allows users to check time in different world cities
 */

export function initTimezone() {
    // Configuration: Add cities you want here
    const cities = [
        { name: "Ha Noi", zone: "Asia/Ho_Chi_Minh", flag: "🇻🇳" },
        { name: "Beijing", zone: "Asia/Shanghai", flag: "🇨🇳" },
        { name: "Houston", zone: "America/Chicago", flag: "🇺🇸" },
        { name: "New York", zone: "America/New_York", flag: "🇺🇸" },
        { name: "London", zone: "Europe/London", flag: "🇬🇧" },
        { name: "Paris", zone: "Europe/Paris", flag: "🇫🇷" },
        { name: "Tokyo", zone: "Asia/Tokyo", flag: "🇯🇵" },
        { name: "Sydney", zone: "Australia/Sydney", flag: "🇦🇺" },
        { name: "San Francisco", zone: "America/Los_Angeles", flag: "🇺🇸" }
    ];

    // Select Elements
    const triggerBtn = document.getElementById('tz-trigger');
    const dropdown = document.getElementById('tz-dropdown');
    
    if (!triggerBtn || !dropdown) {
        console.warn('Timezone widget elements not found');
        return;
    }
    
    let selectedCity = null;
    let timerId = null;

    // Build the Dropdown List
    cities.forEach(city => {
        const btn = document.createElement('button');
        btn.className = 'tz-item';
        btn.innerHTML = `<span class="tz-flag">${city.flag}</span> ${city.name}`;
        
        btn.addEventListener('click', () => {
            selectCity(city);
            toggleDropdown(false);
        });
        
        dropdown.appendChild(btn);
    });

    // Add a "Reset" button at the bottom
    const resetBtn = document.createElement('button');
    resetBtn.className = 'tz-item';
    resetBtn.style.color = '#aaa';
    resetBtn.innerText = "↺ Reset view";
    resetBtn.onclick = () => {
        selectedCity = null;
        triggerBtn.innerHTML = `🌍 Check Time Zone <span class="arrow">▲</span>`;
        toggleDropdown(false);
        clearInterval(timerId);
    };
    dropdown.appendChild(resetBtn);

    // Toggle Dropdown logic
    triggerBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent immediate closing
        toggleDropdown(!dropdown.classList.contains('show'));
    });

    function toggleDropdown(show) {
        if (show) dropdown.classList.add('show');
        else dropdown.classList.remove('show');
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target) && !triggerBtn.contains(e.target)) {
            toggleDropdown(false);
        }
    });

    // Time Update Logic
    function selectCity(city) {
        selectedCity = city;
        updateTime(); // Run once immediately
        
        // Clear existing timer if any
        if (timerId) clearInterval(timerId);
        
        // Start new timer (updates every second)
        timerId = setInterval(updateTime, 1000);
    }

    function updateTime() {
        if (!selectedCity) return;
        
        const timeString = new Date().toLocaleTimeString('en-US', {
            timeZone: selectedCity.zone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });

        triggerBtn.innerHTML = `
            <span style="margin-right:5px">${selectedCity.flag}</span> 
            <strong>${selectedCity.name}:</strong> 
            <span style="margin-left:5px">${timeString}</span>
        `;
    }
}
