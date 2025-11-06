# Perplexity Auto-Approve Connector

A Tampermonkey userscript that automatically approves GitHub connector interactions on Perplexity AI, eliminating repetitive manual clicking.

## ✨ Features

- **Auto-approval** - Automatically detects and clicks "Approve" buttons for GitHub connector requests
- **Draggable sticky note GUI** - Visual counter display that can be moved anywhere on screen
- **Start/Stop toggle** - Pause and resume auto-approval with one click
- **Session tracking** - Counts appeared and clicked buttons (resets on page refresh)
- **Zero configuration** - Works immediately after installation

## 🎯 Use Case

When using Perplexity AI with the GitHub connector enabled, you're frequently prompted to approve connector actions. This script automates those approvals, streamlining your workflow.

> **Note:** While designed for GitHub connector approvals, this script may work with other Perplexity connectors that use similar approval buttons.

## 📋 Prerequisites

- [Tampermonkey](https://www.tampermonkey.net/) browser extension
- Perplexity AI account with GitHub connector access
- Chrome, Firefox, Edge, or Safari browser

## 🚀 Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) for your browser
2. Click the Tampermonkey icon in your browser toolbar
3. Select **"Create a new script"**
4. Delete the default template code
5. Copy and paste the script code from `auto-approve.user.js`
6. Press `Ctrl+S` (or `Cmd+S` on Mac) to save
7. Navigate to [Perplexity AI](https://www.perplexity.ai/)

## 🎮 Usage

### Basic Operation

Once installed, the script runs automatically on all pages. A yellow sticky note appears in the top-right corner showing:

- **Appeared**: Total number of "Approve" buttons detected
- **Clicked**: Total number automatically clicked

### Controls

- **Move GUI**: Click and drag the sticky note anywhere on screen
- **Toggle On/Off**: Click the button to pause (red "Stopped ✕") or resume (green "Running ✓") auto-approval
- **Reset Counters**: Refresh the page to reset counts to zero


