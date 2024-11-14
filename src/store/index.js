import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: [],
    }),
    actions: {
        addTask(task) {
            this.tasks.push(task);
        },
    },
});
