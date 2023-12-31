let loadPromise = null

const { Buffer } = require("buffer")
const wasmHeaders = require('./cardano_message_signing')
const wasmBase64Lib = require('./cardano-message-signing-in-base-64.wasm')

function load() {
    if (loadPromise && loadPromise['then']) {
        return loadPromise
    }

    loadPromise = WebAssembly.instantiate(
        Buffer.from(wasmBase64Lib, 'base64'),
        { '__wbindgen_placeholder__': wasmHeaders },
    )
        .then(({ instance }) => wasmHeaders.setWasm(instance.exports))
        .catch(error => { throw error })

    return loadPromise
}

module.exports = {
    load,
    ...wasmHeaders,
}
