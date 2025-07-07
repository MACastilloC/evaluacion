'use client';
import React from 'react';
import { Voluntario } from '../types/Voluntario';

interface Props {
  voluntarios: Voluntario[];
  editar: (index: number) => void;
  eliminar: (index: number) => void;
}