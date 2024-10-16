import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import Page from './components/TermPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useJsonQuery from './utilities/fetch';
import Form from './components/EditForm';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');
  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  const schedule = data;

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Page schedule={schedule} />} />
      <Route path="/edit/:id" element={<FormHelper schedule={schedule} />} />
    </Routes>
    </BrowserRouter>
  );
}

const FormHelper = (schedule) => {
  const {id} = useParams();
  console.log(schedule.schedule.courses);
  const course = schedule.schedule.courses[id];

  if (!course) {
    useNavigate('/');
    return;
  }
  
  return <Form course={course} />;
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="container">
        <Main />
      </div>
    </QueryClientProvider>
  )
};

export default App;
