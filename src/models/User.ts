import { hash } from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8
    },
    bio: {
        type: String,
        minLength: 10
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    this.password = await hash(this.password, 10);
    next();
});

userSchema.statics.login = () => {

}

const User = model('user', userSchema);

export default User;