
// async function getCurrency(url){
//     let data = await fetch(url)
//     let response = await data.json()
//     showCurrency(response)
// }

// let url = 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5'

// getCurrency(url)
// function showCurrency(data){
//     let box = document.querySelector('.content')
//     for (let i = 0; i < data.length; i++){
//         if(i == 1) {
//             box.innerHTML += `<hr>`
//         }
//         for (const key in data[i]){
//             box.innerHTML += `<p><strong>${key}</strong>: ${data[i][key]}`
//         }
//     }
// }

const convertButton = document.getElementById('convert');
const amountInput = document.getElementById('amount');
const currencySelect = document.getElementById('currency');
const resultDiv = document.getElementById('result');

convertButton.addEventListener('click', () => {
  const amount = parseFloat(amountInput.value);
  const selectedCurrency = currencySelect.value;

  if (isNaN(amount)) {
    resultDiv.textContent = 'Введіть коректну сумму';
    return;
  }

  fetchExchangeRate(selectedCurrency)
    .then(rate => {
      const convertedAmount = (amount / rate).toFixed(2);
      resultDiv.textContent = `${amount} UAH ${convertedAmount} ${selectedCurrency}`;
    })
    .catch(error => {
      resultDiv.textContent = 'під час отримання курсу валют сталася помилка';
      console.error(error);
    });
});

function fetchExchangeRate(currency) {
  return fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json')
    .then(response => response.json())
    .then(data => {
      const selectedCurrencyData = data.find(item => item.cc === currency);
      if (selectedCurrencyData) {
        return selectedCurrencyData.rate;
      } else {
        throw new Error('Currency not found.');
      }
    });
}