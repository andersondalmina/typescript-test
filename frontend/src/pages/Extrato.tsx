import 'react-datepicker/dist/react-datepicker.css';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Layout from './Layout';
import api from '../services/api';
import DatePicker, { registerLocale } from 'react-datepicker';
import ptBR from 'date-fns/locale/es';
registerLocale('ptBR', ptBR);

class Extrato extends Component<any> {
  state = {
    initialDate: new Date(),
    endDate: new Date(),
    transactions: [],
    error: '',
  };

  getTransactions = async () => {
    var { initialDate, endDate } = this.state;

    const response = await api.get('/transactions', {
      params: {
        initialDate: initialDate.getTime(),
        endDate: endDate.getTime(),
      },
    });

    this.setState({
      transactions: response.data,
    });
  };

  componentDidMount = () => {
    this.getTransactions();
  };

  renderTypeTransaction(type: number) {
    switch (type) {
      case 1:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
            Depósito
          </span>
        );
      case 2:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
            Retirada
          </span>
        );
      case 3:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
            Pagamento
          </span>
        );
      default:
        return (
          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
            Desconhecido
          </span>
        );
    }
  }

  render = () => {
    const { initialDate, endDate, transactions } = this.state;
    console.log(transactions);
    return (
      <Layout title="Extrato">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 sm:px-6 lg:px-8 flex flex-row justify-evenly">
              <div>
                <span className="mr-3">Data Inicial</span>
                <DatePicker
                  locale="ptBR"
                  dateFormat="dd/MM/yyyy"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  selected={initialDate}
                  onChange={(date) => this.setState({ initialDate: date })}
                  selectsStart
                  startDate={initialDate}
                  endDate={endDate}
                />
              </div>

              <div>
                <span className="mr-3">Data Final</span>
                <DatePicker
                  locale="ptBR"
                  dateFormat="dd/MM/yyyy"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  selected={endDate}
                  onChange={(date) => this.setState({ endDate: date })}
                  selectsEnd
                  startDate={initialDate}
                  endDate={endDate}
                  minDate={initialDate}
                />
              </div>

              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={this.getTransactions}
              >
                Buscar Extrato
              </button>
            </div>

            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((item: any, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {this.renderTypeTransaction(item.type)}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {item.date}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          {item.description ?? '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-no-wrap">
                          R$ {item.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  };
}

export default withRouter(Extrato);
