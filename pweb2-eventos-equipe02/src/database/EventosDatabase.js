export class EventosDatabase {
  constructor() {
    this.eventos = [];
    this.proximoId = 1;
  }

  listarTodos() {
    return this.eventos;
  }

  buscarPorId(id) {
    return this.eventos.find(e => e.id === id) || null;
  }

  inserir(dados) {
    const novoEvento = {
      id: this.proximoId++,
      titulo: dados.titulo,
      descricao: dados.descricao,
      vagas: dados.vagas,
      vagasDisponiveis: dados.vagas,
      modalidade: dados.modalidade,
      cargaHoraria: dados.cargaHoraria,
      ativo: true,
      dataCriacao: new Date().toISOString()
    };

    this.eventos.push(novoEvento);
    return novoEvento;
  }

  atualizar(id, dadosAtualizados) {
    const index = this.eventos.findIndex(e => e.id === id);
    if (index === -1) return null;

    this.eventos[index] = {
      ...this.eventos[index],
      ...dadosAtualizados,
      id
    };

    return this.eventos[index];
  }

  remover(id) {
    const index = this.eventos.findIndex(e => e.id === id);
    if (index === -1) return false;

    this.eventos.splice(index, 1);
    return true;
  }

  reduzirVaga(id) {
    const evento = this.buscarPorId(id);
    if (!evento || evento.vagasDisponiveis <= 0) return null;

    evento.vagasDisponiveis--;
    return evento;
  }
}