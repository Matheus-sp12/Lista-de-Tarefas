import React, { Component } from 'react';
import Form from './Form';
import Tarefas from './Tarefas'

import './main.css';



export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1,
  };


  //salvar no localStorage

  componentDidMount() { //não deixa perder os dados quando atualiza
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if(!tarefas) return;
    this.setState({ tarefas });
  }

  componentDidUpdate(prevPropos, prevState) {
    const { tarefas } = this.state; // função praa adicionar o localstorage

    if ( tarefas === prevState.tarefas) return;

    localStorage.setItem('tarefas', JSON.stringify(tarefas));
    console.log('As tarefas mudaram', tarefas);
  }


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

      <Form handleSubmit={this.handleSubmit}
      handleChange={this.handleChange}
      novaTarefa={novaTarefa}
      />

      <Tarefas
      tarefas={tarefas}
      handleEdit={this.handleEdit}
      handleDelete={this.handleDelete} />


      </div>
    );
  }
}
