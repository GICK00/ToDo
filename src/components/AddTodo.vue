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
            <h1 class="pt-5 pb-1 fs-3">Текущие задачи:</h1>
            <ul class="list-group">
                <li class="list-group-item" v-for="(task, index) in tasks" :key="index">
                    <label class="btn btn-outline-success me-3" :for="'btncheck' + index">
                        {{ task.completed ? 'Выполнено' : 'Не выполнено' }}
                    </label>
                    <input type="checkbox" class="btn-check" :id="'btncheck' + index" v-model="task.completed"
                        @click="updateTaskStatus(index)" />
                    <strong>{{ task.name }}</strong>: {{ task.description }}
                    <button class="btn btn-danger ms-3" @click="removeTask(index)">Удалить</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useTasksStore } from '@/store/index.js';

export default {
    setup() {
        const taskName = ref('');
        const taskDescription = ref('');
        const tasksStore = useTasksStore();

        const addTask = () => {
            if (taskName.value && taskDescription.value) {
                tasksStore.addTask({
                    name: taskName.value,
                    description: taskDescription.value,
                    completed: false,
                });
                taskName.value = '';
                taskDescription.value = '';
            } else {
                alert('Пожалуйста, заполните оба поля');
            }
        };

        const updateTaskStatus = (index) => {
            tasksStore.updateTaskStatus(index);
        };

        const removeTask = (index) => {
            tasksStore.removeTask(index);
        };

        onMounted(() => {
            tasksStore.loadTasks();
        });

        return {
            taskName,
            taskDescription,
            addTask,
            tasks: tasksStore.tasks,
            removeTask,
            updateTaskStatus,
        };
    },
};
</script>