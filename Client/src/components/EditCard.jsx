import React, { useState, useEffect } from 'react';
import { updateJsonData, fetchJsonData } from '../services/getAPI';
import '../style/EditCard.css';

function EditCard({ id, initialQuestion, initialAnswer, setData, closePopup }) {
    const [question, setQuestion] = useState(initialQuestion);
    const [answer, setAnswer] = useState(initialAnswer);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isQuestionUnique, setIsQuestionUnique] = useState(true);
    const [canUpdate, setCanUpdate] = useState(false);




    useEffect(() => {
        const checkUniqueness = async () => {
            const data = await fetchJsonData('http://localhost:3001/flashCards');
            const isUnique = !data.some(card => card.question === question && card.id !== id);
            setIsQuestionUnique(isUnique);
        };

        if (question !== initialQuestion || answer !== initialAnswer) {
            setIsUpdated(true);
            checkUniqueness();
        } else {
            setIsUpdated(false);
        }
    }, [question, answer, initialQuestion, initialAnswer, id]);

    useEffect(() => {
        setCanUpdate(isUpdated && isQuestionUnique && question.trim() !== '' && answer.trim() !== '');
    }, [isUpdated, isQuestionUnique, question, answer]);


    const stopPropagation = (e) => {
        e.stopPropagation();
    };


    const handleUpdate = async () => {
        try {
            const currentItemData = await fetchJsonData(`http://localhost:3001/flashCards/${id}`);

            const currentDate = new Date();
            const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
            const updatePayload = {
                ...currentItemData,
                question,
                answer,
                modifiedDate: currentTime
            }

            const updatedData = await updateJsonData(`http://localhost:3001/flashCards/${id}`, updatePayload);

            setData(currentData => currentData.map(item => item.id === id ? updatedData : item));
            closePopup();
        } catch (error) {
            console.error('Error while updating:', error);
        }
    };

    return (
        <div className="editCardModal" onClick={stopPropagation}>
            <div className="editCardModalContent">
                <h3>Edit Card</h3>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
                <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} />
                <button onClick={handleUpdate} disabled={!canUpdate}>Update</button>
                <button onClick={closePopup}>Close</button>
                {!isQuestionUnique && <p>This question already exists.</p>}
            </div>
        </div>
    );
}

export default EditCard;
