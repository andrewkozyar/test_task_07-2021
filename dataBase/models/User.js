const { Schema, model } = require('mongoose');

const { dataBaseTablesEnum: { USER }, userStatusesEnum } = require('../../constant');

const userSchema = new Schema({
    age: { type: Number },
    email: { type: String, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: { type: Array },
    status: { type: String, default: userStatusesEnum.Pending }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(USER, userSchema);
