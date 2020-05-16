const code = {}

const mnemonic = []

function defineOpCodes(def) {

    Object.keys(def).forEach(m => {
        code[m] = def[m]
    })

    Object.keys(code).forEach(m => {
        const c = code[m]
        mnemonic[c] = m
    })
}

function match(opcode) {
    return mnemonic[opcode]
}
