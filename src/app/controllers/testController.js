/**
 * TestController
 * 
 * 
 * 
*  */

const {logger} = require('../security/logger.js');

async function index(req, res) {

    try {
        // const username = 'romaaraujo.';
        // const user = await User.findOne({ where: { username: username } });

        // if (user && user.username) {
        //     return res.status(500).json({ error: 'Username already registered' });
        // }

        // const user2 = await User.create({
        //     username: 'romaaraujo6',
        //     email: 'romarioaraujocarlos@gmail.com',
        //     password: '123'
        // }).catch(e => {
        //     res.status(500).json({error: e.toString()})
        // });
        // user2.save();

        // const user = await User.findOne({ where: { email: 'romarioaraujocarlos@gmail.com' } }).then(async function (user) {
        //     if (!user) {
        //         res.status(404).json({ error: 'Username not found' });
        //     } else if (!await user.validPassword('123')) {
        //         res.status(401).json({ error: 'Incorrect password' });
        //     } else {
        //         res.status(200).json({ success: 'Valid cred' });
        //     }
        // });

        return res.send(
            // await User.findAll()
        );

    } catch (error) {
        logger.error(error.toString());
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    index
}