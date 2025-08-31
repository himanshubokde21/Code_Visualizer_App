// Sample user API
function getUser(id) {
    // In a real app, you'd fetch this from a database
    const users = {
        1: { name: 'John Doe', email: 'john.doe@example.com' },
        2: { name: 'Jane Smith', email: 'jane.smith@example.com' },
    };
    return users[id] || { error: 'User not found' };
}

function saveUser(user) {
    // In a real app, you'd save this to a databasers
    console.log('Saving user:', user);
    return { success: true, userId: Date.now() };
}