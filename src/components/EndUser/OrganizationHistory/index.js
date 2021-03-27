import { ExperienceProvider } from 'hooks/useExperiences/experienceContext';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AddOrganizationHistory from './AddOrganizationHistory';
import OrganizationHistories from './OrganizationHistories';

const OrganizationHistory = () => {
  return (
    <ExperienceProvider>
      <Switch>
        <Route
          exact
          path="/organization-history"
          component={OrganizationHistories}
        />
        <Route
          exact
          path="/organization-history/add"
          component={AddOrganizationHistory}
        />
      </Switch>
    </ExperienceProvider>
  );
};

export default OrganizationHistory;
