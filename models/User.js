const
    mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs'),
    userSchema = new mongoose.Schema({
        name: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        watchedStocks: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stock'
        }]
        // ,
        // snapshot:[ stockid, ]
    }, { timestamps: true });

// add method to instance of User to create a hashed password
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// add method to instance of User to validate given password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

// before saving an instance of User, check if the password was changed
userSchema.pre('save', function(next) {
    // if changed, save the new password
    if (this.isModified('password')) {
        this.password = this.generateHash(this.password);
    };
    next();
})

const User = mongoose.model("User", userSchema);
module.exports = User;