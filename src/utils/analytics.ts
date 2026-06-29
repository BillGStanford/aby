import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export const initAnalytics = (): void => {
  ReactGA.initialize(GA_MEASUREMENT_ID);
};

export const trackPage = (path: string): void => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
  });
};

export const trackEvent = (
  category: string,
  action: string,
  label?: string
): void => {
  ReactGA.event({
    category,
    action,
    label,
  });
};