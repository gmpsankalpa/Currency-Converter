document.addEventListener('DOMContentLoaded', function () {
  const amountInput = document.getElementById('amount');
  const fromCurrencySelect = document.getElementById('fromCurrency');
  const toCurrencySelect = document.getElementById('toCurrency');
  const convertBtn = document.getElementById('convertBtn');
  const resultElement = document.getElementById('result');

  // Fetch currency symbols and populate the dropdowns
  fetch('https://api.exchangerate.host/symbols')
    .then(response => response.json())
    .then(data => {
      const symbols = data.symbols;

      for (const symbol in symbols) {
        const option1 = document.createElement('option');
        option1.value = symbol;
        option1.text = `${symbol} - ${symbols[symbol]}`;
        fromCurrencySelect.add(option1);

        const option2 = document.createElement('option');
        option2.value = symbol;
        option2.text = `${symbol} - ${symbols[symbol]}`;
        toCurrencySelect.add(option2);
      }
    })
    .catch(error => {
      console.error('Error fetching currency symbols:', error);
    });

  convertBtn.addEventListener('click', function () {
    const amount = parseFloat(amountInput.value);
    const fromCurrency = fromCurrencySelect.value;
    const toCurrency = toCurrencySelect.value;

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    fetch(`https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`)
      .then(response => response.json())
      .then(data => {
        const convertedAmount = data.result;
        resultElement.textContent = `Result: ${convertedAmount.toFixed(2)} ${toCurrency}`;
      })
      .catch(error => {
        console.error('Error converting currency:', error);
        alert('An error occurred. Please try again.');
      });
  });
});
