<?php

namespace App\Http\Traits;

trait JSONResponseTrait
{
    public function jsonResponse($status, $data = null, $message = null, $tryCatchError = null, $status_code)
    {
        if ($tryCatchError != null) {
            return response()->json([
                'status' => $status,
                'error' => $tryCatchError->getMessage()
            ], $status_code);
        }
        return response()->json([
            'status' => $status,
            'data' => $data,
            'message' => $message
        ], $status_code);
    }
}
