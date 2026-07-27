/* Registro de personas: guardado del formulario del modal.
   Toma la conexión ya inicializada de firebase.js. */

import {
  collection,
  addDoc,
  serverTimestamp
} from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js';

import { db } from './firebase.js';

const COLECCION = 'registros';

/* ===== SERVICIO — acceso a datos, sin DOM ===== */

/* Guarda un registro y devuelve el id del documento */
export async function guardarRegistro(datos) {
  const documento = await addDoc(collection(db, COLECCION), {
    nombre: datos.nombre,
    apellido: datos.apellido,
    celular: datos.celular,
    email: datos.email,
    habeas: datos.habeas,
    creado: serverTimestamp()
  });

  return documento.id;
}

/* Arma el objeto del registro a partir del formulario */
export function leerFormulario(formulario) {
  return {
    nombre: formulario.nombre.value.trim(),
    apellido: formulario.apellido.value.trim(),
    celular: formulario.celular.value.trim(),
    email: formulario.email.value.trim().toLowerCase(),
    habeas: formulario.habeas.checked
  };
}

/* ===== ENGANCHE CON EL FORMULARIO ===== */

export function iniciarFormularioRegistro() {
  const formulario = document.getElementById('formulario_registro');
  if (!formulario) return;

  const boton = formulario.querySelector('.modal_btn_submit');

  /* El celular solo acepta dígitos, también al pegar */
  formulario.celular.addEventListener('input', function () {
    const soloNumeros = this.value.replace(/\D/g, '');
    if (this.value !== soloNumeros) this.value = soloNumeros;
  });

  /* Aviso de error. Se crea acá para no tocar el index.html */
  const estado = document.createElement('p');
  estado.className = 'modal_estado';
  estado.setAttribute('role', 'status');
  formulario.appendChild(estado);

  function avisar(mensaje, esError) {
    estado.textContent = mensaje;
    estado.classList.toggle('es_error', Boolean(esError));
  }

  formulario.addEventListener('submit', async function (evento) {
    // Sin esto el navegador recarga la página
    evento.preventDefault();

    // Primero los mensajes nativos del navegador
    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    // Bloqueado para que un doble clic no cree dos registros
    boton.disabled = true;
    avisar('Enviando...', false);

    try {
      const id = await guardarRegistro(leerFormulario(formulario));

      console.log('Registro guardado con id:', id);
      formulario.reset();
      avisar('', false);

      // main.js se encarga de cerrar el modal y mostrar el gracias
      document.dispatchEvent(new CustomEvent('registro:exitoso'));
    } catch (error) {
      console.error('No se pudo guardar el registro:', error);
      avisar('No pudimos guardar tus datos. Intenta de nuevo.', true);
    } finally {
      boton.disabled = false;
    }
  });
}

iniciarFormularioRegistro();
