/* eslint-disable import/prefer-default-export */
import * as fs from 'fs';

const groupClassifier = (node) => {
    if (node.indexOf('futunn') > -1) {
        if (node.indexOf('/internal/app/service') > -1) {
            return 2;
        }
        if (node.indexOf('/internal/app/dao') > -1) {
            return 3;
        }
        return 1;
    }
    return 0;
};

const nodesBuilder = (nodes) => {
    const res = [];
    nodes.filter((v) => v !== '').forEach((node) => {
        res.push({
            id: node.replace('\r', ''),
            group: groupClassifier(node),
        });
    });
    return res;
};

const edgesBuilder = (edges) => {
    const res = [];
    edges.filter((v) => v !== '').forEach((edge) => {
        const nodePair = edge.replace('\r', '').split(' ');
        res.push({
            source: nodePair[0],
            target: nodePair[1],
        });
    });
    return res;
};

export async function GET() {
    let res = {};
    let nodes = [];
    let links = [];

    // nodes
    const nodesData = fs.readFileSync('./data/henry-grpc-nodes.txt', { encoding: 'utf8', flag: 'r' });
    nodes = nodesBuilder(nodesData.split('\n'));
    // console.log(nodes);

    // edges
    const edgesData = fs.readFileSync('./data/henry-grpc-edges.txt', { encoding: 'utf8', flag: 'r' });
    links = edgesBuilder(edgesData.split('\n'), nodes);
    // console.log(edges);

    res = { nodes, links };
    return Response.json(res);
}

