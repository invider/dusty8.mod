class Capsule {
    constructor() {
        this.segment = []
        this.map = {}
    }

    addSegment(segment) {
        segment.id = this.segment.length
        this.segment.push(segment)
        if (segment.name) {
            this.map[segment.name] = segment
        }
        return segment
    }

    segmentAt(id) {
        return this.segment[id]
    }

    getSegment(name) {
        return this.map[name]
    }

    store(s, i, v) {
        this.segment[s].mem[i] = v
    }
}
