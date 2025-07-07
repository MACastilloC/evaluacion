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
    <table style={{ width: '100%', color: 'white', marginTop: 20 }}>
      <thead>
        <tr>
          <th>Nombre completo</th>
          <th>Fecha de inscripción</th>
          <th>Años de experiencia</th>
          <th>Rol deseado</th>
          <th>Comentarios</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {voluntarios.length > 0 ? voluntarios.map((v, i) => (
          <tr key={i}>
            <td>{v.nombre}</td>
            <td>{v.fecha}</td>
            <td>{v.experiencia}</td>
            <td>{v.rol}</td>
            <td>{v.comentarios}</td>
            <td>
              <button onClick={() => editar(i)}>Editar</button>
              <button onClick={() => eliminar(i)}>Eliminar</button>
            </td>
          </tr>
        )) : (
          <tr><td colSpan={6} style={{ textAlign: 'center' }}>No hay registros.</td></tr>
        )}
      </tbody>
    </table>
  );
}
