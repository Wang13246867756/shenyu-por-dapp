import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Web3ModalProvider } from './components/Web3ModalProvider';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Game from './pages/Game';
import Profile from './pages/Profile';
import AIStore from './pages/AIStore';

function App() {
  return (
    <Web3ModalProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ai-store" element={<AIStore />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Web3ModalProvider>
  );
}

export default App;
