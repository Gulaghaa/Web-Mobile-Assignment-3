import React, { useEffect, useState } from 'react';
import { fetchJsonData, postJsonData } from '../services/getAPI';
import Modal from 'react-modal';
import '../style/FlashCards.css'

const customStyles = {
    overlay: {
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    content: {
        width: '50%',
        height: '80vh',
        left: '25%',
        right: '25%',
        top: '10%',
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
        backdropFilter: 'blur(50px)',
        border: '2px solid rgb(92, 192, 246)',
    },
};

Modal.setAppElement('#root');

export default function FlashCards() {
    const [flashCards, setFlashCards] = useState([]);
    const [createCard, setCreateCard] = useState(false);
    const [newCard, setNewCard] = useState({
        id: '',
        question: '',
        answer: '',
        createdDate: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
        modifiedDate: '',
        difficultyLevel: 'easy',
        category: 'General Knowledge',
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchJsonData('http://localhost:3001/flashCards')
            .then(response => {
                setFlashCards(response);
                setNewCard({ ...newCard, id: (response.length + 1).toString() });
            });
    }, []);

    const handleInputChange = (e) => {
        const updatedCard = { ...newCard, [e.target.name]: e.target.value };
        setNewCard(updatedCard);

        let newErrors = {};
        if (updatedCard.question === '') {
            newErrors.question = 'Question is required';
        } else if (flashCards.some(card => card.question === updatedCard.question)) {
            newErrors.question = 'This question already exists';
        }
        if (updatedCard.answer === '') {
            newErrors.answer = 'Answer is required';
        }
        setErrors(newErrors);
    };

    console.log(errors)
    console.log(newCard)

    const handleCreateCard = async () => {
        if (Object.keys(errors).length > 0) return;
        const updatedCard = { ...newCard, createdDate: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes() };
        setNewCard(updatedCard);

        try {
            const response = await postJsonData('http://localhost:3001/flashCards', newCard);
            if (response) {
                setNewCard({
                    id: (flashCards.length + 1).toString(),
                    question: '',
                    answer: '',
                    createdDate: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
                    modifiedDate: '',
                    category: 'General Knowledge',
                    difficultyLevel: 'easy',
                });
                setFlashCards([...flashCards, newCard]);
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

    return (
        <div>
            <div className='CardsUpperPart'>
                <button onClick={openModal}>Create Card</button>
            </div>

            <Modal isOpen={createCard} onRequestClose={closeModal} style={customStyles}>
                <span className='spanOutsideofForm'>Create A New Flash Card</span>
                <form action='' method='post' className='modalForm'>
                    <div>
                        <span>Please, enter an question for card: </span>
                        <input type='text' value={newCard.question} name='question' placeholder='Enter a valid question' onChange={handleInputChange} />
                        {errors.question && <div className='error'>{errors.question}</div>}
                    </div>
                    <div>
                        <span>Please, enter relative answer to you question: </span>
                        <input type='text' value={newCard.answer} name='answer' placeholder='Enter an answer' onChange={handleInputChange} />
                        {errors.answer && <div className='error'>{errors.answer}</div>}
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
                        <span>Please, category of your question (General Knowledge as default)</span>
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
                    <button type='button' onClick={handleCreateCard} disabled={errors.question || errors.answer}>Create Flash Card</button>
                </form>
            </Modal>
        </div>
    );
}
