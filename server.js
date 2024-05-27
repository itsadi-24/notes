const express = require('express');
const app = express();
const path = require('path');
const { logger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cookieParser = require('cookie-parser');
const PORT = 3000 || process.env.PORT;

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use('/', express.static(path.join(__dirname, 'public')));
//it tells express where to find static files like CSS or images
app.use('/', require('./routes/root'));

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 not found' });
  } else {
    res.type('txt').send('404 not found');
  }
});
app.use(errorHandler);
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
