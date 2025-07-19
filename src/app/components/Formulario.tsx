'use client';
import React from 'react';
import { Voluntario } from '../types/Voluntario';
import { roles } from '../data/roles';

interface Props {
  formulario: Voluntario;
  manejarCambio: (e: React.ChangeEvent<any>) => void;
  manejarRegistro: (e: React.FormEvent) => void;
  editandoId: string | null;
  cargando: boolean;
}

export default function Formulario({ 
  formulario, 
  manejarCambio, 
  manejarRegistro, 
  editandoId,
  cargando 
}: Props) {
  return (
    <form onSubmit={manejarRegistro}>
      <input 
        name="nombre" 
        placeholder="Nombre completo" 
        type="text" 
        value={formulario.nombre} 
        onChange={manejarCambio}
        disabled={cargando}
      /><br />
      <input 
        name="fecha" 
        type="date" 
        value={formulario.fecha} 
        onChange={manejarCambio}
        disabled={cargando}
      /><br />
      <input 
        name="experiencia" 
        type="number" 
        placeholder="Años de experiencia" 
        min={0} 
        max={50} 
        value={formulario.experiencia} 
        onChange={manejarCambio}
        disabled={cargando}
      /><br />
      <select 
        name="rol" 
        value={formulario.rol} 
        onChange={manejarCambio}
        disabled={cargando}
      >
        <option value="">Seleccione rol deseado</option>
        {roles.map(rol => <option key={rol} value={rol}>{rol}</option>)}
      </select><br />
      <textarea 
        name="comentarios" 
        placeholder="Comentarios adicionales" 
        value={formulario.comentarios} 
        onChange={manejarCambio}
        disabled={cargando}
      /><br />
      <button type="submit" disabled={cargando}>
        {cargando ? 'Procesando...' : (editandoId === null ? 'Registrar' : 'Actualizar')}
      </button>
    </form>
  );
}