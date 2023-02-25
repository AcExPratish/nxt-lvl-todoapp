<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index()
    {
        try {
            $data = Todo::where('delete_flag', false)->get();
            if (count($data) <= 0) {
                return $this->jsonResponse(0, null, 'No data found', null, 200);
            }
            return $this->jsonResponse(1, $data, null, null, 200);
        } catch (\Exception $e) {
            return $this->jsonResponse(0, null, null, $e, 409);
        }
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string',
                'content' => 'required|string'
            ]);
            if (count($validator->errors()) >= 1) {
                return $this->jsonResponse(0, null, $validator->errors(), null, 400);
            }

            $todo = new Todo();
            $todo = $this->storeOrUpdateTodo($request, $todo);
            $todo->created_by = Auth::id();
            $todo->save();
            return $this->jsonResponse(1, null, 'New Task Added', null, 200);
        } catch (\Exception $e) {
            return $this->jsonResponse(0, null, null, $e, 409);
        }
    }

    public function show(Todo $todo)
    {
        try {
            return $this->jsonResponse(1, $todo, null, null, 200);
        } catch (\Exception $e) {
            return $this->jsonResponse(0, null, null, $e, 409);
        }
    }

    public function update(Request $request, Todo $todo)
    {
        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string',
                'content' => 'required|string'
            ]);
            if (count($validator->errors()) >= 1) {
                return $this->jsonResponse(0, null, $validator->errors(), null, 400);
            }

            $todo = $this->storeOrUpdateTodo($request, $todo);
            $todo->updated_by = Auth::id();
            $todo->save();
            return $this->jsonResponse(1, null, 'Task Updated', null, 200);
        } catch (\Exception $e) {
            return $this->jsonResponse(0, null, null, $e, 409);
        }
    }

    public function destroy(Todo $todo)
    {
        try {
            $todo->delete_flag = true;
            $todo->updated_by = Auth::id();
            $todo->save();
            return $this->jsonResponse(1, null, 'Task Removed', null, 200);
        } catch (\Exception $e) {
            return $this->jsonResponse(0, null, null, $e, 409);
        }
    }

    private function storeOrUpdateTodo($request, $todo)
    {
        $todo->title = $request->title;
        $todo->content = $request->content;
        $todo->due_date = $request->due_date;
        $todo->status = $request->status ?? false;
        return $todo;
    }
}
