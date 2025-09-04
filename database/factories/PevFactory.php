<?php

namespace Database\Factories;

use App\Models\Owner;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Pev>
 */
class PevFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $makes = ['Tesla', 'Nissan', 'BMW', 'Audi', 'Mercedes-Benz', 'Volkswagen', 'Ford', 'Hyundai', 'Kia', 'Chevrolet'];
        $models = [
            'Tesla' => ['Model S', 'Model 3', 'Model X', 'Model Y'],
            'Nissan' => ['Leaf', 'Ariya'],
            'BMW' => ['i3', 'i4', 'iX'],
            'Audi' => ['e-tron', 'e-tron GT'],
            'Mercedes-Benz' => ['EQS', 'EQC', 'EQA'],
            'Volkswagen' => ['ID.3', 'ID.4', 'ID.Buzz'],
            'Ford' => ['Mustang Mach-E', 'F-150 Lightning'],
            'Hyundai' => ['Ioniq 5', 'Kona Electric'],
            'Kia' => ['EV6', 'Niro EV'],
            'Chevrolet' => ['Bolt EV', 'Bolt EUV']
        ];
        
        $make = fake()->randomElement($makes);
        $model = fake()->randomElement($models[$make]);

        return [
            'make' => $make,
            'model' => $model,
            'year' => fake()->numberBetween(2015, 2024),
            'vin' => strtoupper(fake()->bothify('???????##########')),
            'battery_capacity' => fake()->randomFloat(2, 20, 150),
            'purchase_date' => fake()->dateTimeBetween('-5 years', 'now')->format('Y-m-d'),
            'license_plate' => strtoupper(fake()->bothify('???###')),
            'owner_id' => Owner::factory(),
        ];
    }

    /**
     * Indicate that the PEV is a Tesla.
     */
    public function tesla(): static
    {
        return $this->state(fn (array $attributes) => [
            'make' => 'Tesla',
            'model' => fake()->randomElement(['Model S', 'Model 3', 'Model X', 'Model Y']),
            'battery_capacity' => fake()->randomFloat(2, 75, 100),
        ]);
    }

    /**
     * Indicate that the PEV is a newer model.
     */
    public function newerModel(): static
    {
        return $this->state(fn (array $attributes) => [
            'year' => fake()->numberBetween(2022, 2024),
            'purchase_date' => fake()->dateTimeBetween('-2 years', 'now')->format('Y-m-d'),
        ]);
    }
}