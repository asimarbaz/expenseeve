import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import configureStore from './reduxStore/store/configureStore'
import { Provider} from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
//import PaginationTable from './components/PaginationTable';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

const store=configureStore()


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);


