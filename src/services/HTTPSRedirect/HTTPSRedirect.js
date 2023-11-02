export function HTTPSRedirect(app) {
    if (process.env.NODE_ENV === 'production') {
        console.log(`all http requests will be converted to https !`);

        app.use((req, res, next) => {
            if (req.header('x-forwarded-proto') !== 'https')
                res.redirect(`https://${req.header('host')}${req.url}`)
            else
                next()
        })
    }
}