import './courseList.css';
import CheckConflict from '../utilities/TimeConflict';
import { Link } from 'react-router-dom';
import { auth } from '../utilities/firebase';
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useProfile } from '../utilities/profile';

const CourseList = ({ courses, term, selected, toggleSelected }) => {
  // console.log(courses);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = () => onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const [{uid, isAdmin}, profileLoading, profileError] = useProfile();

  // if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
  // if (profileLoading) return <h1>Loading user profile</h1>;
  // if (!profile) return <h1>No profile data</h1>;

  // const isAdmin = profile.isAdmin;

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
                  {isAdmin && <Link to={`/edit/${key}`} onClick={(event) => event.stopPropagation()}>
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