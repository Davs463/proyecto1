<script setup>
import { ref, onMounted } from 'vue';
import texts from '../locales/es.json';

const t = texts.tasks;

const tasks = ref([]);
const title = ref('');
const error = ref('');
const loading = ref(false);
const saving = ref(false);

// El título también viene de es.json
document.title = t.heading;

// Cargar las tareas desde Laravel
async function loadTasks() {
  loading.value = true;
  error.value = '';

  try {
    const response = await fetch('/api/tasks', {
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) throw new Error();

    tasks.value = await response.json();
  } catch {
    error.value = t.loadError;
  } finally {
    loading.value = false;
  }
}

// Crear una tarea
async function addTask() {
  const cleanTitle = title.value.trim();

  if (!cleanTitle) {
    error.value = t.required;
    return;
  }

  if (cleanTitle.length > 255) {
    error.value = t.tooLong;
    return;
  }

  if (saving.value) return;

  saving.value = true;
  error.value = '';

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        title: cleanTitle
      })
    });

    if (!response.ok) throw new Error();

    title.value = '';
    await loadTasks();
  } catch {
    error.value = t.saveError;
  } finally {
    saving.value = false;
  }
}

// Completar o descompletar una tarea
async function toggleTask(task) {
  error.value = '';

  try {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        completed: !task.completed
      })
    });

    if (!response.ok) throw new Error();

    await loadTasks();
  } catch {
    error.value = t.updateError;
  }
}

// Eliminar una tarea con confirmación
async function deleteTask(task) {
  if (!window.confirm(t.confirmDelete)) return;

  error.value = '';

  try {
    const response = await fetch(`/api/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json'
      }
    });

    if (!response.ok) throw new Error();

    await loadTasks();
  } catch {
    error.value = t.deleteError;
  }
}

onMounted(loadTasks);
</script>

<template>
  <main class="container">
    <h1>{{ t.heading }}</h1>
    <p class="subtitle">{{ t.subtitle }}</p>

    <form class="formulario" @submit.prevent="addTask">
      <input
        v-model="title"
        type="text"
        maxlength="255"
        :placeholder="t.placeholder"
      />

      <button type="submit" :disabled="saving">
        {{ saving ? t.saving : t.add }}
      </button>
    </form>

    <p v-if="error" class="error" role="alert">
      {{ error }}
    </p>

    <p v-if="loading">{{ t.loading }}</p>

    <p v-else-if="tasks.length === 0" class="empty">
      {{ t.empty }}
    </p>

    <ul v-else class="task-list">
      <li v-for="task in tasks" :key="task.id">
        <label class="task-info">
          <input
            type="checkbox"
            :checked="task.completed"
            @change="toggleTask(task)"
          />

          <span :class="{ completed: task.completed }">
            {{ task.title }}
          </span>
        </label>

        <span class="status">
          {{ task.completed ? t.completed : t.pending }}
        </span>

        <button
          type="button"
          class="delete-button"
          @click="deleteTask(task)"
        >
          {{ t.delete }}
        </button>
      </li>
    </ul>
  </main>
</template>

<style scoped>
.container {
  max-width: 760px;
  margin: 60px auto;
  padding: 25px;
  font-family: Arial, sans-serif;
}

h1 {
  font-size: 32px;
  color: #2563eb;
  margin-bottom: 8px;
}

.subtitle {
  color: #64748b;
  margin-bottom: 25px;
}

.formulario {
  display: flex;
  gap: 10px;
  margin-bottom: 25px;
}

.formulario input {
  flex: 1;
  min-width: 0;
  padding: 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
}

button {
  padding: 12px 16px;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  margin-bottom: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
}

.task-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
  overflow-wrap: anywhere;
}

.completed {
  text-decoration: line-through;
  color: #94a3b8;
}

.status {
  color: #64748b;
  font-size: 12px;
}

.delete-button {
  background: #dc2626;
}

.error {
  color: #b91c1c;
  margin-bottom: 15px;
}

.empty {
  color: #64748b;
}

@media (max-width: 600px) {
  .container {
    margin: 20px auto;
  }

  .formulario {
    flex-direction: column;
  }

  .task-list li {
    flex-wrap: wrap;
  }
}
</style>