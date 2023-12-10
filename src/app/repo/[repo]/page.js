import { Box, CssBaseline } from '@mui/material';
import RepoGraph from '../../components/repo-graph';

async function getData(repo) {
    const res = await fetch(`http://localhost:3000/api/repo?repo=${repo}`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function Repo({ params }) {
    const data = await getData(params.repo);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Box component="main">
                <RepoGraph data={data}/>
            </Box>
        </Box>
    );
}