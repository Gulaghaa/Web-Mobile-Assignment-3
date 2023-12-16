import React, { useEffect, useState } from "react";
import { fetchJsonData , postJsonData } from "../services/getAPI";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import uniqid from 'uniqid';

const customStyles = {
    overlay: {
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center"
    },
    content: {
        width: '50%',
        height: '80vh',
        left: "25%",
        right: "25%",
        top: "10%",
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
        backdropFilter: 'blur(50px)',
        border: "2px solid rgb(92, 192, 246)"
    }
};
Modal.setAppElement('#root');


export default function FlashCards() {

    const [flashCards, setFlashCards] = useState([])
    const [pending, setPending] = useState(true)
    const [createCard, setCreateCard] = useState(false)
    const [newCard, setNewCard] = useState({
        id: '' ,
        question: '',
        answer: '',
        createdDate: '',
        modifiedDate: '',
        difficultyLevel: '',
        category: ''
    })
    

    console.log(newCard)

    const handleCreateCard = async () => {
        try {
            setNewCard({...newCard, createdDate: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()})
            const response = await postJsonData('http://localhost:3001/flashCards', newCard);
            if (response) {
                console.log('Flash card created successfully!');
                setCreateCard(false); 
            } else {
                console.error('Failed to create flash card.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    function openModal() {
        setCreateCard(true);
    }

    function closeModal() {
        setCreateCard(false);
    }

    useEffect(() => {
        fetchJsonData('http://localhost:3001/flashCards')
            .then((response) => {
                setFlashCards(response)
                setPending(false)
                setNewCard({...newCard,id:(response.length + 1).toString()})
            })
    }, [])

    console.log(flashCards)




    return (
        <div>
            <div className="CardsUpperPart">
                <button onClick={openModal}>Create Card</button>
            </div>

            <Modal isOpen={createCard} onRequestClose={closeModal} style={customStyles}>
                <form action="" method="post">
                    <input type="text" name="question" id="question" placeholder="Enter a valid question" onChange={(e) => { setNewCard({ ...newCard, question: e.target.value }) }} />
                    <input type="text" name="answer" id="answer" placeholder="Enter an answer" onChange={(e) => { setNewCard({ ...newCard, answer: e.target.value }) }} />
                    <select name="difficultyLevel" id="difficultyLevel" onChange={(e) => { setNewCard({ ...newCard, difficultyLevel: e.target.value }) }}>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                    <select onChange={(e) => setNewCard({ ...newCard, category: e.target.value })}>
                        <option value="General Knowledge">General Knowledge</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Programming">Programming</option>
                        <option value="Programming">Programming</option>
                        <option value="Technology">Technology</option>
                        <option value="Literature">Literature</option>
                        <option value="Geography">Geography</option>
                        <option value="Language">Language</option>
                        <option value="History">History</option>
                        <option value="Science">Science</option>
                        <option value="Sports">Sports</option>
                        <option value="Movies">Movies</option>
                        <option value="Music">Music</option>
                        <option value="Art">Art</option>
                    </select>
                    <button type="button" onClick={handleCreateCard}>Create Flash Card</button>
                </form>
            </Modal>

        </div>
    );
}
