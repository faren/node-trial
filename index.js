const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const users = [
    {id:1, name:'user 1'},
    {id:2, name:'user 2'},
    {id:3, name:'user 3'}
];

app.get('/', (req, res)=>{
    res.send('Hello Faren!!');
});

app.get('/api/users', (req, res)=>{
    res.send(users);
});

app.post('/api/users', (req, res)=>{
    const { error } = validateUser(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    const user = {
        id: users.length + 1,
        name: req.body.name
    };

    users.push(user);
    res.send(user);
});


app.put('/api/users/:id', (req, res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id))
    if (!user) res.status(404).send('Not Found');

    const { error } = validateUser(req.body);
    if (error){
        res.status(400).send(error.details[0].message);
        return;
    }

    user.name = req.body.name;
    res.send(user);
});

app.delete('/api/users/:id', (req, res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id))
    if (!user) res.status(404).send('Not Found');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(user);
});

function validateUser(user){
    const schema = {
        name: Joi.string().min(3).required()
    };

    return Joi.validate(user, schema);
    
}

app.get('/api/users/:id', (req, res)=>{
    const user = users.find(c => c.id === parseInt(req.params.id))

    if (!user) res.status(404).send('Not Found');
    res.send(user);


});

const port = process.env.PORT || 3000;
app.listen(3000, ()=> console.log(`Listening on port ${port}...`));