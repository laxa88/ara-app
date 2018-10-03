import React from 'react';
import { render } from 'react-dom';
import Hello from './components/Hello.tsx';

const App = () => <Hello age={42} />;

render(<App />, document.getElementById('app'));
