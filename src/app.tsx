import { ThemeProvider } from 'next-themes';
import './app.css';
import { CMDK } from './components/CMDK';
import './styles/globals.css';
import './styles/vercel.scss';

export function App<FC>() {
  return (
    <ThemeProvider>
      <div class='container dark'>
        <CMDK />
      </div>
    </ThemeProvider>
  );
}
