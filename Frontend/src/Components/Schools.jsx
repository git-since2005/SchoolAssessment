import React, {useState, useEffect} from 'react'
import Card from "./Card"

function Schools() {
    const [schools, setSchools] = useState({})
    useEffect(()=>{
        let fetchSchools = async()=>{
            let response = await navigator.geolocation.getCurrentPosition(
                (position) => {
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;

                  const apiUrl = `${import.meta.env.VITE_API_URL}/listSchools?latitude=${latitude}&longitude=${longitude}`;
              
                  // Fetch request
                  fetch(apiUrl)
                    .then((res) => res.json())
                    .then((data) => {console.log("Schools:", data);setSchools(data)})
                    .catch((err) => console.error("Fetch error:", err));
                }
              );
            // if(response.ok){
            //     let json = await response.json()
            //     setSchools(json)
            // }
        }
        fetchSchools()
        console.log(schools)
    }, [])
  return (
    <div className=" m-auto ">
      {Object.keys(schools).map((e)=>{
        console.log(schools, e)
        return <Card key={e} title={schools[e].name} place={schools[e].address} />
      })}
    </div>
  )
}

export default Schools
