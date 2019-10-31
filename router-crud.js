module.exports = app => {
    const express = require('express')
    const router = express.Router({
        // mergeParams: true
    })

    // Debug Hook
    router.use((req, res, next) => {
        console.log(new Date().toISOString(), req.method, req.originalUrl)
        next()
    })

    // List
    router.get('/', async (req, res) => {
        const items = await req.Model.find().limit(100)
        res.send(items)
    })

    // CRUD

    // Create
    router.post('/', async (req, res, next) => {
        try {
            const model = await req.Model.create(req.body)
            res.send(model)
        } catch (err) {
            return next({ status: 400, message: err.message });
        }
    })

    // Read
    router.get('/:id', async (req, res, next) => {
        const model = await req.Model.findById(req.params.id)
        if (!model)
            return next({ status: 404, message: 'Record Not Found' });
        res.send(model)
    })

    // Update
    router.put('/:id', async (req, res, next) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        if (!model)
            return next({ status: 404, message: 'Record not found' });
        res.send(model)
    })

    // Delete
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })

    app.use('/v1/:resource', require('./resource')(), router)

    // error handling
    // must be at the end of the application stack
    app.use(async (err, req, res, next) => {
        res.status(err.status || 500).send({
            message: err.message
        })
    })
}