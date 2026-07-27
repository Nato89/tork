/* Configuración de Firebase. Solo inicializa la conexión:
   la lógica de negocio va en los servicios. */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

/* Claves públicas por diseño: los datos los protegen las reglas de Firestore */
const firebaseConfig = {
  apiKey: 'AIzaSyDR8SDkcayPIwX61xC-I9xqTUzLI6WOGjk',
  authDomain: 'tork-54bb5.firebaseapp.com',
  projectId: 'tork-54bb5',
  storageBucket: 'tork-54bb5.firebasestorage.app',
  messagingSenderId: '20228028858',
  appId: '1:20228028858:web:a65aaf83641493201ec583',
  measurementId: 'G-4RCR012SF3'
};

export const app = initializeApp(firebaseConfig);

/* Instancia de Firestore que consumen los servicios */
export const db = getFirestore(app);
