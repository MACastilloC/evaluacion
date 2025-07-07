'use client';
import React from 'react';
import { Voluntario } from '../types/Voluntario';

interface Props {
  voluntarios: Voluntario[];
  editar: (index: number) => void;
  eliminar: (index: number) => void;
}

export default function Tabla({ voluntarios, editar, eliminar }: Props) {
  return (
    <div style={{ marginTop: 30 }}>
      {voluntarios.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No hay voluntarios registrados.</p>
      ) : (
        voluntarios.map((v, i) => (
          <div key={i} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#111'
          }}>
            <h3 style={{ marginBottom: 5 }}>{v.nombre}</h3>
            <p><strong>Fecha de inscripción:</strong> {v.fecha}</p>
            <p><strong>Años de experiencia:</strong> {v.experiencia}</p>
            <p><strong>Rol deseado:</strong> {v.rol}</p>
            <p><strong>Comentarios:</strong> {v.comentarios || 'Sin comentarios'}</p>
            <div style={{ marginTop: 10 }}>
              <button onClick={() => editar(i)} style={{ marginRight: 10 }}>Editar</button>
              <button onClick={() => eliminar(i)}>Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
