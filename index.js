const yargs = require("yargs");
const pkg = require("./package.json");
const { addNote, printNodes, deleteNoteById } = require("./notes.controller");

yargs.version(pkg.version);

yargs.command({
  command: "add",
  describe: "Add new note to list",
  builder: {
    title: {
      type: "string",
      describe: "Note title",
      demandOption: true,
    },
  },
  handler({ title }) {
    addNote(title);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove note by id",
  builder: {
    id: {
      type: "number",
      describe: "Note id",
      demandOption: true,
    },
  },
  handler({ id }) {
    deleteNoteById(id);
  },
});

yargs.command({
  command: "list",
  describe: "Print all notes",
  async handler() {
    printNodes();
  },
});

yargs.parse();

// node index add --title=Hello
