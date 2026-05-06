import { useState, useEffect } from 'react';
import UserCard from './UserCard';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div style={styles.page}>

      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <h1 style={styles.title}>👥 User Directory</h1>
            <p style={styles.subtitle}>Meet the team </p>
          </div>
          <div style={styles.statBox}>
            <span style={styles.statNumber}>{users.length}</span>
            <span style={styles.statLabel}>Members</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div style={styles.container}>
        {users.length === 0 ? (
          <p style={styles.loading}>Loading users...</p>
        ) : (
          <div style={styles.grid}>
            {users.map((user, index) => (
              <UserCard key={user.id} user={user} index={index} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f8fafc',
    fontFamily: "'Segoe UI', sans-serif",
  },
  header: {
    background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4f46e5 100%)',
    padding: '40px 40px 60px',
    clipPath: 'ellipse(100% 100% at 50% 0%)',
  },
  headerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  title: {
    margin: 0,
    fontSize: '36px',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    margin: '6px 0 0',
    color: '#c7d2fe',
    fontSize: '15px',
  },
  statBox: {
    background: 'rgba(255,255,255,0.12)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '16px',
    padding: '16px 28px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: '800',
    color: '#fff',
    lineHeight: 1,
  },
  statLabel: {
    fontSize: '13px',
    color: '#c7d2fe',
    marginTop: '4px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  container: {
    maxWidth: '1200px',
    margin: '-30px auto 0',
    padding: '0 24px 60px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: '24px',
  },
  loading: {
    textAlign: 'center',
    color: '#94a3b8',
    fontSize: '18px',
    marginTop: '60px',
  },
};

export default App;
