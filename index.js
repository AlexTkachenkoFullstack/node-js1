const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      // ... name email phone
      const addedContact = await contacts.addContact({ name, email, phone });
      return console.log(addedContact);
      break;

    case "remove":
      const deletedContact = await contacts.removeContact(id);
      return console.log(deletedContact);
      break;

    case "updateContact":
      const updatedContact = await contacts.updateContact(id, {
        name,
        email,
        phone,
      });
      console.log(updatedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
