export default function isEmpty(obj) {
    return (
        obj === undefined ||
        obj === null ||
        (typeof obj === 'object' && Object.keys(obj).length === 0) ||
        (typeof obj === 'string' && obj.trim().length === 0)
    );
}