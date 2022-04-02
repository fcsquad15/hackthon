import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import Main from './pages/Main';


const container = document.getElementById('root');

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Initial render: Render an element to the root.
root.render(<Main />);

// During an update, there's no need to pass the container again.
// root.render(<Main tab="profile" />);

