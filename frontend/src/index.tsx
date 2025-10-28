import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import backgroundImage from './assets/background.jpg';

const bodyStyle = {
  background: `url(${backgroundImage}) no-repeat center center fixed`,
  backgroundSize: 'cover',
  margin: 0,
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
  color: '#333',
  minHeight: '100vh',
};

const appStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  background: 'rgba(255, 255, 255, 0.9)', 
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
};

function RootComponent() {
  return (
    <div style={bodyStyle}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100%' }}>
        <div style={appStyle}>
          <App />
        </div>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);