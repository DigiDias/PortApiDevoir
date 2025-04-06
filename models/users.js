const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  username: { type: String, trim: true, required: [true, 'Le nom est requis'] },
  email: { type: String, trim: true, required: [true, "L'email est requis"], unique: true, lowercase: true },
  password: { type: String, trim: true, required: [true, 'Le mot de passe est requis'] }
}, { 
  timestamps: true 
});

// Middleware avant la sauvegarde pour hasher le mot de passe
UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

// Export du modèle
module.exports = mongoose.model('User', UserSchema);