import CourseList from "./CourseList";
import Banner from "./Banner";
import { useState } from 'react';
import './TermPage.css';

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

const TermSelector = ({ selection, setSelection }) => {
    return (
        <div className="btn-group">
            {terms.map((term) => (
                <TermButton term={term} selection={selection} setSelection={setSelection} />
            ))}
        </div>
    );
};

const Page = ({ schedule }) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    const [selected, setSelected] = useState([]);

    const toggleSelected = (item) => setSelected(
        selected.includes(item)
            ? selected.filter(x => x !== item)
            : [...selected, item]
    );

    return (
        <div className="App">
            <Banner title={schedule.title} />
            <TermSelector selection={selectedTerm} setSelection={setSelectedTerm} />
            <CourseList courses={schedule.courses} term={selectedTerm} selected={selected} toggleSelected={toggleSelected}/>
        </div>
    );
};

export default Page;