import { defineStore } from 'pinia';

export const useTasksStore = defineStore('tasks', {
    state: () => ({
        tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    }),
    actions: {
        addTask(task) {
            this.tasks.push(task);
            this.saveTasks();
        },
        removeTask(index) {
            this.tasks.splice(index, 1);
            this.saveTasks();
        },
        updateTaskStatus(index) {
            this.tasks[index].completed = !this.tasks[index].completed;
            this.saveTasks();
        },
        loadTasks() {
            const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
            this.tasks = savedTasks;
        },
        saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        },
    },
    persist: true,
});
