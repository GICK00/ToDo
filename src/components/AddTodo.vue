<template>
    <div class="d-inline-grid justify-content-center w-100">
        <h1 class="pt-5 pb-1 fs-3">Список задач</h1>
        <div class="d-inline-grid w-100" style="max-width: 600px;">
            <div class="d-inline-grid align-items-center pt-3 pb-3">
                <label for="name" class="me-3">Название задачи</label>
                <input v-model="taskName" type="text" name="name" class="form-control" />
                <label for="description" class="me-3">Описание задачи</label>
                <textarea v-model="taskDescription" name="description" class="form-control"
                    style="height: 120px;"></textarea>
            </div>
            <button class="btn btn-primary" @click="addTask">
                Добавить задачу
            </button>
        </div>

        <div class="mt-4">
            <div class="pt-5 pb-1 d-inline-flex align-items-center">
                <h1 class="fs-3 me-3">Текущие задачи:</h1>
                <div class="btn-group">
                    <button class="btn btn-outline-primary" :class="{ active: currentFilter === 'all' }"
                        @click="setFilter('all')">
                        Все ({{ totalTasks }})
                    </button>
                    <button class="btn btn-outline-primary" :class="{ active: currentFilter === 'incomplete' }"
                        @click="setFilter('incomplete')">
                        Не выполнено ({{ incompleteTasksCount }})
                    </button>
                    <button class="btn btn-outline-primary" :class="{ active: currentFilter === 'completed' }"
                        @click="setFilter('completed')">
                        Выполнено ({{ completedTasksCount }})
                    </button>
                </div>
            </div>
            <ul class="list-group">
                <li class="list-group-item d-inline-flex justify-content-between align-items-center"
                    v-for="task in tasks" :key="task.id">
                    <label
                        :class="{ 'btn btn-success me-3': task.completed, 'btn btn-outline-success me-3': !task.completed }"
                        :for="'btncheck' + task.id" cheked>
                        {{ task.completed ? 'Выполнено' : 'Не выполнено' }}
                    </label>
                    <input type="checkbox" class="btn-check" :id="'btncheck' + task.id" v-model="task.completed"
                        @click="updateTaskStatus(task.id)" />
                    <strong>{{ task.name }} : {{ task.description }}</strong>
                    <button class="btn btn-danger ms-3" @click="removeTask(task.id)">Удалить</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useTasksStore } from '@/store/index.js';

export default {
    setup() {
        const taskName = ref('');
        const taskDescription = ref('');
        const tasksStore = useTasksStore();
        const currentFilter = ref('all');

        const maxDescriptionLength = 100;

        const addTask = () => {
            if (taskName.value && taskDescription.value) {
                if (taskDescription.value.length <= maxDescriptionLength) {
                    tasksStore.addTask({
                        name: taskName.value,
                        description: taskDescription.value,
                        completed: false,
                    });
                    taskName.value = '';
                    taskDescription.value = '';
                } else {
                    alert('Описание задачи не должно превышать ' + maxDescriptionLength + ' символов');
                }
            } else {
                alert('Пожалуйста, заполните оба поля');
            }
        };

        const updateTaskStatus = (id) => {
            tasksStore.updateTaskStatus(id);
        };

        const removeTask = (id) => {
            tasksStore.removeTask(id);
        };

        const setFilter = (filter) => {
            currentFilter.value = filter;
        };

        const tasks = computed(() => {
            const tasks = tasksStore.tasks.value;
            if (currentFilter.value === 'completed') {
                return tasks.filter(task => task.completed);
            } else if (currentFilter.value === 'incomplete') {
                return tasks.filter(task => !task.completed);
            }
            return tasks;
        });

        const completedTasksCount = computed(() => {
            return tasksStore.tasks.value.filter(task => task.completed).length;
        });

        const incompleteTasksCount = computed(() => {
            return tasksStore.tasks.value.filter(task => !task.completed).length;
        });

        const totalTasks = computed(() => {
            return tasksStore.tasks.value.length;
        });

        onMounted(() => {
            tasksStore.loadTasks();
        });

        return {
            taskName,
            taskDescription,
            addTask,
            tasks,
            removeTask,
            updateTaskStatus,
            currentFilter,
            setFilter,
            completedTasksCount,
            incompleteTasksCount,
            totalTasks,
        };
    },
};
</script>