const CourseList = ({ courses }) => {
  return (
        Object.entries(courses).map(([key, course]) => (
            <p key={key}> {course.term} CS{course.number}: {course.title} </p>
        ))
  );
}

export default CourseList;