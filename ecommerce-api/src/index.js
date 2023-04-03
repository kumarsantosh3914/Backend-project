const express = require('express');
//rest of the packages
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const rateLimiter = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// database and port
const connect = require('./config/database');
const { PORT } = require('./config/server-Config');

// routers
const apiRoutes = require('./routes/index');

// middleware
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const app = express();

app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 60,
    })
);
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use('api', apiRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connect();
    console.log(`mongo db connected`);
})
