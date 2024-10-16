import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const Form = ({course}) => {

    const navigate = useNavigate();
    
    const [title, setTitle] = useState(course.title);
    const [meets, setMeets] = useState(course.meets);

    return (
        <form onSubmit={() => {}} className="p-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Course Title:</label>
                <input type="text" id="title" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="meets" className="form-label">Course Timings:</label>
                <input type="text" id="meets" className="form-control" value={meets} onChange={(e) => setMeets(e.target.value)} />
            </div>
            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default Form;