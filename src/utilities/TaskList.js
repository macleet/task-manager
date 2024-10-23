export class TaskNode {
    constructor(task_id, description, due_date, priority, folder_id) {
        this.task_id = task_id;
        this.description = description;
        this.due_date = due_date;
        this.priority = priority;
        this.folder_id = folder_id;

        this.prev = null;
        this.next = null;
    }

    prioritize(head) {
        if (!head || !this.prev || !this.next) {
            return;
        }

        this.prev.next = this.next;
        this.next.prev = this.prev;
        this.next = head;
        head.prev = this;
        this.prev = null;
        head = this;
    }

    unprioritize(tail) {

    }
}

export class TaskList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    add(task_id, description, due_date, priority, folder_id) {
        const newTask = new TaskNode(task_id, description, due_date, priority, folder_id);

        if (!this.head && !this.tail) {
            this.head = newTask;
            this.tail = newTask;
            return;
        }
        this.tail.next = newTask;
        newTask.prev = this.tail;
        this.tail = newTask;
    }

    isEmpty() {
        return !this.head && !this.tail;
    }

    // *[Symbol.iterator]() {
    //     let current = this.head;
    //     while (current !== null) {
    //         yield current.folder_id;
    //         current = current.next;
    //     }
    // }

    // map() {
    //     let current = this.head;
    //     while (current) {
    //         console.log(current.description);
    //         current = current.next;
    //     }
    // }

    map(callback) {
        if (!this.head && !this.tail) {
            return new TaskList();
        }

        const newList = new TaskList();
        let current = this.head;
    
        while (current) {
            newList.add(callback(current));
            current = current.next;
        }

        return newList;
    }
}
