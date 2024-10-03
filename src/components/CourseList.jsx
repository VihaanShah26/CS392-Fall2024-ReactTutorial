import './courseList.css';

const CourseList = ({ courses }) => {
  return (
    <div className="course-list">
      {
        Object.entries(courses).map(([key, course]) => (
          <div className='card m-1 p-2'>
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