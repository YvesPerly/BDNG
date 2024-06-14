const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB URI
const mongoURI = 'mongodb://localhost:27017/DBLP'; // Assurez-vous que votre URI de connexion est correcte

// Connexion à MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à la base de données MongoDB');
});

// Schema MongoDB pour les publications
const publicationSchema = new mongoose.Schema({
  _id: String,
  type: String,
  title: String,
  pages: Object,
  year: Number,
  booktitle: String,
  url: String,
  authors: [String],
});

const Publication = mongoose.model('Publication', publicationSchema);

// Endpoint pour récupérer toutes les publications
app.get('/publications', async (req, res) => {
  try {
    const publications = await Publication.find({});
    console.log('Publications récupérées depuis MongoDB:', publications); // Débogage : Vérifiez les publications récupérées
    res.json(publications);
  } catch (error) {
    console.error('Erreur lors de la récupération des publications :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des publications' });
  }
});

// Lancement du serveur
app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});
