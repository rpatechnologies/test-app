import "./App.css";
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {
	const rooms = [
		{ room_type: "Queen", vacant_rooms: 5, price: 100 },
		{ room_type: "Double", vacant_rooms: 3, price: 75 },
		{ room_type: "Twin", vacant_rooms: 8, price: 60 },
	];
	const formatPrice = (price) => {
		return "$" + price;
	};

	//basic case is coverd the number which is divisible
	//by 14 can also be divisible by 2 and 7, those cases are not covered due
	//to lake of clarification about the functionlity required
	const checkNum = (num) => {
		if (num % 14 == 0) {
			console.log("foobar");
		} else if (num % 7 == 0) {
			console.log("bar");
		} else if (num % 2 == 0) {
			console.log("foo");
		} else {
			console.log(num);
		}
	};

	useEffect(() => {
		checkNum(14);
	}, []);


	const [cities, setCity] = useState([]);
	const [forecast, setForeCast] = useState("");
	const [selectedCity, setSelectedCity] = useState("");

	const handleCitySearch = (event) => {

		let keyword = event.target.value;
		if(keyword && keyword!='')
		{
			axios.get('https://www.metaweather.com/api/location/search?query='+keyword).then((response) => {
				let data = response.data;
				setCity(data);
			}).catch((error) => {
				console.log(error);
			});
		}
		else
		{
			setCity([]);
		}
	};

	const getWeatherForcast = (citydata) => {
		// console.log(citydata);
		let cityId = citydata.woeid;
		let cityName = citydata.cityname;

		setSelectedCity(cityName);

		var today = new Date();
		var dd = today.getDate();
        var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();
		var currentDate = yyyy + '/' + mm + '/' + dd;

		axios.get('https://www.metaweather.com/api/location/'+cityId+'/'+currentDate).then((response) => {
			let data = response.data;
			var forcastData = data[0];
			setForeCast(forcastData);
		}).catch((error) => {
			console.log(error);
		});
	}

	return (
		<div className="App">
			<ol>
				{rooms.map((item, index) => {
					return (
						<li>
							{item.room_type},{item.vacant_rooms}, {formatPrice(item.price)}
						</li>
					);
				})}
			</ol>

			<br/>	
			<br/>	
			<br/>	
			<br/>	
			<br/>	
			<b><hr/></b>
			<b><center>Weather Forecast</center></b>
			<b><hr/></b>
			<br/>	
			<br/>	
			<br/>

			<input type="text" placeholder="Enter City Name" onKeyUp={(text) => handleCitySearch(text)}/>

			{cities.map((item, index) => {
				return (
					<a href="#" onClick={() => getWeatherForcast({woeid:item.woeid,cityname:item.title})}><center>{item.title}</center></a>
				);
			})}

			<br/>	
			<br/>	
			<br/>
			{forecast && forecast!='' ? (
			<table>
				<tr>
					<th>City Name</th>
					<th>Weather State</th>
					<th>Temperature</th>
					<th>Humidity</th>
				</tr>
				<tr>
					<td>{selectedCity}</td>
					<td>{forecast.weather_state_name}</td>
					<td>{forecast.the_temp}</td>
					<td>{forecast.humidity}</td>
				</tr>
			</table>
			) : null }

		</div>
	);
}

export default App;

