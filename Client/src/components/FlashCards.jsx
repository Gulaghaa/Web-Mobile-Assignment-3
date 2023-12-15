import React, { useEffect, useState } from "react";
import { fetchJsonData } from "../services/getAPI";
import uniqid from 'uniqid';



export default function FlashCards() {

    const [flashCards, setFlashCards] = useState([])
    const [pending, setPending] = useState(true)

    useEffect(() => {
        fetchJsonData('http://localhost:3001/flashCards')
            .then((response) => {
                setFlashCards(response)
                setPending(false)
            })
    } , [])



    console.log(flashCards, pending)



    

    return (
        <div>
            {
                pending ? (
                    <span>Loading ....</span>
                ) :
                (
                    <div className="cartContainer">
                        {
                    flashCards.map((e) => {
                        return <div style={{color:"white"}} key={e.id}>{e.question}</div>
                        

                    })
                }
                    </div>
                )
            }
           
        </div>
    );
}
