<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskController extends Controller
{
    // Listar todas las tareas
    public function index()
    {
        return response()->json(Task::latest()->get());
    }

    // Crear una tarea
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => [
                'required',
                'string',
                'max:255',
                function ($attribute, $value, $fail) {
                    if (trim($value) === '') {
                        $fail('El título no puede estar vacío.');
                    }
                },
            ],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'El título no es válido.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $task = Task::create([
            'title' => trim($request->title),
            'completed' => false,
        ]);

        return response()->json($task, 201);
    }

    // Completar o descompletar tarea
    public function update(Request $request, Task $task)
    {
        $data = $request->validate([
            'completed' => ['required', 'boolean'],
        ]);

        $task->update($data);

        return response()->json($task);
    }

    // Eliminar tarea
    public function destroy(Task $task)
    {
        $task->delete();

        return response()->noContent();
    }
}