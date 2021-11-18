const EventEmiiter = require('events');
const eventEmitter = new EventEmiiter();

eventEmitter.on('start', (start, end) => {
    console.log(`Start from ${start}h to ${end}h`);
})

eventEmitter.emit('start', 9, 17);