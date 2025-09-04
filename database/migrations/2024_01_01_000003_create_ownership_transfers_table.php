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
        Schema::create('ownership_transfers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pev_id')->constrained();
            $table->foreignId('previous_owner_id')->constrained('owners');
            $table->foreignId('new_owner_id')->constrained('owners');
            $table->date('transfer_date')->comment('Date of ownership transfer');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('pev_id');
            $table->index('previous_owner_id');
            $table->index('new_owner_id');
            $table->index('transfer_date');
            $table->index(['pev_id', 'transfer_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ownership_transfers');
    }
};