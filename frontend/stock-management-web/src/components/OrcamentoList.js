// src/components/OrcamentoList.js

import React, { useState, useEffect, useRef } from 'react';
import './OrcamentoList.css';  // Estilos específicos para o orçamento (opcional)
import api from '../services/api';

function OrcamentoList() {
  const [orcamentos, setOrcamentos] = useState([]);  // Inicializar com um array vazio
  const [itens, setItens] = useState([]);  // Para armazenar os itens adicionados
  const [cliente, setCliente] = useState('');
  const [validade, setValidade] = useState('');
  const [descricao, setDescricao] = useState('');
  const [especificacao, setEspecificacao] = useState('UND');
  const [quantidade, setQuantidade] = useState('');
  const [valorUnitario, setValorUnitario] = useState('');
  const [status, setStatus] = useState('Pendente');
  const [message, setMessage] = useState('');

  const printRef = useRef();

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await api.get('/orcamentos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Dados recebidos:', response.data);  // Verificar os dados recebidos
        setOrcamentos(response.data);  // Verifica se está atribuindo um array
      } catch (error) {
        setMessage('Erro ao carregar os orçamentos.');
        console.error(error);
      }
    };

    fetchOrcamentos();
  }, []);

// Função para adcionar orçamento
  const adicionarItem = () => {
    const novoItem = {
      descricao,  // Exemplo: "Serviço de Pintura"
      especificacao,  // Exemplo: "M²"
      quantidade: parseInt(quantidade, 10) || 0,
      valor_unitario: parseFloat(valorUnitario) || 0,
      valor_total: parseFloat(quantidade || 0) * parseFloat(valorUnitario || 0),  // Calcula o valor total do item
    };
  
    setItens([...itens, novoItem]);  // Adiciona o novo item à lista
    setDescricao('');  // Limpa o formulário de itens
    setEspecificacao('UND');
    setQuantidade('');
    setValorUnitario('');
  };



  
    // Função para calcular o valor total automaticamente
    const calcularValorTotal = () => {
      return parseFloat(quantidade || 0) * parseFloat(valorUnitario || 0);
    };


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const novoOrcamento = {
        cliente,  // String
        validade,  // Data no formato "YYYY-MM-DD"
        status,  // String: "Pendente", "Aprovado" ou "Rejeitado"
        itens,  // Lista de itens com descrição, quantidade, valor_unitario e valor_total
      };
    
      try {
        const token = localStorage.getItem('access_token');  // Recupera o token JWT
        const response = await api.post('/orcamentos/', novoOrcamento, {
          headers: {
            Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
            'Content-Type': 'application/json',
          },
        });
    
        setOrcamentos([...orcamentos, response.data]);  // Atualiza a lista de orçamentos com o novo
        setCliente('');
        setValidade('');
        setStatus('Pendente');
        setItens([]);  // Limpa a lista de itens após o envio
        setMessage('Orçamento adicionado com sucesso!');
      } catch (error) {
        setMessage('Erro ao adicionar o orçamento.');
        console.error(error.response.data);  // Verifica a mensagem de erro no console
      }
    };
    

  // Função para excluir um orçamento
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
      await api.delete(`/orcamentos/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,  // Envia o token no cabeçalho
        },
      });

      // Atualiza a lista de orçamentos após a exclusão
      setOrcamentos(orcamentos.filter((orcamento) => orcamento.id !== id));
    } catch (error) {
      console.error('Erro ao excluir orçamento:', error);
      alert('Falha ao excluir o orçamento. Tente novamente.');
    }
  };

  // Função para imprimir o orçamento
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Imprimir Orçamento</title>');
    printWindow.document.write('<style>@media print { body { font-family: Arial, sans-serif; } .no-print { display: none; } }</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printContents);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  

  // Função para enviar o orçamento por email
  const handleEmail = async (orcamento) => {
    try {
      const token = localStorage.getItem('access_token');  // Recupera o token JWT
      const response = await api.post(`/orcamentos/${orcamento.id}/enviar-email/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Caso a requisição tenha sucesso, você pode usar a resposta da API
      console.log('Produto criado com sucesso:', response.data);

      setMessage(`Orçamento enviado por email para ${orcamento.cliente}.`);
    } catch (error) {
      setMessage('Erro ao enviar o orçamento por email.');
    }
  };

  const removerItem = (index) => {
    const novaLista = itens.filter((item, i) => i !== index);
    setItens(novaLista);  // Atualiza a lista de itens
  };
  


  return (
    <div className="orcamento-container">
      <h1>Gerenciar Orçamentos</h1>
      {message && <p>{message}</p>}

      {/* Formulário para adicionar novos orçamentos */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cliente">Cliente:</label>
          <input
            type="text"
            id="cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="validade">Validade:</label>
          <input
            type="date"
            id="validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            type="text"
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="especificacao">Especificacao:</label>
          <select
            id="status"
            value={especificacao}
            onChange={(e) => setEspecificacao(e.target.value)}
          >
            <option value="UND">UND</option>
            <option value="M²">M²</option>
            </select>
        </div>
        <div className="form-group">
          <label htmlFor="quantidade">Quantidade:</label>
          <input
            type="number"
            id="quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="valor_unitario">Valor Unitário (R$):</label>
          <input
            type="number"
            id="valor_unitario"
            value={valorUnitario}
            onChange={(e) => setValorUnitario(e.target.value)}
            step="0.01"
          />
        </div>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Pendente">Pendente</option>
            <option value="Aprovado">Aprovado</option>
            <option value="Rejeitado">Rejeitado</option>
          </select>
        </div>
        <button type="button" onClick={adicionarItem}>Adicionar Item</button><p></p>
        <button type="submit">Adicionar Orçamento</button>
      </form>

      {/* Exibir a lista de itens adicionados */}
          <ul>
        {itens.map((item, index) => (
          <li key={index}>
            {item.descricao} - {item.quantidade} {item.especificacao} - R$ {item.valor_unitario} - Total: R$ {item.valor_total}
            <button type="button" onClick={() => removerItem(index)}>Remover</button>
          </li>
        ))}
      </ul>

      {/* Lista de orçamentos */}
      <ul>
        {Array.isArray(orcamentos) && orcamentos.length > 0 ? (
          orcamentos.map((orcamento) => (
            <li key={orcamento.id}>
              {orcamento.cliente} - R$ {typeof orcamento.valor_total === 'number' ? orcamento.valor_total.toFixed(2) : ''} {orcamento.valor_total}  - {orcamento.status}
              <button onClick={() => handlePrint(orcamento)}>Imprimir</button>
              <button onClick={() => handleEmail(orcamento)}>Enviar por Email</button>
              <button onClick={() => handleDelete(orcamento.id)}>Excluir</button>
            </li>
          ))
        ) : (
          <p>Nenhum orçamento encontrado.</p>
        )}
      </ul>
      <div ref={printRef} className="print-section">
        {/* Cabeçalho para Impressão */}
        <header className="print-header">
        <h2>DIVINEVES</h2>          
          <p>Endereço: Avenida Radial B, 21, - Camaçari, Bahia</p>
          <p>Telefone: (71) 2136-3828 | Email: contato@divineeves.com</p>
          <hr />
        </header>

        {/* Conteúdo do Orçamento */}
        <main className="print-content">
          <h3>Orçamento</h3>
          <p><strong>Cliente:</strong> Fulano de Tal</p>
          <p><strong>Data do Orçamento:</strong> 01/09/2024</p>
          <p><strong>Validade:</strong> 30/09/2024</p>

          {/* Exemplo de Tabela de Produtos/Serviços */}
          <table className="orcamento-table">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Quantidade (m²)</th>
                <th>Valor Unitário (R$)</th>
                <th>Valor Total (R$)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Serviço de Pintura</td>
                <td>50</td>
                <td>20,00</td>
                <td>1000,00</td>
              </tr>
              <tr>
                <td>Instalação de Janelas de vidro</td>
                <td>30</td>
                <td>35,00</td>
                <td>1050,00</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"><strong>Total</strong></td>
                <td><strong>R$ 2050,00</strong></td>
              </tr>
            </tfoot>
          </table>
        </main>

        {/* Rodapé para Impressão */}
        <footer className="print-footer">
          <hr />
          <p>DIVINEVES VIDRÇARIA COMÉRCIO DE VIDROS SERVIÇOS E CONSTRUÇÕES LTDA-ME
          - CNPJ: CNPJ:07.757.322/0001-29 
          </p>
          <p>Rua Exemplo, 123 - Cidade, Estado - CEP: 12345-678</p>
          <p>Telefone: (71) 2136-3828 / 99629-7105 | Email: contato@divineves.com</p>
        </footer>
      </div>

      <button onClick={handlePrint} className="no-print">Imprimir</button>
    </div>

  );
}

export default OrcamentoList;
