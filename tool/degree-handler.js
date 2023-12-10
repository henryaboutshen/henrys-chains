const fs = require('fs');

const THRESHOLD = 5;

const res = [];
const data = fs.readFileSync('./data/henry-grpc-degree.txt', 'utf8');
const nodes = data.split('\n')

for (let i = 0; i < nodes.length; i++) {
    const tmp = nodes[i].split('\t');
    if (tmp.length == 3) {
        if ((parseInt(tmp[0]) + parseInt(tmp[1])) >= THRESHOLD) {
            res.push(tmp[2]);
        }
    }
}

fs.writeFileSync('./data/henry-grpc-hotspot.txt', res.join('\n'));
