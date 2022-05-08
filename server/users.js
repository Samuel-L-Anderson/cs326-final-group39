import { GameDatabase } from './game-db.js';

class Users {
  constructor() {
    // we use an in-memory "database"; this isn't persistent but is easy
    // default user
    // this.users = { emery: 'compsci326' };
    this.dburl ="mongodb+srv://tpatra:tarun@cluster0.69p7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
    this.initDb();

  }

  async initDb() {
    this.db = new GameDatabase(this.dburl);
    await this.db.connect();
  }
  // Returns true iff the user exists.
  async findUser(id) {
    let user = await this.db.readEntry(id);
    if (JSON.stringify(user) === '[]') {
      return false;
    } else {
      return true;
    }
  }

  // Returns true iff the password is the one we have stored (in plaintext = bad
  // but easy).
  async validatePassword(id,pwd) {
    let users = await this.findUser(id); 
    if (!users) {
      return false;
    }
    users = await this.db.readEntry(id);
    let user = users[0];
    if (user['spire_id'] !== id['spire_id'] && user['password'] !== pwd['password']) {
      return false;
    }
    return true;
  }

  // Add a user to the "database".
  async addUser(name, pwd) {
    let user =  await this.findUser({'spire_id':name});
    if (user) {
      return false;
    }
    let res = await this.db.createEntry({'spire_id':name,'password':pwd});
    return true;
  }
}

export default new Users();
