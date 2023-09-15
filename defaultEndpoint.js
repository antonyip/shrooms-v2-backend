async function _defaultEndpoint (req, res) {
    res.send("Hello World!");
}

exports.defaultEndpoint = _defaultEndpoint;
