import './courseList.css';
import CheckConflict from '../utilities/TimeConflict';
import { Link } from 'react-router-dom';
import {auth} from '../utilities/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';

const CourseList = ({ courses, term, selected, toggleSelected }) => {
  // console.log(courses);
  const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); 
        });

        return () => unsubscribe(); 
    }, []);

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
              style={{ opacity: selected.includes(key) ? 1 : conflict ? 0.3 : 1, cursor: selected.includes(key) ? 'pointer' : conflict ? 'not-allowed' : 'pointer' }}
            >
              <div className="card-body">
                <h5 className="card-title">{course.term} CS {course.number}</h5>
                <p>{course.title}</p>
              </div>
              <div className="card-footer bg-transparent">
                <p className="card-text">{course.meets}
                  {user && <Link to={`/edit/${key}`} onClick={(event) => event.stopPropagation()}>
                    <i className="bi bi-pencil-square h4"></i>
                  </Link>}
                </p>
              </div>
            </div>
          );
        })
      }
    </div>
  );
}

export default CourseList;