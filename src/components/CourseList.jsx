import './courseList.css';
import CheckConflict from '../utilities/TimeConflict';

const CourseList = ({ courses, term, selected, toggleSelected }) => {
  console.log(courses);
  return (
    <div className="course-list">
      {Object.entries(courses)
        .filter(([key, course]) => course.term === term)
        .map(([key, course]) => {
          const conflict = selected.some(selectedKey => CheckConflict(courses[selectedKey], course));
          return (
            <div
              key={key}
              className={`card m1 p2 ${selected.includes(key) ? 'selected' : ''} ${conflict ? 'conflict' : ''}`}
              onClick={() => selected.includes(key) ? toggleSelected(key) : !conflict && toggleSelected(key)} 
              style={{ opacity: selected.includes(key) ? 1 : conflict ? 0.3 : 1 , cursor: selected.includes(key) ? 'pointer' : conflict ? 'not-allowed' : 'pointer' }} 
            >
              <div className="card-body">
                <h5 className="card-title">{course.term} CS {course.number}</h5>
                <p>{course.title}</p>
              </div>
              <div className="card-footer bg-transparent">
                <p className="card-text">{course.meets}</p>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default CourseList;