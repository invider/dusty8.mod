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
    }
}
