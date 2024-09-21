document.getElementById('export').addEventListener('click', () => {
    const skipKiosks = document.getElementById('skipKiosks').checked;
    const includeExpenses = document.getElementById('includeExpenses').checked;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: "export_history", skipKiosks, includeExpenses });
    });
  });
  