import express from 'express';

const admin = express();
admin.on('mount', (parent) => {
    console.log('Admin mounted');
    console.log(parent)
})

admin.get('/dashboard', (_req, res) => {
    admin.locals.title = "Dashboard"
    res.sendFile('/views/dashboard.html');
})
admin.get('/', (_req, res) => {
    res.redirect('/dashboard')
})


admin.get('/stats', (_req, res) => {
    res.send('Admin Statistics: \n')
})

admin.all('/data', (_req, res) => {
    res.send('Not allowed to view read-only data\n');
})
export default admin;