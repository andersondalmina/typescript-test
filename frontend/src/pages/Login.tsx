import React, { Component, SyntheticEvent } from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../services/api';
import { login } from '../services/auth';

class Login extends Component<any> {
  state = {
    email: '',
    password: '',
    error: '',
  };

  handleLogin = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'Preencha todos os dados para entrar' });
    } else {
      try {
        const response = await api.post('/auth', { email, password });
        login(response.data.token);
        this.props.history.push('/dashboard');
      } catch (err) {
        this.setState({ error: 'Usuário e/ou senha inválidos' });
      }
    }
  };

  render = () => {
    const { error } = this.state;

    return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-20"
            onSubmit={this.handleLogin}
          >
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="emailInput"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="emailInput"
                name="email"
                type="email"
                placeholder="Preencha seu email"
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordInput"
              >
                Senha
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="passwordInput"
                name="password"
                type="password"
                placeholder="Preencha sua senha"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Entrar
              </button>
            </div>
            <div className="flex items-center justify-between">
              <Link
                to="signup"
                className="bg-gray-200 hover:bg-gray-300 text-center text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="submit"
              >
                Criar Conta
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default withRouter(Login);
