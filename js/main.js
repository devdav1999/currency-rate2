console.log('running js for currency rates');

doFetch()

let rates = []

function doFetch(){
	fetch('https://api.exchangeratesapi.io/latest')
	.then(response => response.json())
	.then(data => {
		console.log('Got the data!');
		console.log(data);
		let rates = []
		rates.push(data.rates)
		let base = data.base;
		let date = data.date;
	

		render(rates)
	});
}


function render(rates){
	let firstFourRates = rates.slice(0, 4);
	const currencyName = Object.keys(rates);
	const values = Object.values(rates);
	let chart = document.querySelector('.BarContainer');
	chart.innerHTML = "";
	
	for(let rate of firstFourRates){
		let bar = document.createElement('div');
		let baseHeight = 100;
		bar.classList.add('Bar');
		bar.style.height = baseHeight + 'px';
		bar.textContent = currencyName;
		chart.appendChild(bar);
	}

}


