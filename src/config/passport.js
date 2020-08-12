const passport = require("passport");
const { Strategy } = require("passport-local");

const User = require("../models/user");

passport.use(
  "signup",
  new Strategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // Buscar un correo electrónico existente
      const userFound = await User.findOne({ email });

      // devolver un error si el correo electrónico ya existe
      if (userFound) {
        return done(null, false, { message: "The username is already Taken" });
      }

      // Crear un nuevo usuario
      const newUser = new User();
      newUser.email = email;
      newUser.password = await User.encryptPassword(password);
      const userSaved = await newUser.save();

      // crear un mensaje de éxito
      req.flash("success", "Ingresa con tu nueva cuenta");

      // devuelve la sesión
      return done(null, userSaved);
    }
  )
);

passport.use(
  "signin",
  new Strategy(
    {
      passwordField: "password",
      usernameField: "email",
    },
    async (email, password, done) => {
      // Encuentra al usuario por correo electrónico
      const userFound = await User.findOne({ email });

      // Si el usuario no existe
      if (!userFound) return done(null, false, { message: "Not User found." });

      // coincidencia de contraseña
      const match = await userFound.matchPassword(password);

      if (!match) return done(null, false, { message: "Incorrect Password." });

      return done(null, userFound);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = (await User.findById(id)).toObject();
    // Eliminar al usuario de la respuesta del objeto
    if (user) {
      delete user.password;
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
});
