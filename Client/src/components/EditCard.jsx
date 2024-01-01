import React, { useState, useEffect } from 'react';
import { updateJsonData, fetchJsonData } from '../services/getAPI';
import '../style/EditCard.css';

function EditCard({ id, initialQuestion, initialAnswer, setData, closePopup, setIsFlipped }) {
    const [question, setQuestion] = useState(initialQuestion);
    const [answer, setAnswer] = useState(initialAnswer);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e, type) => {
        const value = e.target.value;
        if (type === 'question') {
            setQuestion(value);
        } else {
            setAnswer(value);
        }
    };

    const handleFocusChange = (type) => {
        if (type === 'question') {
            setIsFlipped(false); 
        } else {
            setIsFlipped(true); 
        }
    };

    const validateInputs = async () => {
        let newErrors = {};
        const data = await fetchJsonData('http://localhost:3001/flashCards');
        const hasChanges = question !== initialQuestion || answer !== initialAnswer;

        if (!question.trim()) {
            newErrors.question = 'Question is required';
        } else if (data.some(card => card.question === question && card.id !== id)) {
            newErrors.question = 'This question already exists';
        }

        if (!answer.trim()) {
            newErrors.answer = 'Answer is required';
        }

        if (!hasChanges) {
            newErrors.noChanges = 'No changes made';
        }

        setErrors(newErrors);
    };

    useEffect(() => {
        validateInputs();
    }, [question, answer, id]);

    const handleUpdate = async () => {
        if (Object.keys(errors).length > 0) return;

        try {
            const currentItemData = await fetchJsonData(`http://localhost:3001/flashCards/${id}`);
            const currentDate = new Date();
            const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
            const updatePayload = {
                ...currentItemData,
                question,
                answer,
                modifiedDate: currentTime
            };
            const updatedData = await updateJsonData(`http://localhost:3001/flashCards/${id}`, updatePayload);
            setData(currentData => currentData.map(item => item.id === id ? updatedData : item));
            closePopup();
        } catch (error) {
            console.error('Error while updating:', error);
        }
    };

    return (
        <div className="editCardModal" onClick={(e) => e.stopPropagation()}>
            <div className="editCardModalContent">
                <h3>Edit Card</h3>
                <input type="text" value={question} onChange={(e) => handleInputChange(e, 'question')} onFocus={() => handleFocusChange('question')} />
                {errors.question && <p className="error">{errors.question}</p>}
                <input type="text" value={answer} onChange={(e) => handleInputChange(e, 'answer')} onFocus={() => handleFocusChange('answer')} />
                {errors.answer && <p className="error">{errors.answer}</p>}
                {errors.noChanges && <p className="error">{errors.noChanges}</p>}
                <button onClick={handleUpdate} disabled={Object.keys(errors).length > 0}>Update</button>
                <button onClick={closePopup}>Close</button>
            </div>
        </div>
    );
}

export default EditCard;
