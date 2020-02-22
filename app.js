const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


let nextPostId = 4;
let posts = [
    {id: 1, name: 'Me'},
    {id: 2, name: 'You'},
    {id: 3, name: 'Us'}
];

app.get('/api/posts', (req, res) => {  
    res.send(posts);
    console.log(posts);
});



app.post('/api/posts', (req, res) => {
    const body = req.body;
    if (body.id === 0) {
        posts = [...posts, {...body, id: nextPostId++}];
        res.send(posts);
        return;
    } else {
        posts = posts.map(i => i.id === body.id ? {...i, name: body.name} : i);
        res.send(posts);
        return;
    }
});

app.delete('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    posts = posts.filter(i => i.id !== id);
    res.send(posts);
    console.log(posts);
});


app.listen(process.env.PORT || 4000);