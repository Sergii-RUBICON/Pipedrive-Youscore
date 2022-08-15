function setupExpress(express) {
    express.response._render = express.response.render
    express.response.render = function(view, options) {
        const config = {
            name: this.req.user?.username
        }

        this._render(view, { ...config, ...options })
    }
}

module.exports = setupExpress