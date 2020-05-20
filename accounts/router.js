const express = require('express');

//database access using knex
//connection to the database
const db = require('../data/dbConfig');

const router = express.Router();

// /api/accounts
router.get('/', (req, res) => {
	//get the data from the db
	//select * from posts
	db.select()
		.from('accounts')
		.then((accounts) => {
			res.json(accounts);
		})
		.catch((err) => {
			res.status(500).json({ message: 'error retrieving accounts', err });
		});
});

router.get('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.first()
		.then((accounts) => {
			if (accounts) {
				res.status(200).json({ data: accounts });
			} else {
				res.status(400).json({ message: 'Accounts not found' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Sorry, ran into an error' });
		});
});

router.post('/', (req, res) => {
	//insert data
	const postAccount = req.body;

	db('accounts')
		.insert(postAccount)
		.then((accounts) => {
			res.status(201).json(accounts);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Failed to create new account', err });
		});
});

router.put('/:id', (req, res) => {
	//modify
	const { id } = req.params;
	const changes = req.body;

	db('accounts')
		.where({ id })
		.update(changes)
		.then((count) => {
			if (count) {
				res.json({ updated: count });
			} else {
				res.status(404).json({ message: 'Invalid ID' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error updating', err });
		});
});

router.delete('/:id', (req, res) => {
	db('accounts')
		.where({ id: req.params.id })
		.del()
		.then((count) => {
			if (count > 0) {
				res.status(200).json({ message: 'Account deleted successfully' });
			} else {
				res.status(404).json({ message: 'Account not found' });
			}
		})
		.catch((err) => {
			res.status(500).json({ message: 'Sorry ran into an error' });
		});
});

module.exports = router;
