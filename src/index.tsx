import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

export const client = new ApolloClient({
  uri: 'http://localhost:4000/', //URL of the GraphQL server
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
      ,
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
