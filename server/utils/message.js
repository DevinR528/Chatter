var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().toTimeString()
    };
};

module.exports = { generateMessage };