
import { useEffect, useState } from "react";

const CovidTracker = () => {

    const[data,setData]=useState([]);

        const getCovidData = async()=>{
            try{
                const res=await fetch('https://data.covid19india.org/data.json');
                const data=await res.json();
                console.log(data.statewise[0]);
                setData(data.statewise[0]);            }
            catch(err)
            {
                console.log(err)
            }
              
        }

        useEffect(()=>{
            getCovidData();
        },[])

  return (
    <>
        <h1>LIVE</h1>
        <h2>COVID-19 TRACKER</h2>

        <ul>
            <li className="card">
                <div className="card_main">
                    <div className="card_inner">
                        <p className="card_name"> <span>TOTAL</span> ACTIVE </p>
                       <p className="card_total">{data.recovered}</p> 
                    </div>
                </div>
            </li>

            <li className="card">
                <div className="card_main">
                    <div className="card_inner">
                        <p className="card_name"> <span>TOTAL</span> CONFIRMED </p>
                        <p className="card_total">{data.confirmed}</p> 
                    </div>
                </div>
            </li>

            <li className="card">
                <div className="card_main">
                    <div className="card_inner">
                        <p className="card_name"> <span>TOTAL</span> DEATHS </p>
                        <p className="card_total">{data.deaths}</p>  
                    </div>
                </div>
            </li>

            <li className="card">
                <div className="card_main">
                    <div className="card_inner">
                        <p className="card_name"> <span>TOTAL</span> STATE </p>
                        <p className="card_total">{data.state}</p> 
                    </div>
                </div>
            </li>

            <li className="card">
                <div className="card_main">
                    <div className="card_inner">
                        <p className="card_name"> <span>TOTAL</span> STATECODE </p>
                        <p className="card_total">{data.statecode}</p>  
                    </div>
                </div>
            </li>

            <li className="card">
                <div className="card_main">
                    <div className="card_inner">
                        <p className="card_name"> <span>TOTAL</span> RECOVERED </p>
                        <p className="card_total">{data.recovered}</p> 
                    </div>
                </div>
            </li>
        </ul>
    </>
  )
};
export default CovidTracker;
