import './Modal.css';

// https://codebuckets.com/2021/08/08/bootstrap-modal-dialog-in-react-without-jquery/

const Modal = ({ courses, selected, close, open }) => {
  return (
    <div
      className={`${open ? 'modal-show' : 'modal'}`}
      tabIndex="-1"
      role="dialog"
      onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Course Plan</h5>
            <button type="button" className="btn-close" aria-label="Close" 
              onClick={close}
            />
          </div>
          <div className="modal-body">
            {selected.length === 0 ? (
              <p>
                No courses selected. <br />
                Click on a course to add it to your plan.
              </p>
            ) : (
              <ul>
                {Object.entries(courses).filter(([key,course]) => selected.includes(key)).map(([key, course]) => (
                  <li key={key}>
                    <b>{course.term} CS {course.number}</b>: {course.title} <i>({course.meets})</i>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Modal;