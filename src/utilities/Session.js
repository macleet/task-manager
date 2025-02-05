class SessionNode {
    constructor(sessionType, sessionDuration) {
        this.type = sessionType;
        this.duration = sessionDuration;
        this.next = null;
        this.prev = null;
    }
}

class SessionCircularList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    append(sessionNode) {
        const newNode = new SessionNode(sessionNode.type, sessionNode.duration);
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
            newNode.next = this.head;
            newNode.prev = this.head;
            return;
        }

        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
        this.tail.next = this.head;
        this.tail.next.prev = this.tail;
    }
}

export { SessionNode, SessionCircularList};