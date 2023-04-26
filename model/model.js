import Datastore from 'nedb-promises';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
const noteDB = Datastore.create("./db/notes.db")
const userDB = Datastore.create("./db/user.db")

//Note DB
// Hämta alla anteckningar från databasen
export function getNotes(username) {
    return noteDB.find({ username: username })
}

// Spara en anteckning i databasen
export async function createNote (title, text, username) {
    const createdAt = new Date();
    const modifiedAt = new Date();
    const uuid = uuidv4()

    await noteDB.insert({id: uuid, title: title, text: text, createdAt: createdAt, modifiedAt: modifiedAt, username : username})
    console.log('New note created:', {title, text, id: uuid, createdAt, modifiedAt, username});
    return {
        title: title,
        text: text,
        id: uuid
    }
}

// Ta bort en anteckning från databasen baserat på ID
export async function deleteNote (id) {
    const numRemoved = await noteDB.remove({ id: id }, {});
    return numRemoved;
}

// Uppdatera en befintlig anteckning i databasen baserat på ID
export async function updateNote (id, title, text) {
    const existingNote = await noteDB.findOne({ id: id });

    if (!existingNote) {
    throw new Error("Note not found");
    }

    if (existingNote.text === text && existingNote.title === title) {
        throw new Error("text and title is the same");
    }

    const modifiedAt = new Date();
    const updateObj = {
        title: title,
        text: text,
        modifiedAt: modifiedAt
    }
   
    await noteDB.update({ id: id }, { $set: updateObj }, {});
}

// söka efter en anteckning med title
export async function searchNotes(query, username) {
    const regex = new RegExp(query, 'i');
    const notes = await noteDB.find({ title: regex, username: username });
    return notes;
}

//---------------------------------------

//User DB

export async function createUser(user) {
    
    const userExists = await userDB.findOne({ username: user.username })
    if(userExists === null) {
        const hashedPassword = await bcrypt.hash(user.password, 10)
        const uuid = uuidv4()
        await userDB.insert({ username: user.username, password: hashedPassword, id: uuid })
        return {
            sucess: true,
            msg: 'User added!'
        }
    } else {
        return {
            sucess: false,
            msg: 'User already exist'
        }
    }
}

export async function validateUser(username, password) {
    const user = await userDB.findOne({ username: username })
    if(!user) {
        return {
            msg: 'User does not exist'
        }
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if(!passwordMatch) {
        return {
            msg: 'Wrong password'
        }
    }

    return {
        sucess: true,
    } // användarnamn och lösenord matchar
}