'use client';

import * as React from 'react';
import { ForceGraph3D } from 'react-force-graph';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

export default function RepoGraph(props) {
    const fgRef = React.useRef();

    const handleClick = React.useCallback((node) => {
        const distance = 40;
        const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

        fgRef.current.cameraPosition(
            { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
            node,
            3000,
        );
    }, [fgRef]);

    const handleRightClick = () => {
        window.location.href = '/service'
    };

    React.useEffect(() => {
        const bloomPass = new UnrealBloomPass();
        bloomPass.strength = 0.2;
        bloomPass.radius = 1;
        bloomPass.threshold = 0;
        fgRef.current.postProcessingComposer().addPass(bloomPass);
    }, []);

    return (
        <ForceGraph3D
            ref={fgRef}
            graphData={props.data}
            backgroundColor="#000003"
            nodeLabel="id"
            nodeAutoColorBy="group"
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            linkCurvature={0.25}
            onNodeClick={handleClick}
            onNodeRightClick={handleRightClick}
        />
    );
}