client = require("../app").client
const fs = require("fs");
module.exports = {
    event: "ready", // Message event
    once: true, // Trigger multiple times
    run() { // This code is run when the event is called, this is the actual function.

        client.user.setActivity('Lydian get developed.', { // Set the bot status, gives it more personality.
            type: 'WATCHING'
        })
            .catch(console.error);

        console.log(`Lydian has booted successfully.`)
            



    }
}
