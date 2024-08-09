import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      isLoggedIn: false,
    };
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      this.setState({ error: 'Invalid email format.' });
      return;
    }

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        email,
        password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Logged in:', data);
      localStorage.setItem('token', data.token);
      this.setState({ isLoggedIn: true, error: '' });
    } else {
      this.setState({ error: 'Logowanie nie powiodło się. Sprawdź swoje dane uwierzytelniające.' });
    }
  };

  handleLogout = () => {
    localStorage.removeItem('token');
    this.setState({ isLoggedIn: false, email: '', password: '' });
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { email, error, isLoggedIn } = this.state;

    if (isLoggedIn) {
      return (
        <div>
          <h2>Witaj</h2>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    }

    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={this.handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={this.handleChange}
              required
            />
          </div>
          {error && <p>{error}</p>}
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
