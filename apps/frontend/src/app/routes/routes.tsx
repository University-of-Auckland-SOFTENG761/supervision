import React from 'react';
import App from 'app/app';
import { Route, Routes as RRRoutes } from 'react-router-dom';
import { PatientDetailsPage } from '@patients';
import { LoginPage } from '@login';

const Routes = () => {
  return (
    <RRRoutes>
      <Route path="/" element={<App />}>
        <Route index element={<LoginPage />} />
        <Route path="/patient-details" element={<PatientDetailsPage />} />
      </Route>
    </RRRoutes>
  );
};

export default Routes;
