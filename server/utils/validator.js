const _ = require('lodash');

/**
 * Validation for Chatter
 * @method isRealString
 * @param {string} str the string to validate
 */

var isRealString = (str) => {
    return (typeof str === 'string' && str.trim().length > 0);

};

/**
 * @method isUniqString
 * @param {array} arr the array to iterate through
 * @param {string} str the comparison string
 * @returns {boolean} if str value is unique returns true otherwise false
 */
var isUniqString = (arr, str) => {
    return (!_.includes(arr, str));
};

var setUrl = (number, room) => {
    var name = number.slice(5);
    var roomStr = room.replace(' ', '+');

    return `?name=${name}&room=${roomStr}`;
};

module.exports = { isRealString, setUrl, isUniqString };