import { useEffect } from "react";

function Modalcontent ({Modalcontent, closeModal}){

    useEffect(()=>{
        setTimeout(()=>{
                closeModal()

        },3000)


    },[])
    return <p> {Modalcontent} </p>

}

export default Modalcontent;