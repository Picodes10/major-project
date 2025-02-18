import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Home.css'


const Home = () => {
  return (
    <div className="home-page">
      <Navbar />
      
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to MyApp</h1>
          <p>Your health, our priority. Get accurate predictions and insights.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </header>

      <section className="features-section">
        <h2>Our Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Accurate Predictions</h3>
            <p>State-of-the-art machine learning models for precise results.</p>
          </div>
          <div className="feature-card">
            <h3>Easy to Use</h3>
            <p>Simple interface for quick and efficient predictions.</p>
          </div>
          <div className="feature-card">
            <h3>Detailed Reports</h3>
            <p>Comprehensive analysis and actionable insights.</p>
          </div>
        </div>
      </section>

      <section className="about-section">
        <h2>About Us</h2>
        <p>
          We are dedicated to providing the best health prediction services using 
          cutting-edge technology and medical expertise.
        </p>
      </section>

      <Footer />
    </div>
  )
}

export default Home
