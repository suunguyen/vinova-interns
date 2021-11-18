const fs = require('fs')

try {
    const data = fs.readFileSync('./Input.txt', 'utf8')
    console.log(data)
} catch (err) {
    console.error(err)
}

/*
    r+: open the file for reading and writing
    w+: open the file for reading and writing, positioning the stream at the beginning of the file. The file is created if it does not exist
    a: open the file for writing, positioning the stream at the end of the file. The file is created if it does not exist
    a+: open the file for reading and writing, positioning the stream at the end of the file. The file is created if it does not exist
*/
const content = '\nAdd new content to file';
try {
    fs.writeFileSync('./Input.txt', content, { flag: 'a+' });
} catch (error) {
    console.error(error);
}