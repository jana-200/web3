import './index.css';
import onepiece from "./assets/onepiece.png";
import bleach from "./assets/bleach.png";
import snk from "./assets/snk.png";
import jjk from "./assets/jjk.png";
import socket from "./VisitorTracker";
import { useEffect } from 'react';


export default function App() {

   useEffect(() => {
    socket.on("visitor-count", (data) => {
      console.log("Visiteurs connectés :", data.count);
    });

    socket.on("all-locations", (data) => {
      console.log("Toutes les positions :", data.visitors);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        socket.emit("location", {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      });
    }

    socket.emit("get-all-locations");

    return () => {
      socket.off("visitor-count");
      socket.off("all-locations");
    };
  }, []);

  const animes = [
    {
      title: "One Piece",
      desc: "Luffy part à la conquête du One Piece pour devenir le roi des pirates.",
      img: onepiece
    },
    {
      title: "Bleach",
      desc: "Ichigo devient Shinigami et affronte des esprits maléfiques.",
      img: bleach
    },
    {
      title: "Attack on Titan",
      desc: "L'humanité lutte contre les Titans dans un monde ravagé.",
      img: snk
    },
    {
      title: "Jujutsu Kaisen",
      desc: "Yuji combat les malédictions avec ses compagnons sorciers.",
      img: jjk
    }
  ];

  return (
    <div className="page">
      <header className="header">
        <h1 className="logo">Anime<span>Samurai</span></h1>
        <nav className="nav">
          <a href="#">Accueil</a>
          <a href="#animes">Animes</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero">
        <h2>Le monde des anime, version <span>Samurai</span></h2>
        <p>Explore un univers sombre, puissant, inspiré de la culture japonaise.</p>
      </section>

      <section id="animes" className="anime-grid">
        {animes.map(a => (
          <div className="anime-card" key={a.title}>
            <img src={a.img} alt={a.title} />
            <div className="anime-content">
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
            </div>
          </div>
        ))}
      </section>

      <footer id="contact" className="footer">© {new Date().getFullYear()} AnimeSamurai</footer>
    </div>
  );
}
