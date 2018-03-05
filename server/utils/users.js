const _ = require('lodash');

/**
 * @class{Users} creates user to hold data for room socket
 * @constructs User object to hold:
 * 
 * @param {String} id holds a Uid 
 * @param {String} name holds users name
 * @param {String} room holds name of socket 'room'
 * 
 */



class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = { id, name, room };
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        //return user that was removed
        var user = this.getUser(id);

        if (user) {
            this.users = this.users.filter((user) => {
                return user.id !== id;
            });
            return user;
        }
    }
    getUser(id) {
        var singleUser = this.users.filter((user) => {
            return user.id === id;
        });
        return singleUser;
    }
    getUserList(room) {
        var usersArr = this.users.filter((user) => {
            return user.room === room;
        });
        var namesArr = usersArr.map((user) => {
            return user.name;
        });

        return namesArr;
    }
}


module.exports = { Users };