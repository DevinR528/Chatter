const expect = require('chai').expect;

const { Users } = require('./users');

describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Joe',
            room: 'Node course'
        }, {
            id: '2',
            name: 'James',
            room: 'Node course'
        }, {
            id: '3',
            name: 'Austin',
            room: 'Poop course'
        }];
    });

    it('should add a new user to Users array', () => {
        var users = new Users();
        var userMe = {
            id: '123',
            name: 'Devin',
            room: 'My room'
        };

        var testUser = users.addUser(userMe.id, userMe.name, userMe.room);

        expect(users.users).to.deep.equal([userMe]);
    });


    it('should return names for node course', () => {
        var userList = users.getUserList('Node course');

        expect(userList).to.deep.equal(['Joe', 'James']);
    });

    it('should return names for poop course', () => {
        var userList = users.getUserList('Poop course');

        expect(userList).to.deep.equal(['Austin']);
    });


    it('should return user from users [] by id', () => {
        var user = users.getUser('1');

        expect(user[0].id).to.equal('1', `user: ${user[0]}`);
    });

    it('should return deleted user from users [] by id', () => {
        var user = users.removeUser('1');

        expect(user[0].id).to.equal('1', `${user[0]}`);
        expect(users.users.length).to.equal(2);
    });

    it('should not return deleted user from users [] by id', () => {
        var user = users.removeUser('99');

        expect(user.id).to.be.equal(undefined);
    });

});