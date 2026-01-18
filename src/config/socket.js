import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('Socket configuration:', {
    url: SOCKET_URL,
    environment: process.env.NODE_ENV
});

export const socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 5,
    transports: ['websocket', 'polling']
});

socket.on('connect', () => {
    console.log('✅ Socket connecté:', socket.id);
});

socket.on('disconnect', (reason) => {
    console.log('❌ Socket déconnecté:', reason);
});

socket.on('connect_error', (error) => {
    console.error('❌ Erreur de connexion socket:', error.message);
});
