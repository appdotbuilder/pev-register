<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TransferPevRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            // New owner details
            'new_owner_full_name' => 'required|string|max:255',
            'new_owner_email' => 'required|email|max:255',
            'new_owner_phone' => 'required|string|max:20',
            'new_owner_address' => 'required|string',
            
            // Transfer details
            'transfer_date' => 'required|date|before_or_equal:today',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'new_owner_full_name.required' => 'New owner full name is required.',
            'new_owner_email.required' => 'New owner email address is required.',
            'new_owner_email.email' => 'Please provide a valid email address.',
            'new_owner_phone.required' => 'New owner phone number is required.',
            'new_owner_address.required' => 'New owner address is required.',
            
            'transfer_date.required' => 'Transfer date is required.',
            'transfer_date.before_or_equal' => 'Transfer date cannot be in the future.',
        ];
    }
}