<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePevRequest extends FormRequest
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
            // Owner details
            'owner_full_name' => 'required|string|max:255',
            'owner_email' => 'required|email|max:255',
            'owner_phone' => 'required|string|max:20',
            'owner_address' => 'required|string',
            
            // Vehicle details
            'make' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'year' => 'required|integer|min:2000|max:' . (date('Y') + 1),
            'vin' => 'required|string|size:17|unique:pevs,vin,' . $this->route('pev')?->id,
            'battery_capacity' => 'required|numeric|min:1|max:1000',
            'purchase_date' => 'required|date|before_or_equal:today',
            'license_plate' => 'required|string|max:10|unique:pevs,license_plate,' . $this->route('pev')?->id,
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
            'owner_full_name.required' => 'Owner full name is required.',
            'owner_email.required' => 'Owner email address is required.',
            'owner_email.email' => 'Please provide a valid email address.',
            'owner_phone.required' => 'Owner phone number is required.',
            'owner_address.required' => 'Owner address is required.',
            
            'make.required' => 'Vehicle make is required.',
            'model.required' => 'Vehicle model is required.',
            'year.required' => 'Manufacturing year is required.',
            'year.min' => 'Manufacturing year must be 2000 or later.',
            'year.max' => 'Manufacturing year cannot be in the future.',
            'vin.required' => 'VIN (Vehicle Identification Number) is required.',
            'vin.size' => 'VIN must be exactly 17 characters.',
            'vin.unique' => 'This VIN is already registered to another vehicle.',
            'battery_capacity.required' => 'Battery capacity is required.',
            'battery_capacity.min' => 'Battery capacity must be at least 1 kWh.',
            'battery_capacity.max' => 'Battery capacity cannot exceed 1000 kWh.',
            'purchase_date.required' => 'Purchase date is required.',
            'purchase_date.before_or_equal' => 'Purchase date cannot be in the future.',
            'license_plate.required' => 'License plate number is required.',
            'license_plate.unique' => 'This license plate is already registered to another vehicle.',
        ];
    }
}