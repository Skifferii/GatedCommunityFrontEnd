import { useEffect, useState } from "react";

function OfferedServicesList(){
    const [services, setServices] = useState([]);
    async function fetchServices(){
       const res = await fetch("/api/offered-services"); 
       const obj =  await res.json();
       setServices(obj)
    }

    useEffect(()=>{
        fetchServices();
    },[])

    return <>
        <div>
            <header>

            </header>
            

            <ul>
                {services.map((service: {title: string, id: number, description: string})=> 
                <li key={service.id}>{service.title}--{service.description}</li>)}
            </ul>    
        </div>
        

    </>
}

export default OfferedServicesList