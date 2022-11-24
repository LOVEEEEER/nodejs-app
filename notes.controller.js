const fs = require("fs/promises"); // стандартный модуль который есть во всех NodeJS приложениях
const path = require("path");
const chalk = require("chalk");

const notesPath = path.join(__dirname, "db.json");

async function addNote(title) {
  // const notes = require("./db.json");
  // const notes = Buffer.from(buffer).toString("utf-8"); // преобразумый полученный нами выше буфферт в строку в кодировке UTF-8
  // console.log(JSON.parse(notes)); // распарсиваем ноуты полученные из Buffer.from

  const notes = await getNotes();
  const note = {
    title,
    id: Date.now().toString(),
  };
  notes.push(note);
  await fs.writeFile(notesPath, JSON.stringify(notes));
  console.log(chalk.bgGreen("Note was added!"));
}

async function getNotes() {
  // const notes = require("./db.json");
  // const buffer = await fs.readFile(notesPath);
  // console.log(buffer); // получим bufer. Node.js считывает файлы порционно, потому что файл может весить как 500кб так и 10мб, и чтобы это все работало хорошо, node js считывает таким образом
  // const notes = Buffer.from(buffer).toString("utf-8"); // преобразумый полученный нами выше буфферт в строку в кодировке UTF-8

  const notes = await fs.readFile(notesPath, { encoding: "utf-8" }); // чтобы не прописывать метод toString('utf-8') мы можем прописать это в объекте в в ключе encoding

  console.log(typeof JSON.parse(notes)); // распарсиваем ноуты полученные из Buffer.from

  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function deleteNoteById(id) {
  const notes = await getNotes();
  const updatedNotes = notes.filter((note) => note.id !== id.toString());
  await fs.writeFile(notesPath, JSON.stringify(updatedNotes));
}

async function printNodes() {
  const notes = await getNotes();

  console.log(chalk.bgBlue("Here is the list of notes:"));
  notes.forEach((note) => {
    console.log(chalk.blue(note.id), chalk.bgGray(note.title));
  });
}

module.exports = {
  addNote,
  printNodes,
  deleteNoteById,
};
