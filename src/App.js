import React from "react";
import Weather from "./components/weather";
import Form from "./components/form";

import Titles from "./components/titles";

const Api_Key = "b086f92cd507261001122d4fa2ea4d52";

class App extends React.Component {

  state = {

    temperature: undefined,                 //setting the state to be undefined so when the user inputs the city or country then setstates calls it 
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  //getWeather is used to make the api call
  getWeather = async (e) => {

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();   
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}&units=metric`);   //fetching the api of the weather
    const response = await api_call.json();              
    if(city && country){
      //setstate gets the output from the api 
      this.setState({
        temperature: response.main.temp,
        city: response.name,
        country: response.sys.country,
        humidity: response.main.humidity,
        description: response.weather[0].description,
        error: ""
      })
    }else{
      this.setState({
        error: "input values"
      })
    }
  }
//
  render() {
//each state is passed as props to the weather component so we can access the weather.js props.
    return (

            <div className="container">
              <div className="row">
              
                <Titles />
                </div>
                <div className="col-xs-7 form-container">
                <Form loadWeather={this.getWeather} />
                  <Weather
                    temperature={this.state.temperature}                           
                    city={this.state.city}
                    country={this.state.country}
                    humidity={this.state.humidity}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              
            </div>
        
    )
  }
}
export default App;
