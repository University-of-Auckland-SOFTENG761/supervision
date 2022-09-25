import React from 'react';
import App from 'app/app';
import { Route, Routes as RRRoutes } from 'react-router-dom';
import { PatientDetailsPage } from '@patients';
import { ConsultDetailsPage } from '@consults';
import { LoginPage } from '@login';
import ProtectedRoute from './protected-route';

const Routes = () => {
  return (
    <RRRoutes>
      <Route path="/" element={<App />}>
        <Route index element={<LoginPage />} />
        <Route
          path="/patient-details"
          element={<ProtectedRoute component={<PatientDetailsPage />} />}
        />
        <Route
          path="/consult-details"
          element={<ProtectedRoute component={<ConsultDetailsPage />} />}
        />
      </Route>
    </RRRoutes>
  );
};

export default Routes;
