'use client';
import React, { useEffect, useState } from 'react';
import { Voluntario } from './types/Voluntario';
import Formulario from './components/Formulario';
import Tabla from './components/Tabla';
import { roles } from './data/roles';
import { 
  obtenerVoluntarios, 
  agregarVoluntario, 
  actualizarVoluntario, 
  eliminarVoluntario,
  VoluntarioConId 
} from '@/lib/firebase';

const voluntarioInicial: Voluntario = {
  nombre: '',
  experiencia: '',
  rol: '',
  comentarios: '',
  fecha: new Date().toISOString().split('T')[0],
};

export default function Page() {
  const [voluntarios, setVoluntarios] = useState<VoluntarioConId[]>([]);
  const [formulario, setFormulario] = useState<Voluntario>(voluntarioInicial);
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [filtroRol, setFiltroRol] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    cargarVoluntarios();
  }, []);

  const cargarVoluntarios = async () => {
    try {
      setCargando(true);
      const voluntariosObtenidos = await obtenerVoluntarios();
      setVoluntarios(voluntariosObtenidos);
    } catch (error) {
      console.error('Error al cargar voluntarios:', error);
      alert('Error al cargar los voluntarios');
    } finally {
      setCargando(false);
    }
  };

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

  const manejarRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validar()) {
      alert('Complete correctamente todos los campos.');
      return;
    }

    try {
      setCargando(true);
      if (editandoId === null) {
        await agregarVoluntario(formulario);
      } else {
        await actualizarVoluntario(editandoId, formulario);
        setEditandoId(null);
      }
      setFormulario(voluntarioInicial);
      await cargarVoluntarios();
    } catch (error) {
      console.error('Error al guardar voluntario:', error);
      alert('Error al guardar el voluntario');
    } finally {
      setCargando(false);
    }
  };

  const editar = (voluntario: VoluntarioConId) => {
    setFormulario({
      nombre: voluntario.nombre,
      experiencia: voluntario.experiencia,
      rol: voluntario.rol,
      comentarios: voluntario.comentarios,
      fecha: voluntario.fecha
    });
    setEditandoId(voluntario.id);
  };

  const eliminar = async (id: string) => {
    if (confirm('¿Eliminar este voluntario?')) {
      try {
        setCargando(true);
        await eliminarVoluntario(id);
        await cargarVoluntarios();
        if (editandoId === id) {
          setFormulario(voluntarioInicial);
          setEditandoId(null);
        }
      } catch (error) {
        console.error('Error al eliminar voluntario:', error);
        alert('Error al eliminar el voluntario');
      } finally {
        setCargando(false);
      }
    }
  };

  const voluntariosFiltrados = filtroRol
    ? voluntarios.filter(v => v.rol === filtroRol)
    : voluntarios;

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: 20 }}>
      <h2>Registro de Voluntarios</h2>

      {cargando && <p>Cargando...</p>}

      <Formulario
        formulario={formulario}
        manejarCambio={manejarCambio}
        manejarRegistro={manejarRegistro}
        editandoId={editandoId}
        cargando={cargando}
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
        cargando={cargando}
      />
    </div>
  );
}