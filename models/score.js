const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    CorrectAnswer : {
        type: Number,
        required: true
    },
    IncorrectAnswer : {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});
const Score = mongoose.model('Score', ScoreSchema);
module.exports = Score;