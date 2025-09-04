<?php

namespace Database\Seeders;

use App\Models\Owner;
use App\Models\OwnershipTransfer;
use App\Models\Pev;
use Illuminate\Database\Seeder;

class PevSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some owners
        $owners = Owner::factory()->count(10)->create();
        
        // Create PEVs with specific makes and models for better demo
        $pevData = [
            ['Tesla', 'Model 3', 2023, 75.0],
            ['Tesla', 'Model Y', 2024, 82.0],
            ['Tesla', 'Model S', 2022, 100.0],
            ['Nissan', 'Leaf', 2023, 40.0],
            ['BMW', 'i4', 2023, 70.4],
            ['Audi', 'e-tron GT', 2024, 93.4],
            ['Mercedes-Benz', 'EQS', 2023, 107.8],
            ['Volkswagen', 'ID.4', 2023, 77.0],
            ['Ford', 'Mustang Mach-E', 2023, 88.0],
            ['Hyundai', 'Ioniq 5', 2024, 77.4],
            ['Kia', 'EV6', 2023, 77.4],
            ['Chevrolet', 'Bolt EV', 2023, 65.0],
        ];
        
        foreach ($pevData as [$make, $model, $year, $batteryCapacity]) {
            Pev::factory()->create([
                'make' => $make,
                'model' => $model,
                'year' => $year,
                'battery_capacity' => $batteryCapacity,
                'owner_id' => $owners->random()->id,
            ]);
        }
        
        // Create some additional random PEVs
        Pev::factory()->count(8)->create([
            'owner_id' => function () use ($owners) {
                return $owners->random()->id;
            },
        ]);
        
        // Create some ownership transfers for a few PEVs
        $pevsToTransfer = Pev::take(5)->get();
        
        foreach ($pevsToTransfer as $pev) {
            $newOwner = Owner::factory()->create();
            
            // Record the transfer
            OwnershipTransfer::factory()->create([
                'pev_id' => $pev->id,
                'previous_owner_id' => $pev->owner_id,
                'new_owner_id' => $newOwner->id,
                'transfer_date' => fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
            ]);
            
            // Update the PEV's current owner
            $pev->update(['owner_id' => $newOwner->id]);
        }
    }
}