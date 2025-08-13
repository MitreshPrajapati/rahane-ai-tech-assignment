const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const { connectDB } = require('./config/db');
const { authRouter } = require('./routes/auth.route');
const { userRouter } = require('./routes/user.route');
const { postRouter } = require('./routes/post.route');
const { commentRouter } = require('./routes/comment.route');
dotenv.config();

const app = express();

// middlewares 
// app.use(express.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', userRouter);
// app.use('/post', postRouter);
// app.use('/comment', commentRouter);

// app.get('/test', async(req, res) => {
//    res.send("test")
// });



const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
    try {
        connectDB();
        console.log(`server running on port:${PORT}`)
    } catch (error) {
        console.log('Server connection failed.')
        console.log(error);
    }
})