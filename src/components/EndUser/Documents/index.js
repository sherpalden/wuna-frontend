import React from 'react';
import ListDocuments from './ListDocuments';
import { Route, Switch } from 'react-router-dom';
import { DocumentProvider } from 'hooks/useDocument/documentContext';
import ExperienceDocs from 'components/EndUser/UpdateDetails/ExperienceDocs';

const Documents = () => {
  return (
    <DocumentProvider>
      <Switch>
        <Route exact path="/documents" render={() => <ListDocuments />} />
        <Route exact path="/documents/add" render={() => <ExperienceDocs />} />
      </Switch>
    </DocumentProvider>
  );
};

export default Documents;
