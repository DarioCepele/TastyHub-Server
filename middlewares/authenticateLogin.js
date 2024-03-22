const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authenticateLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Trova l'utente nel database per l'email fornita
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    // Se l'utente esiste e la password corrisponde, genera un token JWT
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Aggiungi il token JWT alla risposta o all'oggetto di richiesta se necessario
    res.locals.token = token; // Puoi utilizzare res.locals per passare dati alla route successiva, se necessario

    next(); // Passa al controller di login
  } catch (error) {
    return res.status(500).json({ error: "Impossibile effettuare l'accesso" });
  }
};

module.exports = authenticateLogin;
