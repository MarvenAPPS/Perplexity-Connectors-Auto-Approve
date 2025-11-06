// ==UserScript==
// @name         Auto-Approve Button Clicker
// @author       MarvenAPPS https://github.com/MarvenAPPS/
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Auto-click Approve buttons with draggable sticky note GUI
// @match        https://www.perplexity.ai/search/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let clickCount = 0;
    let appearCount = 0;
    let isRunning = true;
    const clickedButtons = new WeakSet();

    // Create sticky note GUI
    const gui = document.createElement('div');
    gui.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ffd54f 0%, #ffca28 100%);
        color: #333;
        padding: 15px;
        border-radius: 2px;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        font-size: 13px;
        z-index: 999999;
        min-width: 180px;
        box-shadow: 4px 4px 10px rgba(0,0,0,0.3);
        cursor: move;
        transform: rotate(-2deg);
        user-select: none;
    `;
    gui.innerHTML = `
        <div style="margin-bottom: 10px; font-weight: bold; font-size: 14px; border-bottom: 1px solid #f9a825; padding-bottom: 5px;">
            📌 Auto-Approve
        </div>
        <div style="margin: 5px 0;">Appeared: <span id="appear-count">0</span></div>
        <div style="margin: 5px 0;">Clicked: <span id="click-count">0</span></div>
        <button id="toggle-btn" style="
            margin-top: 10px;
            width: 100%;
            padding: 6px;
            border: none;
            border-radius: 4px;
            background: #4caf50;
            color: white;
            font-weight: bold;
            cursor: pointer;
            font-size: 12px;
        ">Running ✓</button>
    `;
    document.body.appendChild(gui);

    const appearSpan = document.getElementById('appear-count');
    const clickSpan = document.getElementById('click-count');
    const toggleBtn = document.getElementById('toggle-btn');

    // Toggle functionality
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isRunning = !isRunning;
        toggleBtn.textContent = isRunning ? 'Running ✓' : 'Stopped ✕';
        toggleBtn.style.background = isRunning ? '#4caf50' : '#f44336';
    });

    // Make GUI draggable
    let isDragging = false;
    let offsetX, offsetY;

    gui.addEventListener('mousedown', (e) => {
        if (e.target === toggleBtn) return;
        isDragging = true;
        offsetX = e.clientX - gui.offsetLeft;
        offsetY = e.clientY - gui.offsetTop;
        gui.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        gui.style.left = (e.clientX - offsetX) + 'px';
        gui.style.top = (e.clientY - offsetY) + 'px';
        gui.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            gui.style.cursor = 'move';
        }
    });

    // Function to find and click Approve buttons
    function findAndClickApprove() {
        if (!isRunning) return;
        
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(btn => {
            if (clickedButtons.has(btn)) return;
            
            const textDiv = btn.querySelector('div[class*="relative"][class*="truncate"]');
            if (textDiv && textDiv.textContent.trim() === 'Approve') {
                appearCount++;
                appearSpan.textContent = appearCount;
                
                btn.click();
                clickCount++;
                clickSpan.textContent = clickCount;
                clickedButtons.add(btn);
            }
        });
    }

    // Use MutationObserver to watch for new buttons
    const observer = new MutationObserver(() => {
        findAndClickApprove();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Initial check
    setTimeout(findAndClickApprove, 1000);
})();
