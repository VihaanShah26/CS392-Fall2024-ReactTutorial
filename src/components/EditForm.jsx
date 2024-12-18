import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDbUpdate } from '../utilities/firebase'; 

const Form = ({ course , courseId }) => {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState(course.title);
    const [meets, setMeets] = useState(course.meets);
    const [errors, setErrors] = useState({ title: '', meets: '', noChange: '' });
    const [updateData, result] = useDbUpdate(`/courses/${courseId}`); 

    const validateForm = () => {
        let isValid = true;
        const newErrors = { title: '', meets: '', noChange: '' };

        if (title.length < 2) {
            newErrors.title = 'Title must be at least 2 characters long';
            isValid = false;
        }

        const regex = /^(M|Tu|W|Th|F|Sa|Su){1,3} \d{1,2}:\d{2}-\d{1,2}:\d{2}$/;
        if (meets && !regex.test(meets)) {
            newErrors.meets = 'Must contain days and start-end, e.g., MWF 12:00-13:20';
            isValid = false;
        }

        if (title === course.title && meets === course.meets) {
            newErrors.noChange = 'No changes have been made. Please click cancel if you do not wish to make any changes.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (validateForm()) {
            updateData({ title, meets }); 
            navigate('/'); 
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Course Title:</label>
                <input 
                    type="text" 
                    id="title" 
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="meets" className="form-label">Course Timings:</label>
                <input 
                    type="text" 
                    id="meets" 
                    className={`form-control ${errors.meets ? 'is-invalid' : ''}`} 
                    value={meets} 
                    onChange={(e) => setMeets(e.target.value)} 
                />
                {errors.meets && <div className="invalid-feedback">{errors.meets}</div>}
            </div>
            {errors.noChange && <div className="alert alert-warning">{errors.noChange}</div>}
            <button type="button" className="btn btn-secondary me-2" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    );
};

export default Form;
