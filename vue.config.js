module.exports = {
    "devServer": {
        "port": 8080,
        "proxy": {
            "^/api": {
                "target":"http://localhost:3000/",
                "changeOrigin": true
            }
        }
    }
}// "http://127.0.0.1:3000"