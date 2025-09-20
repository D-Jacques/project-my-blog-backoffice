// Initializating our server with library http (To the web !!!) and with our express app
const http = require('http');
const app = require('./app');

// On port assignation, we normalize port (we want a integer >= 0 as port for our app)
const normalizePort  = val => {
    const port = parseInt(val, 10);

    if (isNaN(port) ) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
const port = normalizePort(process.env.PORT || 3001);
// We can set values in our express app.
app.set('port', port);

// Error handler to get the error Message and a understandable message in case of access or port issues 
const errorHandler = error => {
    if ( error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe: ' + address : 'port: ' + port;

    switch(error.code) {
        case 'EACCESS' : 
            console.error(bind + ' requires elevated privilegies.');
            process.exit(1);
            break;
        case 'EADDRINUSE' : 
            console.error(bind + ' already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
} 

// Your app very soon in your browser
const server = http.createServer(app);

// Event on error on serveur start
server.on('error', errorHandler);
// Event on listening port, getting serveur address (On localhost normally when you're local)
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe: ' + address : 'port: ' + port;
    console.log('Listening on ' + bind);
})

// We ask to our server to link to our port so we want to access it 
server.listen(port);
