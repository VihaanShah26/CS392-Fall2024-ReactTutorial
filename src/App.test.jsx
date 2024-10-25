import {describe, it,} from 'vitest';
import {render, screen} from '@testing-library/react';
import App from './App';

// describe('launching', () => {
//   it('should show the current year', () => {
//     render(<App />);
//     screen.getByText(/2018/);
//   });
// });

// describe('launching', () => {
//   it('should show the current year', async () => {
//     render(<App />);
//     await screen.findByText(/2018/); // need to await to ensure that the promise response has arrived. othwerise test will always pass
//   });
// });

import {useAuthState, useDbData} from './utilities/firebase';

const mockSchedule = {
  "title": "CS Courses for 1850-1851",
  "courses": {
  }
};

vi.mock('./utilities/firebase');

beforeEach(() => {
  useDbData.mockReturnValue([mockSchedule, null]);
  useAuthState.mockReturnValue([null]);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('launching', () => {
  it('should show the current year', () => {
    render(<App />);
    screen.getByText(/1850/);
  });
});
