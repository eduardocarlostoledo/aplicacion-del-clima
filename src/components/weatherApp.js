import { useEffect, useState } from "react";
import WeatherForm from "./weatherForm";
import WeatherMainInfo from "./weatherMainInfo";
import styles from './weatherApp.module.css';

export default function WeatherApp(){
    
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        loadInfo();
    }, []);

    useEffect(() => {
        document.title = ` El tiempo en | ${weather?.location.name ?? '' }`;
    }, [weather]);

    /*async function loadInfo(city = "madrid") {
        try {
          const res = await fetch(
            `${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`
          );
    
          const data = await res.json();
    
          setTimeout(() => {
            setWeather(data);
          }, 2000);
        } catch (error) {}
      }*/

    async function loadInfo(city = "Posadas" ) {
        try {
            const request = await fetch(
                `http://api.weatherapi.com/v1/current.json?key=13bad737b81640bcacf221430222012&q=${city}&aqi=no`);
                //`${process.env.REACT_APP_URL}&key=${process.env.REACT_APP_KEY}&q=${city}`);              
      
            const json = await request.json();
            setWeather(json)
            
        } catch (error) {}
    }

    function handleChangeCity(city){
        setWeather(null);
        loadInfo(city);
    }
    
    return (
        <div className={styles.weatherContainer}>
            <WeatherForm onChangeCity={handleChangeCity} />
            <WeatherMainInfo weather={weather}/>
        </div>
        );
}



