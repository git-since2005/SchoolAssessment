import React, {useState} from 'react'

function AddSchool() {
    const [form, setForm] = useState({"name":"", "address":"", "latitude":0, "longitude":0})
    let inputStyle = " m-auto p-2 border rounded border-white mb-5 text-white "
  return (
    <div className=" w-[55%] h-fit flex flex-col m-auto mt-[9%] border-white ">
        <h1 className=" text-5xl m-auto mb-7 text-white font-bold ">Add a School</h1>
      <input onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} value={form["name"]} className={inputStyle} type="text" name="name" placeholder="School Name" />
      <input onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} value={form["address"]} className={inputStyle} type="text" name="address" placeholder="Address" />
      <input onChange={(e)=>setForm({...form, [e.target.name]:e.target.value})} value={form["latitude"]} className={inputStyle} type="number" name="latitude" placeholder="Latitude" />
      <input onChange={(e)=>{setForm({...form, [e.target.name]:e.target.value});console.log(form)}} value={form["longitude"]} className={inputStyle} type="number" name="longitude" placeholder="Longitude" />
      <button onClick={async()=>{
        console.log(import.meta.env.VITE_API_URL)
        let response = await fetch(`${import.meta.env.VITE_API_URL}/addSchool`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(form)
        })
        if(response.ok){
            let json = await response.json()
            if(json.status=="success"){
                alert("Added Successfully")
            }
        }
      }} className="p-2 w-[15%] m-auto rounded font-semibold hover:text-black text-white bg-black outline-none cursor-pointer hover:bg-white">Submit</button>
    </div>
  )
}

export default AddSchool
