import { ref } from 'vue';

export const useTasksStore = () => {
    const tasks = ref([]);

    const addTask = (task) => {
        tasks.value.push(task);
        saveTasks();
    };

    const removeTask = (index) => {
        tasks.value.splice(index, 1);
        saveTasks();
    };

    const updateTaskStatus = (index) => {
        const task = tasks.value[index];
        task.completed = !task.completed;
        saveTasks();
    };

    const loadTasks = () => {
        tasks.value = JSON.parse(localStorage.getItem('tasks')) || [];
    };

    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks.value));
    };

    return {
        tasks,
        addTask,
        removeTask,
        updateTaskStatus,
        loadTasks,
    };
};
