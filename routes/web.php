<?php

use App\Http\Controllers\OwnershipTransferController;
use App\Http\Controllers\PevController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Main PEV registry page
Route::get('/', [PevController::class, 'index'])->name('home');

// PEV management routes
Route::resource('pevs', PevController::class);

// Ownership transfer routes
Route::get('pevs/{pev}/transfer', [OwnershipTransferController::class, 'create'])->name('pevs.transfer');
Route::post('pevs/{pev}/transfer', [OwnershipTransferController::class, 'store'])->name('pevs.transfer.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
