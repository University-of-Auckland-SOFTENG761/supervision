import React from 'react';
import App from 'app/app';
import { Route, Routes as RRRoutes } from 'react-router-dom';
import { PatientDetailsPage } from '@patients';
import { ConsultDetailsPage } from '@consults';
import { LoginPage } from '@login';
import ProtectedRoute from './protected-route';
import { SpectaclesDetailsPage } from '../spectacles/spectacles-details-page';
import { SpectaclesListPage } from '../spectacles/spectacles-list-page';
import { RecallsListPage } from '../consults/recalls/recalls-list-page/recalls-list-page';

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
        <Route
          path="/spectacles-details"
          element={<ProtectedRoute component={<SpectaclesDetailsPage />} />}
        />
        <Route
          path="/spectacles-list"
          element={<ProtectedRoute component={<SpectaclesListPage />} />}
        />
        <Route
          path="/recalls-list"
          element={<ProtectedRoute component={<RecallsListPage />} />}
        />
      </Route>
    </RRRoutes>
  );
};

export default Routes;
