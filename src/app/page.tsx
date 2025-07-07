'use client';
import React, { useEffect, useState } from 'react';
import { Voluntario } from './types/Voluntario';
import Formulario from './components/Formulario';
import Tabla from './components/Tabla';
import { roles } from './data/roles';

const voluntarioInicial: Voluntario = {
  nombre: '',
  experiencia: '',
  rol: '',
  comentarios: '',
  fecha: new Date().toISOString().split('T')[0],
};

export default function Page() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [formulario, setFormulario] = useState<Voluntario>(voluntarioInicial);
  const [indiceEditar, setIndiceEditar] = useState<number | null>(null);
  const [filtroRol, setFiltroRol] = useState('');

  useEffect(() => {
    const almacenados = localStorage.getItem('voluntarios');
    if (almacenados) setVoluntarios(JSON.parse(almacenados));
  }, []);

  useEffect(() => {
    localStorage.setItem('voluntarios', JSON.stringify(voluntarios));
  }, [voluntarios]);

  const manejarCambio = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: name === 'experiencia' ? (value === '' ? '' : Number(value)) : value
    }));
  };

  const validar = () => {
    if (formulario.nombre.trim().length < 3) return false;
    if (formulario.experiencia === '' || formulario.experiencia < 0 || formulario.experiencia > 50) return false;
    if (!formulario.rol || !formulario.fecha) return false;
    return true;
  };

  const manejarRegistro = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) {
      alert('Complete correctamente todos los campos.');
      return;
    }
    if (indiceEditar === null) {
      setVoluntarios(prev => [...prev, formulario]);
    } else {
      const nuevos = [...voluntarios];
      nuevos[indiceEditar] = formulario;
      setVoluntarios(nuevos);
      setIndiceEditar(null);
    }
    setFormulario(voluntarioInicial);
  };

  const editar = (index: number) => {
    setFormulario(voluntarios[index]);
    setIndiceEditar(index);
  };

  const eliminar = (index: number) => {
    if (confirm('¿Eliminar este voluntario?')) {
      setVoluntarios(voluntarios.filter((_, i) => i !== index));
      if (indiceEditar === index) setFormulario(voluntarioInicial);
    }
  };

  const voluntariosFiltrados = filtroRol
    ? voluntarios.filter(v => v.rol === filtroRol)
    : voluntarios;

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h2>Registro de Voluntarios</h2>

      <Formulario
        formulario={formulario}
        manejarCambio={manejarCambio}
        manejarRegistro={manejarRegistro}
        indiceEditar={indiceEditar}
      />

      <div style={{ marginTop: 20 }}>
        <label>Filtrar por rol: </label>
        <select value={filtroRol} onChange={e => setFiltroRol(e.target.value)}>
          <option value=''>Todos</option>
          {roles.map(rol => <option key={rol} value={rol}>{rol}</option>)}
        </select>
      </div>

      <Tabla
        voluntarios={voluntariosFiltrados}
        editar={editar}
        eliminar={eliminar}
      />
    </div>
  );
}
