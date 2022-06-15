
// 0baf42c7d95d8627bc2ea649208f0ce2

// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=0baf42c7d95d8627bc2ea649208f0ce2
import React, { useEffect, useState } from 'react'


function Temp() {
    const [searching, setSearching] = useState("gorakhpur");
    const [tempdata, setTempdata] = useState({});
    const [date, setDate] = useState();
    const [weathericon, setWeathericon] = useState();

    const getData = async () => {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searching}&units=metric&appid=0baf42c7d95d8627bc2ea649208f0ce2`;
            const result = await fetch(url);
            const data = await result.json();

            const { temp, humidity, pressure } = data.main;
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            const { main: weatherType } = data.weather[0];

            const weatherinfo = {
                temp,
                humidity,
                pressure,
                speed,
                name,
                country,
                sunset,
                weatherType
            }
            setTempdata(weatherinfo);

            setweatherState();
            // console.log('this is a trial',tempdata.speed);

        } catch (err) {
            console.log(err.message);
            window.alert("something went wrong")
        }
    }
    // console.log("this is data",tempdata.weatherType);
    useEffect(() => {
        getData();
    }, [])
    const time = () => {
        const date = new Date().toLocaleString();
        setDate(date);
    }

    const setweatherState = () => {
        if (tempdata.weatherType) {
            switch (tempdata.weatherType) {
                case "Clouds":
                    setWeathericon("wi-day-cloudy")

                    break;
                case "Clear":
                    setWeathericon("wi-day-sunny")

                    break;
                case "Haze":
                    setWeathericon("wi-day-haze")

                    break;

                default:
                    break;
            }
        }
    }

    const second = tempdata.sunset;
    const stime = new Date(second * 1000);
    const sunsetTime = `${stime.getHours()}:${stime.getMinutes()}`;


    setInterval(time, 1000)


    return (
        <>
            <div className="container-fluid ">
                <div className="row col-md-8  m-auto justify-content-center">
                    <div className="col-md- col-6 bg-dark mt-5 mb-2">
                        <div className=" form-outline  ">

                            <input type="text" className='form-control form-control-sm' placeholder='search' onChange={(e) => setSearching(e.target.value)} value={searching} />
                        </div>
                    </div>
                    <div className="col-md-4 col-4 mt-5 mb-2">
                        <button className="btn btn-sm btn-primary" onClick={getData}>Search</button>

                    </div>
                </div>
                <div className="row col-md-8 col-12 m-auto">
                    <div className="card">
                        <div className="card-body ">

                            <div className=" heading fs-5 text-center p-3 text-dark">Check the weather forecast</div>
                            <div className=" col-12 iconbox">
                                <div className="col p-4 text-center">
                                    <i className={`wi ${weathericon} logo`}></i>
                                </div>

                            </div>
                            <div className=" col-12 bg-info d-flex flex-row  ">
                                <div className="col-md-8 col-6 bg-dark d-flex flex-md-row flex-column">
                                    
                                    <div className=" col-md-5 col-12">
                                        <strong><h3 className="display-3 text-center text-white p-4 ">{tempdata.temp}&deg;</h3></strong>
                                    </div>
                                    <div className=" col-md-5 col-12 bg-secondary">
                                        <strong><h3 className=" display-3 text-white  p-4  text-center  ">{tempdata.weatherType}</h3>
                                            <p className='text-white text-center'>{tempdata.name} , {tempdata.country}</p>
                                        </strong>
                                    </div>



                                </div>
                                <div className="position-relative col-6 col-md-4 timecol ">
                                    <div className="date">{date}</div>
                                </div>
                            </div>
                            

                            <div className="col-12 d-md-flex flex-md-row justify-content-between" id='card-footer'>
                                <div className="col-md-3 col-12  text-center">
                                    <p className='d-inline-block'><i className={'wi wi-sunset text-dark'} ></i>
                                    </p>
                                    <p className='d-inline-block ps-3 '>{sunsetTime} PM<br /> sunset</p>
                                </div>
                                <div className="col-md-3 col-12 text-center">
                                    <p className='d-inline-block'><i className={'wi wi-humidity text-dark'} ></i>
                                    </p>
                                    <p className='d-inline-block ps-3 '>{tempdata.humidity} <br /> Humidity</p>
                                </div>
                                <div className="col-md-3 col-12 text-center">
                                    <p className='d-inline-block'><i className={'wi wi-day-rain text-dark'} ></i>
                                    </p>
                                    <p className='d-inline-block ps-3 '>{tempdata.pressure} <br /> pressure</p>
                                </div>
                                <div className="col-md-3 col-12 text-center ">
                                    <p className='d-inline-block'><i className={'wi wi-day-windy text-dark'} ></i>
                                    </p>
                                    <p className='d-inline-block ps-3 '>{tempdata.speed} <br /> speed</p>
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default Temp