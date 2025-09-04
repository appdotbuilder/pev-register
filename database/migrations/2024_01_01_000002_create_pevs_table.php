<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pevs', function (Blueprint $table) {
            $table->id();
            $table->string('make')->comment('Vehicle manufacturer');
            $table->string('model')->comment('Vehicle model');
            $table->integer('year')->comment('Manufacturing year');
            $table->string('vin')->unique()->comment('Vehicle Identification Number');
            $table->decimal('battery_capacity', 8, 2)->comment('Battery capacity in kWh');
            $table->date('purchase_date')->comment('Date of purchase');
            $table->string('license_plate')->unique()->comment('License plate number');
            $table->foreignId('owner_id')->constrained();
            $table->timestamps();
            
            // Indexes for search functionality
            $table->index('make');
            $table->index('model');
            $table->index('year');
            $table->index('vin');
            $table->index('license_plate');
            $table->index(['make', 'model']);
            $table->index(['owner_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pevs');
    }
};