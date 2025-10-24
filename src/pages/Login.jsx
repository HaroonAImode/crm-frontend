import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContextValue'; // ✅ Make sure this matches your context file
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return alert('Please enter both email and password');

    // Call the global login function from context
    login(email);

    // Redirect to dashboard/home after login
    navigate('/');
  };

  const styles = {
    wrapper: {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #007bff 0%, #00b4d8 100%)',
      fontFamily: 'Inter, sans-serif',
    },
    card: {
      width: 360,
      background: '#fff',
      borderRadius: 12,
      padding: 32,
      boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      marginBottom: 20,
      color: '#333',
    },
    input: {
      width: '100%',
      padding: '12px 14px',
      margin: '8px 0 16px',
      border: '1px solid #ccc',
      borderRadius: 8,
      fontSize: 15,
      outline: 'none',
      transition: 'border 0.2s ease',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      width: '100%',
      padding: '12px 14px',
      border: 'none',
      background: '#007bff',
      color: '#fff',
      fontSize: 16,
      borderRadius: 8,
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    buttonHover: {
      background: '#0056b3',
    },
  };

  return (
    <div style={styles.wrapper}>
      <form style={styles.card} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Sign In</h2>
        <input
          type="email"
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
}
