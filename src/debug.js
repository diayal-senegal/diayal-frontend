// Fichier temporaire pour debug
console.log('=== DEBUG INFO ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('API Base URL:', process.env.NODE_ENV === 'production' 
    ? `${process.env.REACT_APP_API_URL}/api` 
    : "http://localhost:5000/api");
console.log('==================');

export default {};