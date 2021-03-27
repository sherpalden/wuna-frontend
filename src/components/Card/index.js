import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { CardProvider } from 'hooks/useCard/cardContext';
import CardListView from './CardListView';
import CardDetailView from './CardDetailView';

function Card() {
  return (
    <CardProvider>
      <Switch>
        <Route exact path="/cards" component={CardListView} />
        <Route exact path="/cards/:id/view" component={CardDetailView} />
      </Switch>
    </CardProvider>
  );
}

export default Card;
