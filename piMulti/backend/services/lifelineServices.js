function removeWrongAnswers(correctAnswer, options) {
    const wrongOptions = options.filter(opt => opt !== correctAnswer);
    const randomWrong = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    const result = [correctAnswer, randomWrong].sort(() => Math.random() - 0.5);
    return result;
}

// Simula um amigo dando a resposta (80% de chance de estar certo)
function askFriend(correctAnswer, options) {
    const chance = Math.random();
    return chance < 0.8 ? correctAnswer : options[Math.floor(Math.random() * options.length)];
}

module.exports = {
    removeWrongAnswers,
    askFriend,
};
