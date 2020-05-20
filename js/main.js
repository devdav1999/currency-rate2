console.log('running js for currency rates');

let baseCurrency = '';
let mainCountries = ["HKD", "USD", "AUD", "GBP", "CAD"];


doFetch('EUR')



function doFetch(baseCurrency){
	let rates = [];
	// let mainCountries = ["HKD", "USD", "AUD", "GBP", "CAD"];

	fetch('https://api.exchangeratesapi.io/latest?base=' + baseCurrency)
	.then(response => response.json())
	.then(data => {
		console.log('Got the data!');
		console.log(data);
		console.log(data.rates);
		rates.push(data.rates);
		console.log(rates[0]);


	// create graphs
		
	let chart = document.querySelector('.BarContainer');

	
	chart.innerHTML = "";
	for(let country of mainCountries){
		console.log(country);
		let bar = document.createElement('div');
		let baseHeight = ((1.00/rates[0][country]) * 100);
		bar.classList.add('Bar');
		bar.style.height = baseHeight + '%';
		bar.textContent = country;
		bar.addEventListener("click", function(event){
			alert('1 ' + baseCurrency + ' =' + rates[0][country] + ' ' + country);
		})
		chart.appendChild(bar);
		}

		
	//currency-navigation 
	let nav = document.querySelector('.currencyNav');
	nav.innerHTML = "";
	for(let country of Object.keys(rates[0])){
		let navCurrency = document.createElement('div');
		navCurrency.classList.add('countrySelection');
		navCurrency.textContent = country; 
		navCurrency.onclick = () => {
			mainCountries.push(country);
			console.log('testing on click');
			console.log(country);
			let bar = document.createElement('div');
			let baseHeight = ((1.00/rates[0][country]) * 100);
			bar.classList.add('Bar');
			bar.style.height = baseHeight + '%';
			bar.textContent = country;
			bar.addEventListener("click", function(event){
				alert('1 ' + baseCurrency + ' =' + rates[0][country] + ' ' + country);
			})
			chart.appendChild(bar);
		 }

		nav.appendChild(navCurrency);
		
	}

	//drop-down
	let currencyDrop = document.querySelector('.CurrencyChooser-select');
	for(let country of Object.keys(rates[0])){
		let countryOpt = document.createElement('option');
		countryOpt.textContent = country;
		currencyDrop.appendChild(countryOpt);
	}


		
	});
}


function changebase() {
	baseCurrency = event.target.value;
	console.log(mainCountries);
	doFetch(baseCurrency);
}
