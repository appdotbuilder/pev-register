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
        Schema::create('owners', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->comment('Owner full name');
            $table->string('email')->unique()->comment('Owner email address');
            $table->string('phone')->comment('Owner phone number');
            $table->text('address')->comment('Owner address');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('full_name');
            $table->index('email');
            $table->index(['full_name', 'email']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owners');
    }
};