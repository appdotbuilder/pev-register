<?php

namespace Tests\Feature;

use App\Models\Owner;
use App\Models\Pev;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PevRegistryTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_can_view_pev_registry_homepage(): void
    {
        // Create some test data
        $owner = Owner::factory()->create();
        $pev = Pev::factory()->create(['owner_id' => $owner->id]);

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                ->has('pevs.data')
                ->has('totalCount')
        );
    }

    public function test_can_register_new_pev(): void
    {
        $response = $this->get('/pevs/create');
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('pevs/create'));

        $pevData = [
            'owner_full_name' => 'John Doe',
            'owner_email' => 'john@example.com',
            'owner_phone' => '+1234567890',
            'owner_address' => '123 Main St, City, State 12345',
            'make' => 'Tesla',
            'model' => 'Model 3',
            'year' => 2023,
            'vin' => 'TESTVIN1234567890',
            'battery_capacity' => 75.5,
            'purchase_date' => '2023-01-15',
            'license_plate' => 'EV12345',
        ];

        $response = $this->post('/pevs', $pevData);

        $response->assertRedirect();
        $this->assertDatabaseHas('owners', [
            'full_name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
        $this->assertDatabaseHas('pevs', [
            'make' => 'Tesla',
            'model' => 'Model 3',
            'vin' => 'TESTVIN1234567890',
        ]);
    }

    public function test_can_view_pev_details(): void
    {
        $owner = Owner::factory()->create();
        $pev = Pev::factory()->create(['owner_id' => $owner->id]);

        $response = $this->get("/pevs/{$pev->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('pevs/show')
                ->has('pev')
        );
    }

    public function test_can_search_pevs(): void
    {
        $owner = Owner::factory()->create(['full_name' => 'John Smith']);
        $pev = Pev::factory()->create([
            'owner_id' => $owner->id,
            'make' => 'Tesla',
            'model' => 'Model 3',
        ]);

        // Search by owner name
        $response = $this->get('/?search=John');
        $response->assertStatus(200);

        // Search by make
        $response = $this->get('/?search=Tesla');
        $response->assertStatus(200);
    }

    public function test_can_transfer_ownership(): void
    {
        $owner = Owner::factory()->create();
        $pev = Pev::factory()->create(['owner_id' => $owner->id]);

        $response = $this->get("/pevs/{$pev->id}/transfer");
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('pevs/transfer'));

        $transferData = [
            'new_owner_full_name' => 'Jane Doe',
            'new_owner_email' => 'jane@example.com',
            'new_owner_phone' => '+1987654321',
            'new_owner_address' => '456 Oak Ave, City, State 54321',
            'transfer_date' => now()->format('Y-m-d'),
        ];

        $response = $this->post("/pevs/{$pev->id}/transfer", $transferData);

        $response->assertRedirect();
        $this->assertDatabaseHas('owners', [
            'full_name' => 'Jane Doe',
            'email' => 'jane@example.com',
        ]);
        $this->assertDatabaseHas('ownership_transfers', [
            'pev_id' => $pev->id,
            'previous_owner_id' => $owner->id,
        ]);
    }
}