import { ref } from 'vue';

export const useTasksStore = () => {
    const tasks = ref([]);

    const addTask = (task) => {
        tasks.value.push(task);
    };

    const removeTask = (index) => {
        tasks.value.splice(index, 1);
    };

    const updateTaskStatus = (index) => {
        const task = tasks.value[index];
        task.completed = !task.completed;
    };

    const loadTasks = () => {
        tasks.value = JSON.parse(localStorage.getItem('tasks')) || [];
    };

    return {
        tasks,
        addTask,
        removeTask,
        updateTaskStatus,
        loadTasks,
    };
};
