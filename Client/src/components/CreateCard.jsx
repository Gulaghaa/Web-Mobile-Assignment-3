import React, { useEffect, useState } from 'react';
import { MdAddCircleOutline } from 'react-icons/md';
import { ImCancelCircle } from "react-icons/im";
import Modal from 'react-modal';
import { fetchJsonData, postJsonData } from '../services/getAPI';
import '../style/CreateCard.css';

const customStyles = {
    overlay: {
        backgroundColor: 'transparent',
        display: 'flex',
        justifyContent: 'center',
        zIndex: '3'
    },
    content: {
        width: '600px',
        height: '80vh',
        left: '50%',
        transform: 'translateX(-50%)',
        top: '10%',
        backgroundColor: 'rgb(14,37,54)',
        border: '2px solid rgb(92, 192, 246)',
    },
};

Modal.setAppElement('#root');

export default function CreateCard({ status, setStatus, setData }) {
    const [flashCards, setFlashCards] = useState([]);
    const [createCard, setCreateCard] = useState(false);
    const [newCard, setNewCard] = useState({
        id: '',
        question: '',
        answer: '',
        imageForQuestion: '',
        imageForAnswer: '',
        createdDate: '',
        modifiedDate: '',
        difficultyLevel: 'easy',
        category: 'General Knowledge',
        status: '',
    });

    const [errors, setErrors] = useState({
        question: 'Question is required',
        answer: 'Answer is required',
        status: 'Status is required'
    });

    useEffect(() => {
        fetchJsonData('http://localhost:3001/flashCards')
            .then(response => {
                setFlashCards(response);
                setData(response);
                setNewCard({ ...newCard, id: (Number(response[response.length - 1]?.id || 0) + 1).toString() });
            });
    }, [status]);

    const handleInputChange = (e) => {
        const updatedCard = { ...newCard, [e.target.name]: e.target.value };
        setNewCard(updatedCard);

        let newErrors = {};
        if (updatedCard.question === '') {
            newErrors.question = 'Question is required';
        } else if (flashCards.some(card => card.question.trim() === updatedCard.question.trim())) {
            newErrors.question = 'This question already exists';
        }
        if (updatedCard.answer === '') {
            newErrors.answer = 'Answer is required';
        }
        if (updatedCard.status === '') {
            newErrors.status = 'Status is required';
        }
        setErrors(newErrors);
    };

    const handleImageChangeForQuestion = (e) => {
        handleImageChange(e, 'imageForQuestion');
    };

    const handleImageChangeForAnswer = (e) => {
        handleImageChange(e, 'imageForAnswer');
    };

    const handleImageChange = (e, key) => {
        const file = e.target.files[0];
        if (file && /^image\/(jpeg|jpg|png)$/.test(file.type)) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setNewCard({ ...newCard, [key]: reader.result });
            };
        } else {
            alert('Please select a valid image file (JPEG, JPG, PNG)');
        }
    };

    const handleCreateCard = async () => {
        if (Object.keys(errors).length > 0) return;

        const currentDate = new Date();
        const formattedDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}/${currentDate.getFullYear()}`;
            const currentTime = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`;
        const cardToCreate = {
            ...newCard,
            createdDate: `${formattedDate} ${currentTime}`,
            order: flashCards.length
        };

        try {
            const response = await postJsonData('http://localhost:3001/flashCards', cardToCreate);
            if (response) {
                setNewCard({
                    id: '',
                    question: '',
                    answer: '',
                    imageForQuestion: '',
                    imageForAnswer: '',
                    createdDate: '',
                    modifiedDate: '',
                    category: 'General Knowledge',
                    difficultyLevel: 'easy',
                    status: '',
                    order: 0 
                });
                setStatus((prev) => !prev);
                setCreateCard(false);
                setErrors({ question: 'Question is required', answer: 'Answer is required', status: 'Status is required' });
            } else {
                console.error('Failed to create flash card.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    const openModal = () => setCreateCard(true);
    const closeModal = () => setCreateCard(false);

    return (
        <div>
            <button onClick={openModal} className="create-card-button">
                <MdAddCircleOutline size={24} />
                <span>Create Card</span>
            </button>

            <Modal isOpen={createCard} onRequestClose={closeModal} style={customStyles}>
                <span onClick={closeModal} className='XButton'><ImCancelCircle /></span>
                <span className='spanOutsideofForm'>Create A New Flash Card</span>
                <form className='modalForm'>
                    <div>
                        <span>Please, enter a question for the card: </span>
                        <input type='text' value={newCard.question} name='question' placeholder='Enter a valid question' onChange={handleInputChange} />
                        {errors.question ? <div className='error'>*{' ' + errors.question}</div> : <div style={{ height: '14px' }}></div>}
                    </div>
                    <div>
                        <span>Please, enter a relative answer to your question: </span>
                        <input type='text' value={newCard.answer} name='answer' placeholder='Enter an answer' onChange={handleInputChange} />
                        {errors.answer ? <div className='error'>*{' ' + errors.answer}</div> : <div style={{ height: '14px' }}></div>}
                    </div>
                    <div>
                        <span>Upload an Image for the Question:</span>
                        <input type='file' accept="image/jpeg, image/jpg, image/png" onChange={handleImageChangeForQuestion} />
                    </div>
                    <div>
                        <span>Upload an Image for the Answer:</span>
                        <input type='file' accept="image/jpeg, image/jpg, image/png" onChange={handleImageChangeForAnswer} />
                    </div>
                    <div>
                        <span>Please, select difficulty level of your question (easy as default)</span>
                        <select name='difficultyLevel' onChange={handleInputChange} value={newCard.difficultyLevel}>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </div>
                    <div>
                        <span>Please, select the category of your question (General Knowledge as default)</span>
                        <select name='category' onChange={handleInputChange} value={newCard.category}>
                            <option value='General Knowledge'>General Knowledge</option>
                            <option value='Mathematics'>Mathematics</option>
                            <option value='Programming'>Programming</option>
                            <option value='Technology'>Technology</option>
                            <option value='Literature'>Literature</option>
                            <option value='Geography'>Geography</option>
                            <option value='Language'>Language</option>
                            <option value='History'>History</option>
                            <option value='Science'>Science</option>
                            <option value='Sports'>Sports</option>
                            <option value='Movies'>Movies</option>
                            <option value='Music'>Music</option>
                            <option value='Art'>Art</option>
                        </select>
                    </div>
                    <div>
                        <span>Please, select the status of your card</span>
                        <select name='status' onChange={handleInputChange} value={newCard.status}>
                            <option value=''>Select Status</option>
                            <option value='Learned'>Learned</option>
                            <option value='Want to Learn'>Want to Learn</option>
                            <option value='Noted'>Noted</option>
                        </select>
                        {errors.status && <div className='error'>* {errors.status}</div>}
                    </div>
                    <button type='button' className='createCardButton' onClick={handleCreateCard} disabled={Object.keys(errors).length > 0}>Create Flash Card</button>
                </form>
            </Modal>
        </div>
    );
}
