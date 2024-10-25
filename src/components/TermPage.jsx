import CourseList from "./CourseList";
import Banner from "./Banner";
import { useState } from 'react';
import './TermPage.css';
import Modal from "./Modal";


const terms = ["Fall", "Winter", "Spring"];

const TermButton = ({ term, selection, setSelection }) => (
    <div className='term-button'>
        <input type="radio" id={term} className="btn-check" checked={term === selection} autoComplete="off"
            onChange={() => setSelection(term)} />
        <label className="btn btn-success mb-1 p-2" htmlFor={term}>
            {term}
        </label>
    </div>
);

// const TermSelector = ({ selection, setSelection, openModal }) => {
//     return (
//         <div>
//             <div className="btn-group" key={selection}>
//                 {terms.map((term) => (
//                     <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />
//                 ))}
//             </div>
//             <button className="btn btn-primary m-2" onClick={openModal}>Course Plan</button>
//         </div>
//     );
// };
const TermSelector = ({ selection, setSelection, openModal }) => {
    return (
        <div className="term-selector-container">
            <div className="btn-group" key={selection}>
                {terms.map((term) => (
                    <TermButton key={term} term={term} selection={selection} setSelection={setSelection} />
                ))}
            </div>
            <button className="btn btn-primary m-2 course-plan-btn" onClick={openModal}>Course Plan</button>
        </div>
    );
};


const Page = ({ schedule }) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    const [selected, setSelected] = useState([]);
    const [open, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const toggleSelected = (item) => setSelected(
        selected.includes(item)
            ? selected.filter(x => x !== item)
            : [...selected, item]
    );

    return (
        <div className="App">
            <Banner title={schedule.title} />
            <TermSelector selection={selectedTerm} setSelection={setSelectedTerm} openModal={openModal} />
            {/* <button className="btn btn-primary m-2 course-plan-btn" onClick={openModal}>Course Plan</button> */}
            <Modal courses={schedule.courses} selected={selected} close={closeModal} open={open} />
            <CourseList courses={schedule.courses} term={selectedTerm} selected={selected} toggleSelected={toggleSelected} />
        </div>
    );
};

export default Page; 