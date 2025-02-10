import React, { Component } from 'react';
import './main.css';

// Form
import { FaPlus } from 'react-icons/fa';

// Tarefas
import { FaEdit, FaWindowClose } from 'react-icons/fa';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };

  handleSubmit = (e) => {
    e.preventDefault(); // Evita o comportamento padrão de atualizar a página
    const { tarefas, index } = this.state; //aqui ele pega o input e joga no tarefa e nova tarefa
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim(); // Remove espaços extras no final e no início

    if (novaTarefa === '') return; // Previne adicionar tarefas vazias
    if (tarefas.indexOf(novaTarefa) !== -1) return; // Previne adicionar tarefas duplicadas

const novasTarefas = [...tarefas]

    if(index === -1) {
      this.setState({
        tarefas: [...novasTarefas, novaTarefa], // Adiciona a nova tarefa à lista
        novaTarefa: '', // Limpa o campo de entrada após a adição
      });
    } else {
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        index: -1,
      })
    }


  };

  handleChange = (e) => {
    this.setState({
      novaTarefa: e.target.value,
    });
  };

// função pra editar HandleEdit

handleEdit = (e, index) => {
  const { tarefas } = this.state;
  this.setState({
    index,
    novaTarefa: tarefas[index],
  })
}

// função pra apagar handleDelete

handleDelete = (e, index) => {
  const { tarefas } = this.state
  const novasTarefas = [...tarefas];
  novasTarefas.splice(index, 1)

  this.setState({
    tarefas: [...novasTarefas],
  });
}


  render() {
    const { novaTarefa, tarefas } = this.state; // Corrigido para "tarefas"

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>

        <form onSubmit={this.handleSubmit} action="#" className="form">
          <input
            onChange={this.handleChange}
            type="text"
            value={novaTarefa}
          />
          <button type="submit">
            <FaPlus />
          </button>
        </form>

        <ul className="tarefas">
          {tarefas.map((tarefa, index) => (
            <li key={index}> {/* Usando "index" como key */}
              {tarefa}
              <span>
                <FaEdit onClick={(e) => this.handleEdit(e, index)} className="edit" />
                <FaWindowClose onClick={(e) => this.handleDelete(e, index)} className="delete" />
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
