import { ref } from 'vue';

export const useTasksStore = () => {
    const tasks = ref([]);
    let nextId = ref(1);

    const addTask = (task) => {
        task.id = nextId.value;
        tasks.value.push(task);
        nextId.value += 1;
        saveTasks();
    };

    const removeTask = (id) => {
        tasks.value = tasks.value.filter(task => task.id !== id);
        saveTasks();
    };

    const updateTaskStatus = (id) => {
        const task = tasks.value.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            saveTasks();
        }
    };

    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.value = savedTasks;
        if (tasks.value.length > 0) {
            nextId.value = Math.max(...tasks.value.map(task => task.id)) + 1;
        }
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
