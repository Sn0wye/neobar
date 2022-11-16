import './app.css';
import { CMDK } from './components/CMDK';
import './styles/globals.css';
import './styles/vercel.scss';

export function App<FC>() {
  return (
    <div class='container dark'>
      <CMDK />
    </div>
  );
}
