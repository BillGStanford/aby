import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ArticleDetail from './pages/ArticleDetail';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import Guidelines from './pages/Guidelines';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Search from './pages/Search';

// ✅ ADD THIS IMPORT
import AnalyticsTracker from './components/AnalyticsTracker';

export default function App() {
  return (
    <BrowserRouter>
      {/* ✅ ADD THIS — must be inside BrowserRouter */}
      <AnalyticsTracker />

      <div className="flex flex-col min-h-screen bg-neutral-950 text-white">
        <Header />

        <main className="flex-1 pt-16 sm:pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/guidelines" element={<Guidelines />} />
            <Route path="/about" element={<About />} />
            <Route path="/search" element={<Search />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}