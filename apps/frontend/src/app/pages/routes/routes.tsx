import React from 'react';
import App from 'app/app';
import { Route, Routes as RRRoutes } from 'react-router-dom';
import { PatientDetailsPage } from '../patient-details';

const Routes = () => {
  return (
    <RRRoutes>
      <Route path="/" element={<App />}>
        <Route path="/patient-details" element={<PatientDetailsPage />} />
      </Route>
    </RRRoutes>
  );
};

export default Routes;
