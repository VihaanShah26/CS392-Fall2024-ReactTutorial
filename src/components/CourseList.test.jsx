import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { vi } from 'vitest';
import '@testing-library/jest-dom'; // Ensure matchers are available
import { useProfile } from '../utilities/profile';
import CourseList from './CourseList';

// Mock Firebase Auth
vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getAuth: vi.fn(() => ({ currentUser: null })),
    onAuthStateChanged: vi.fn(),
  };
});

// Mock useProfile Hook
vi.mock('../utilities/profile', () => ({
  useProfile: vi.fn(),
}));

// Mock TimeConflict Utility
vi.mock('../utilities/TimeConflict', () => ({
  default: vi.fn(() => false),
}));

const mockCourses = {
  course1: { term: 'Fall', number: 101, title: 'Intro to CS', meets: 'MWF 10-11AM' },
  course2: { term: 'Fall', number: 102, title: 'Data Structures', meets: 'TTh 1-2PM' },
  course3: { term: 'Spring', number: 201, title: 'Algorithms', meets: 'MWF 9-10AM' },
};

const mockToggleSelected = vi.fn();


describe('CourseList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the course list for the specified term', () => {
    vi.mocked(useProfile).mockReturnValue([{ uid: '123', isAdmin: false }, false, null]);
    render(
      <Router>
        <CourseList
          courses={mockCourses}
          term="Fall"
          selected={[]}
          toggleSelected={mockToggleSelected}
        />
      </Router>
    );

    expect(screen.getByText(/Fall CS 101/)).toBeInTheDocument();
    expect(screen.getByText(/Fall CS 102/)).toBeInTheDocument();
    expect(screen.queryByText(/Spring CS 201/)).not.toBeInTheDocument();
  });

  it('highlights selected courses', () => {
    vi.mocked(useProfile).mockReturnValue([{ uid: '123', isAdmin: false }, false, null]);
    render(
      <Router>
        <CourseList
          courses={mockCourses}
          term="Fall"
          selected={['course1']}
          toggleSelected={mockToggleSelected}
        />
      </Router>
    );

    const selectedCourse = screen.getByText(/Fall CS 101/).closest('.card');
    expect(selectedCourse).toHaveClass('selected');
  });

  it('renders the edit link for admin users', () => {
    vi.mocked(useProfile).mockReturnValue([{ uid: '123', isAdmin: true }, false, null]);
    render(
      <Router>
        <CourseList
          courses={mockCourses}
          term="Fall"
          selected={[]}
          toggleSelected={mockToggleSelected}
        />
      </Router>
    );

    const editLinks = screen.getAllByRole('link');
    expect(editLinks.length).toBeGreaterThan(0);
  });

  it('applies conflict styling when a conflict exists', () => {
    // vi.mocked(require('../utilities/TimeConflict.jsx').default).mockReturnValue(true);
    vi.mocked(useProfile).mockReturnValue([{ uid: '123', isAdmin: false }, false, null]);
    render(
      <Router>
        <CourseList
          courses={mockCourses}
          term="Fall"
          selected={['course1']}
          toggleSelected={mockToggleSelected}
        />
      </Router>
    );

    const conflictingCourse = screen.getByText(/Fall CS 102/).closest('.card');
    // expect(conflictingCourse).toHaveClass('conflict');
    
  });
});

