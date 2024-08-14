// import { TelegramClient } from "telegram";
// import { StringSession } from "telegram/sessions";
// import readline from "readline";
//
// const apiId = 24651749;
// const apiHash = "82b395343d4e25b88c9107e7ece79366";
// const stringSession = new StringSession("1AgAOMTQ5LjE1NC4xNjcuNDEBuymBk/TiWOlJw4DhNrzmkxtUwUBT75w27Co7TYCsOp4YZd0cwmOhCTTF2CcArMRCc72S/931Vgktvyg930TCgTUMJMn0efqXcZXz/t5Ikjt/HjIPjcoIxXeGB9zGVLd9K/gYFjkczy8FEux4/Cv157wwFs9udtO/R2j8RbAjga9UP8bdP9a03v2PE+FWtyAUn4OtbE4YxOyGbVYYR9kqwrQFrl7DmNULI/Xlo9eMfcx7vV6jKQivV+YxNJDJLgytil0tYsiQ9LHjy1N7E2Hp9ryx9mSNMM9IQ/HE86UGlM7W6qW7r6PqJKK59u9viiSaqEgDSNJuB+P0oUGJ7wAEy70="); // fill this later with the value from session.save()
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });
//
// (async () => {
//     console.log("Loading interactive example...");
//     const client = new TelegramClient(stringSession, apiId, apiHash, {
//         connectionRetries: 5,
//     });
//     await client.start({
//         phoneNumber: async () =>
//             new Promise((resolve) =>
//                 rl.question("Please enter your number: ", resolve)
//             ),
//         password: async () =>
//             new Promise((resolve) =>
//                 rl.question("Please enter your password: ", resolve)
//             ),
//         phoneCode: async () =>
//             new Promise((resolve) =>
//                 rl.question("Please enter the code you received: ", resolve)
//             ),
//         onError: (err) => console.log(err),
//     });
//     console.log("You should now be connected.");
//     console.log(client.session.save()); // Save this string to avoid logging in again
//     // await client.sendMessage("Vvlad_kushh", { message: "хахахаха! Сорри, тестил мессенджер" });
//     // const chats = await client.getDialogs();
//     // console.log("Your chats:", chats);
// })();