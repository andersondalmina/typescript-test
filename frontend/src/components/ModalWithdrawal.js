import React, { Component, computeDerivedState } from 'react';
import api from '../services/api';

class ModalWithdrawal extends Component {
  state = {
    value: 0,
    visible: false,
    error: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.visible !== nextProps.visible) {
      return {
        visible: nextProps.visible,
      };
    }

    return null;
  }

  handleForm = async () => {
    const { value } = this.state;

    await api
      .post('/withdrawal', {
        value: value,
      })
      .then(() => {
        this.setState({
          error: '',
        });
        this.props.close();
      })
      .catch((error) => {
        this.setState({
          error: error.response.data.message,
        });
      });
  };

  render = () => {
    const { error, visible } = this.state;
    return (
      <div>
        {visible == true && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity">
                <div className="absolute inset-0 bg-gray-500 opacity-75" />
              </div>

              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" />

              <div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <svg
                        className="h-6 w-6 text-red-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      {error && (
                        <div
                          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                          role="alert"
                        >
                          <span className="block sm:inline">{error}</span>
                        </div>
                      )}

                      <h3
                        className="text-lg leading-6 font-medium text-gray-900 mb-5"
                        id="modal-headline"
                      >
                        Que valor gostaria de retirar?
                      </h3>
                      <form>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="emailInput"
                          name="value"
                          type="number"
                          placeholder="Preencha o valor para deposito"
                          onChange={(e) =>
                            this.setState({ value: e.target.value })
                          }
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={this.handleForm}
                    >
                      Retirar
                    </button>
                  </span>
                  <span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                      onClick={this.props.close}
                    >
                      Cancelar
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
}

export default ModalWithdrawal;
