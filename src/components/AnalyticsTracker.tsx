import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initAnalytics, trackPage } from '../utils/analytics';

export default function AnalyticsTracker() {
  const location = useLocation();

  // Initialize once on mount
  useEffect(() => {
    initAnalytics();
  }, []);

  // Track every route change
  useEffect(() => {
    trackPage(location.pathname + location.search);
  }, [location]);

  return null; // renders nothing
}