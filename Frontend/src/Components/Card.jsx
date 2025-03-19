import React from 'react'

function Card(props) {
  return (
    <div className="flex flex-col m-auto bg-black mb-2 p-2 rounded w-[155%] ">{console.log(props.title)}
        <h1 className=" text-3xl text-white ">{props.title}</h1>
        <h1 className=" text-2xl text-white ">{props.place}</h1>
    </div>
  )
}

export default Card
