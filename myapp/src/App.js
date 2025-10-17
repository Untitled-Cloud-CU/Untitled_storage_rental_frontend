import React from "react";

function App() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "#fff8f3", // soft peach background
      color: "#3d2b1f",           // warm dark text
      fontFamily: "Poppins, sans-serif",
      textAlign: "center",
    },
    title: {
      fontSize: "2.8rem",
      color: "#ffb997", // peach accent
      fontWeight: "700",
    },
    subtitle: {
      marginTop: "1rem",
      fontSize: "1.2rem",
      color: "#5c4033",
    },
    button: {
      marginTop: "2rem",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      backgroundColor: "#ffb997",
      color: "white",
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      transition: "0.3s",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Storage Rental Platform</h1>
      <p style={styles.subtitle}>Placeholder UI</p>
      <p style={styles.subtitle}> Microserivede Integration coming soon</p>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#ffa77a")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#ffb997")}
      >
        Explore Listings
      </button>
    </div>
  );
}

export default App;
