/**
 * Weapons object
 * All values mandatory
 *  name: String the name of the weapon
 *  spread: Int Used for shotguns and the like, allows a weapon to hit objects near where it is fired
 *  reloadTime: Used to offset the power of high spread weapons, cool down time between shots
 *  audio1: Audio track DOM id
 *  audio2: Audio track DOM id, necessary for audio to work as expected when user "rapid fires"
 *
 * @type {Object}
 */
var weapons = {
    rifle : {
        name: 'rifle',
        spread: 25,
        reloadTime: 500,
        audio1: '#gunSound',
        audio2: '#gunSound2'
    },
    shotgun : {
        name: 'shotgun',
        spread: 75,
        reloadTime: 1000,
        audio1: '#gunSound',
        audio2: '#gunSound2'
    },
    cannon: {
        name: 'cannon',
        spread: 200,
        reloadTime: 3000,
        audio1: '#gunSound',
        audio2: '#gunSound2'
    }
};