'use client';
import React from 'react';
import { VoluntarioConId } from '@/lib/firebase';

interface Props {
  voluntarios: VoluntarioConId[];
  editar: (voluntario: VoluntarioConId) => void;
  eliminar: (id: string) => void;
  cargando: boolean;
}

export default function Tabla({ voluntarios, editar, eliminar, cargando }: Props) {
  return (
    <div style={{ marginTop: 30 }}>
      {voluntarios.length === 0 ? (
        <p style={{ textAlign: 'center' }}>
          {cargando ? 'Cargando voluntarios...' : 'No hay voluntarios registrados.'}
        </p>
      ) : (
        voluntarios.map((voluntario) => (
          <div key={voluntario.id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '10px',
            marginBottom: '15px',
            backgroundColor: '#111'
          }}>
            <h3 style={{ marginBottom: 5 }}>{voluntario.nombre}</h3>
            <p><strong>Fecha de inscripción:</strong> {voluntario.fecha}</p>
            <p><strong>Años de experiencia:</strong> {voluntario.experiencia}</p>
            <p><strong>Rol deseado:</strong> {voluntario.rol}</p>
            <p><strong>Comentarios:</strong> {voluntario.comentarios || 'Sin comentarios'}</p>
            <div style={{ marginTop: 10 }}>
              <button 
                onClick={() => editar(voluntario)} 
                style={{ marginRight: 10 }}
                disabled={cargando}
              >
                Editar
              </button>
              <button 
                onClick={() => eliminar(voluntario.id)}
                disabled={cargando}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}