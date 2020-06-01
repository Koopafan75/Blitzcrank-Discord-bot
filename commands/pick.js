/**
 * The pick command makes the bot choose between two options that are separated by "or"
 * 
 * @author Jess Queen
 */
module.exports = {
    name: "pick",
    description: "Makes the bot pick between two options",
    execute(msg, args, Discord) {
        // create a help embed if needed
        const pickHelp = new Discord.MessageEmbed()
        .setColor(0xFFD700)
        .setTitle("Help - Pick")
        .setDescription('Syntax: \n\n!pick <choice1> or <choice2> or ...\n' +
                        'Example: !pick this or that or these or those\n' +
                        'Output: "I pick these!"');

        // invalid command or help command
        if (!(args.includes("or") || args.includes("Or") || args.includes("oR") ||
            args.includes("OR")) || msg.content.toLocaleLowerCase() === "!pick help") {
            msg.reply(pickHelp);
        } else {
            const OR = "or";
            var choice = "I pick ";
            var curChoice = "";
            var numChoices = 0;
            var options = [];

            // use a for loop to get multi-word choices
            for (var i = 1; i < args.length; i++) {
                if (args[i].toLocaleLowerCase() === OR) {
                    options.push(curChoice);
                    curChoice = "";
                    numChoices++;

                    // make sure there is something after the or
                    if (!args[i + 1]) {
                        msg.reply(pickHelp);
                        return;
                    }
                } else {
                    curChoice += args[i] + " ";
                }
            }
            // add the last option
            options.push(curChoice);
            numChoices++;
            
            var n = Math.floor(Math.random() * numChoices);

            // interpret the choice
            choice += options[n];

            msg.channel.send(choice.trimRight() + "!");
        }
    }
}