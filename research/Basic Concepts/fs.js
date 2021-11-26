/*
    fs.access(): check if the file exists and Node.js can access it with its permissions
    fs.appendFile(): append data to a file. If the file does not exist, it's created
    fs.chmod(): change the permissions of a file specified by the filename passed. Related: fs.lchmod(), fs.fchmod()
    fs.chown(): change the owner and group of a file specified by the filename passed. Related: fs.fchown(), fs.lchown()
    fs.close(): close a file descriptor
    fs.copyFile(): copies a file
    fs.createReadStream(): create a readable file stream
    fs.createWriteStream(): create a writable file stream
    fs.link(): create a new hard link to a file
    fs.mkdir(): create a new folder
    fs.mkdtemp(): create a temporary directory
    fs.open(): set the file mode
    fs.readdir(): read the contents of a directory
    fs.readFile(): read the content of a file. Related: fs.read()
    fs.readlink(): read the value of a symbolic link
    fs.realpath(): resolve relative file path pointers (., ..) to the full path
    fs.rename(): rename a file or folder
    fs.rmdir(): remove a folder
    fs.stat(): returns the status of the file identified by the filename passed. Related: fs.fstat(), fs.lstat()
    fs.symlink(): create a new symbolic link to a file
    fs.truncate(): truncate to the specified length the file identified by the filename passed. Related: fs.ftruncate()
    fs.unlink(): remove a file or a symbolic link
    fs.unwatchFile(): stop watching for changes on a file
    fs.utimes(): change the timestamp of the file identified by the filename passed. Related: fs.futimes()
    fs.watchFile(): start watching for changes on a file. Related: fs.watch()
    fs.writeFile(): write data to a file. Related: fs.write()
*/
const fs = require('fs');
fs.open('./Input.txt', 'r', (err, fd) => {
    // fd: file description
})

try {
    const fd = fs.openSync('./Input.txt', 'r')
    console.log(fd);
} catch (err) {
    console.error(err)
}

fs.stat('./Input.txt', function (err, stats) {
    console.log(stats)
    if (err) {
        console.error(error);
        return;
    }
})