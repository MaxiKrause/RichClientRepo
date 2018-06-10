import ReactDOM from 'react-dom';
import './index.css';
import { Main } from './components/Main.js';

const routes = Main();

ReactDOM.render(routes, document.getElementById('root'));