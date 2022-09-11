import React from 'react';
import App from 'app/app';
import { Route, Routes as RRRoutes } from 'react-router-dom';
import { PatientDetailsPage } from '@patients';
import { ConsultDetailsPage } from '../consults/consult-details-page'; // TODO add @ path

const Routes = () => {
  return (
    <RRRoutes>
      <Route path="/" element={<App />}>
        <Route path="/patient-details" element={<PatientDetailsPage />} />
        <Route path="/consult-details" element={<ConsultDetailsPage />} />
      </Route>
    </RRRoutes>
  );
};

export default Routes;
