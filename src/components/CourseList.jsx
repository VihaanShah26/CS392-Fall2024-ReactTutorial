import './courseList.css';

const CourseList = ({ courses , term, selected, toggleSelected}) => {
  console.log(selected);
  return (
    <div className="course-list">
      {
        Object.entries(courses)
          .filter(([key, course]) => course.term === term)
          .map(([key, course]) => (
            <div key={key} className={`card m1 p2 ${selected.includes(key) ? 'selected' : ''}`} onClick={() => toggleSelected(key)}>
              <div className='card-body'>
                <h5 className='card-title'> {course.term} CS {course.number} </h5>
                <p> {course.title} </p>
              </div>
              <div className='card-footer bg-transparent'>
                <p className='card-text'> {course.meets} </p>
              </div>
            </div>
          ))
      }
    </div>
  );
}

export default CourseList;