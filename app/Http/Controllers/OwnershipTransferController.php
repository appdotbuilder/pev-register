<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\TransferPevRequest;
use App\Models\Owner;
use App\Models\OwnershipTransfer;
use App\Models\Pev;
use Inertia\Inertia;

class OwnershipTransferController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create(Pev $pev)
    {
        $pev->load('owner');

        return Inertia::render('pevs/transfer', [
            'pev' => $pev,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TransferPevRequest $request, Pev $pev)
    {
        $validated = $request->validated();

        // Create or find the new owner
        $newOwner = Owner::firstOrCreate(
            ['email' => $validated['new_owner_email']],
            [
                'full_name' => $validated['new_owner_full_name'],
                'phone' => $validated['new_owner_phone'],
                'address' => $validated['new_owner_address'],
            ]
        );

        // Record the ownership transfer
        OwnershipTransfer::create([
            'pev_id' => $pev->id,
            'previous_owner_id' => $pev->owner_id,
            'new_owner_id' => $newOwner->id,
            'transfer_date' => $validated['transfer_date'],
        ]);

        // Update the PEV's current owner
        $pev->update(['owner_id' => $newOwner->id]);

        return redirect()->route('pevs.show', $pev)
            ->with('success', 'Ownership transferred successfully!');
    }
}