import dns from 'dns';

export default async function hasMXRecords(domain) {
    try {
        const records = await dns.promises.resolveMx(domain);
        return records.length > 0;
    } catch (err) {
        return false;
    }
}
