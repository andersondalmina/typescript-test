import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Layout from './Layout';
import api from '../services/api';

import ModalDeposit from '../components/ModalDeposit';
import ModalWithdrawal from '../components/ModalWithdrawal';
import ModalPayment from '../components/ModalPayment';

class Dashboard extends Component<any> {
  state = {
    value: 0,
    visibleModalDeposit: false,
    visibleModalWithdrawal: false,
    visibleModalPayment: false,
  };

  componentDidMount = async () => {
    this.getUser();
  };

  getUser = async () => {
    const response = await api.get('/users');
    const user = response.data.user;

    this.setState({
      value: user.valueAvailable,
    });
  };

  showModalDeposit = () => {
    this.setState({
      visibleModalDeposit: true,
    });
  };

  closeModalDeposit = () => {
    this.setState({
      visibleModalDeposit: false,
    });

    this.getUser();
  };

  showModalWithdrawal = () => {
    this.setState({
      visibleModalWithdrawal: true,
    });
  };

  closeModalWithdrawal = () => {
    this.setState({
      visibleModalWithdrawal: false,
    });

    this.getUser();
  };

  showModalPayment = () => {
    this.setState({
      visibleModalPayment: true,
    });
  };

  closeModalPayment = () => {
    this.setState({
      visibleModalPayment: false,
    });

    this.getUser();
  };

  render = () => {
    const { value } = this.state;

    return (
      <Layout title="Dashboard">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="max-w-xl px-4 py-4 mx-auto">
              <div className="flex -mx-4">
                <div className="w-full mr-3 flex flex-col justify-center px-4 py-4 bg-white border border-gray-300 rounded">
                  <div>
                    <p className="text-3xl font-semibold text-center text-gray-800">
                      R$ {value}
                    </p>
                    <p className="text-lg text-center text-gray-500">
                      Valor Disponível
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex -mx-4 mt-5">
                <div
                  className="w-full mr-3 flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0 hover:bg-green-500 hover:text-white cursor-pointer"
                  onClick={this.showModalDeposit}
                >
                  <div>
                    <p className="text-2xl font-semibold text-center">
                      Fazer Deposito
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex -mx-4 mt-5">
                <div
                  className="w-full mr-3 flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0 hover:bg-red-500 hover:text-white cursor-pointer"
                  onClick={this.showModalWithdrawal}
                >
                  <div>
                    <p className="text-2xl font-semibold text-center">
                      Retirar Dinheiro
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex -mx-4 mt-5">
                <div
                  className="w-full mr-3 flex flex-col justify-center px-4 py-4 mt-4 bg-white border border-gray-300 rounded sm:mt-0 hover:bg-blue-500 hover:text-white cursor-pointer"
                  onClick={this.showModalPayment}
                >
                  <div>
                    <p className="text-2xl font-semibold text-center">
                      Realizar Pagamento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ModalDeposit
          visible={this.state.visibleModalDeposit}
          close={this.closeModalDeposit}
        />
        <ModalWithdrawal
          visible={this.state.visibleModalWithdrawal}
          close={this.closeModalWithdrawal}
        />
        <ModalPayment
          visible={this.state.visibleModalPayment}
          close={this.closeModalPayment}
        />
      </Layout>
    );
  };
}

export default withRouter(Dashboard);
