# Steam Transaction History Exporter

This is a Firefox extension that allows users to export their Steam transaction history from the account history page to a CSV file. The extension provides options to skip kiosk purchases and include total expenses.

## Features

- Export transaction history to CSV format.
- Option to skip purchases made through kiosks.
- Option to include an "Expenses" column that captures total purchases (excluding refunded transactions).

## Installation

### Prerequisites

- Firefox browser
- Basic understanding of how to install Firefox extensions

### Steps to Install

1. **Clone the Repository**:

   Open your terminal and run the following command:

   ```bash
   git clone https://github.com/EnchantedGoldenApple/Steam-History-Exporter.git
   ```

2. **Load the Extension in Firefox**:
   - Open Firefox and type `about:debugging#/runtime/this-firefox` in the address bar.
   - Click on the "Load Temporary Add-on" button.
   - Select the `manifest.json` file from the extension directory.

### Using the Extension:

- Go to your Steam account's transaction history page: [https://store.steampowered.com/account/history/](https://store.steampowered.com/account/history/).
- Click on the extension icon in the toolbar.
- Choose whether to skip kiosk purchases and whether to include the expenses column.
- Click the "Export to CSV" button to download your transaction history.

## Usage

The exported CSV file will contain the following columns:
- Date
- Items
- Type
- Total
- Wallet Change
- Wallet Balance

- Expenses (if selected)

## Contributing

Contributions are welcome! If you have suggestions or improvements, feel free to open an issue or submit a pull request.

     Feel free to modify any parts as needed!
