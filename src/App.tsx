import React, { useState } from 'react';
import './index.css';

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

const App: React.FC = () => {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [filtro, setFiltro] = useState<string>('todo');
  const [nuevaTarea, setNuevaTarea] = useState<string>('');

  const agregarTarea = () => {
    if (nuevaTarea.trim()) {
      const nueva: Tarea = {
        id: Date.now(),
        texto: nuevaTarea,
        completada: false
      };
      setTareas([...tareas, nueva]);
      setNuevaTarea('');
    }
  };

  const toggleCompletada = (id: number) => {
    setTareas(
      tareas.map(tarea =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const limpiarCompletadas = () => {
    setTareas(tareas.filter(tarea => !tarea.completada));
  };

  // Filtrado de las tareas según el filtro activo
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'activa') {
      return !tarea.completada; // Mostrar solo tareas activas (no completadas)
    }
    if (filtro === 'completada') {
      return tarea.completada; // Mostrar solo tareas completadas
    }
    return true; // Mostrar todas las tareas
  });

  // Calcular el número de tareas restantes (activas)
  const tareasRestantes = tareas.filter(tarea => !tarea.completada).length;

  return (
    <div className="todoapp">
      <h1>Lista de Tareas</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Agregar nueva tarea"
          value={nuevaTarea}
          onChange={(e) => setNuevaTarea(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && agregarTarea()}
        />
        <button onClick={agregarTarea}>Agregar</button>
      </div>

      <ul className="todo-list">
        {tareasFiltradas.map(tarea => (
          <li key={tarea.id} className={tarea.completada ? 'completada' : ''}>
            <div className="view">
              <input
                type="checkbox"
                checked={tarea.completada}
                onChange={() => toggleCompletada(tarea.id)}
              />
              <label>{tarea.texto}</label>
            </div>
          </li>
        ))}
      </ul>

      {tareas.length > 0 && (
        <footer className="footer">
          <span className="todo-count">
            <strong>{tareasRestantes}</strong> tareas restantes
          </span>
          <div className="filters">
            <button
              className={filtro === 'todo' ? 'selected' : ''}
              onClick={() => setFiltro('todo')}
            >
              Todas
            </button>
            <button
              className={filtro === 'activa' ? 'selected' : ''}
              onClick={() => setFiltro('activa')}
            >
              Activas
            </button>
            <button
              className={filtro === 'completada' ? 'selected' : ''}
              onClick={() => setFiltro('completada')}
            >
              Completadas
            </button>
          </div>
          <button className="clear-completed" onClick={limpiarCompletadas}>
            Limpiar completadas
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;

