// src/App.jsx
function App() {
  return (
    <div style={styles.container}>
      <h1>Welcome to E&C Carwash Dashboard</h1>
      <p>This is your dashboard after login.</p>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
};

export default App;
