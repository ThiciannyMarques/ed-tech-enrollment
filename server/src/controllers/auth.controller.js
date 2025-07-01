const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../config/knex');

module.exports = {
    async login(req, res) {
        const { username, password } = req.body;

        const user = await knex('users').where({ username }).first();
        if (!user) {
        return res.status(400).send({ error: 'Invalid username or password' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
        return res.status(400).send({ error: 'Invalid username or password' });
        }

        const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.send({ token, user: { role: user.role } });
    },

    async register(req, res) {
    const { username, email, password, role = 'user' } = req.body;

    try {
        const userExists = await knex('users').where({ username }).first();
        if (userExists) {
        return res.status(400).send({ error: 'Username already exists' });
        }

        const emailExists = await knex('users').where({ email }).first();
        if (emailExists) {
        return res.status(400).send({ error: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const [userId] = await knex('users')
        .insert({
            username,
            email,
            password: hashedPassword,
            role
        })
        .returning('id');

        const id = typeof userId === 'object' ? userId.id : userId;

        const token = jwt.sign(
        { id, username, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(201).send({ token });

    } catch (error) {
        res.status(500).send({ 
        error: 'Registration failed',
        details: error.message
        });
    }
    },

    async devResetPassword(req, res) {
    const { username, newPassword } = req.body;

    try {
        const user = await knex('users').where({ username }).first();
        if (!user) {
        return res.status(404).send({ error: 'Usuário não encontrado' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        await knex('users')
        .where({ id: user.id })
        .update({ password: hashedPassword });

        res.send({ message: 'Senha redefinida com sucesso (modo dev)' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao redefinir senha' });
    }
    }
};