<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|email',
                'password' => 'required'
            ]);
            if (count($validator->errors()) >= 1) {
                return $this->jsonResponse(0, null, $validator->errors(), null, 400);
            }

            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                $data = collect($user)->merge(['token' => $user->createToken(env('SECRET_KEY'))->accessToken]);
                return $this->jsonResponse(1, $data, 'Login Successful', null, 200);
            } else {
                return $this->jsonResponse(0, null, 'Invalid Credentials', null, 401);
            }
        } catch (\Exception $e) {
            return $this->jsonResponse(0, null, null, $e, 409);
        }
    }

    public function register(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'full_name' => 'required',
                'username' => 'required|unique:users,email',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|confirmed'
            ]);
            if (count($validator->errors()) >= 1) {
                return $this->jsonResponse(0, null, $validator->errors(), null, 400);
            }

            $user = new User();
            $user->full_name = $request->full_name;
            $user->username = $request->username;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            return $this->jsonResponse(1, null, 'User Registered', null, 200);
        } catch (\Exception $e) {
            return $this->jsonResponse(0, null, null, $e, 409);
        }
    }
}
