import React from "react";
import PropTypes from 'prop-types'

import './tarefas.css';

// Tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa';


export default function Tarefas({ tarefas, handleEdit, handleDelete}) {
  return (
    <ul className="tarefas">
    {tarefas.map((tarefa, index) => (
      <li key={index}> {/* Usando "index" como key */}
        {tarefa}
        <span>
          <FaEdit onClick={(e) => handleEdit(e, index)} className="edit" />
          <FaWindowClose onClick={(e) => handleDelete(e, index)} className="delete" />
        </span>
      </li>
    ))}
  </ul>
  )
}

Tarefas.propTypes = {
  tarefas: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}
