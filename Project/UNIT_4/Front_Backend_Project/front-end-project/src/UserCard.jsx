import { useState } from 'react';

const BANNER_COLORS = [
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
  'linear-gradient(135deg, #84fab0, #8fd3f4)',
  'linear-gradient(135deg, #f6d365, #fda085)',
  'linear-gradient(135deg, #89f7fe, #66a6ff)',
  'linear-gradient(135deg, #fddb92, #d1fdff)',
];

function UserCard({ user, index }) {
  const [hovered, setHovered] = useState(false);
  const banner = BANNER_COLORS[index % BANNER_COLORS.length];

  return (
    <div
      style={{ ...styles.card, ...(hovered ? styles.cardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Banner */}
      <div style={{ ...styles.banner, background: banner }} />

      {/* Avatar */}
      <div style={styles.avatarWrapper}>
        <img src={user.userImage} alt={user.name} style={styles.avatar} />
      </div>

      {/* Info */}
      <div style={styles.body}>
        <h3 style={styles.name}>{user.name}</h3>

        <div style={styles.tagRow}>
          <span style={{ ...styles.tag, background: '#ede9fe', color: '#7c3aed' }}>
            🎂 Age {user.age}
          </span>
          <span style={{ ...styles.tag, background: '#dcfce7', color: '#16a34a' }}>
            📍 {user.city}
          </span>
        </div>

        <div style={styles.divider} />

        <div style={styles.idRow}>
          <span style={styles.idBadge}>#{String(user.id).padStart(3, '0')}</span>
          <span style={styles.emailText}>✉ {user.email || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHover: {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 40px rgba(0,0,0,0.16)',
  },
  banner: {
    height: '90px',
    width: '100%',
  },
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-40px',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    border: '4px solid #fff',
    objectFit: 'cover',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  body: {
    padding: '12px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  name: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '0.3px',
  },
  tagRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  tag: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  divider: {
    width: '100%',
    height: '1px',
    background: '#f1f5f9',
  },
  idRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  idBadge: {
    background: '#f1f5f9',
    color: '#64748b',
    padding: '3px 10px',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  emailText: {
    fontSize: '12px',
    color: '#94a3b8',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '160px',
  },
};

export default UserCard;
