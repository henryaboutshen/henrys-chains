import { Box, CssBaseline } from '@mui/material';
import RepoGraph from '../components/repo-graph';

async function getData(api) {
    const res = await fetch(`http://localhost:3000/api/${api}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function Index() {
    const data = await getData('repo');

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main">
                <RepoGraph data={data}/>
            </Box>
        </Box>
    );
}