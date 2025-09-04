<?php

namespace Database\Factories;

use App\Models\Owner;
use App\Models\Pev;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\OwnershipTransfer>
 */
class OwnershipTransferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'pev_id' => Pev::factory(),
            'previous_owner_id' => Owner::factory(),
            'new_owner_id' => Owner::factory(),
            'transfer_date' => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
        ];
    }
}