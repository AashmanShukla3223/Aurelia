import { getVaultData } from './security';

const GITHUB_TOKEN_KEY = 'AURELIA_GITHUB_PAT';
const GITHUB_REPO_KEY = 'AURELIA_GITHUB_REPO';

// Note: In a complete, production-ready app, the token and repo owner/name
// would be stored securely and configurable by the user via a Settings screen.

export const syncToGitHub = async (token: string, owner: string, repo: string) => {
    try {
        const data = await getVaultData();
        const content = Buffer.from(JSON.stringify(data)).toString('base64');
        const path = 'aurelia-vault.json';

        // 1. Get current file SHA if it exists (required by GitHub for updates)
        let sha;
        try {
            const getResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
                headers: {
                    Authorization: `token ${token}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });
            if (getResponse.ok) {
                const fileData = await getResponse.json();
                sha = fileData.sha;
            }
        } catch (e) {
            console.log('File does not exist yet', e);
        }

        // 2. Put file
        const putResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
            method: 'PUT',
            headers: {
                Authorization: `token ${token}`,
                Accept: 'application/vnd.github.v3+json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: 'Aurelia Auto-Sync: Encrypted Vault Update',
                content,
                sha,
            }),
        });

        if (!putResponse.ok) {
            throw new Error(`Failed to sync: ${putResponse.statusText}`);
        }

        return true;
    } catch (error) {
        console.error('GitHub Sync Error:', error);
        return false;
    }
};
