<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePevRequest;
use App\Http\Requests\TransferPevRequest;
use App\Http\Requests\UpdatePevRequest;
use App\Models\Owner;
use App\Models\OwnershipTransfer;
use App\Models\Pev;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PevController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pev::with('owner')->latest();

        // Apply search filters
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->searchByOwner($search)
                  ->orWhere('vin', 'like', "%{$search}%")
                  ->orWhere('make', 'like', "%{$search}%")
                  ->orWhere('model', 'like', "%{$search}%")
                  ->orWhere('license_plate', 'like', "%{$search}%");
            });
        }

        // Apply specific filters
        if ($request->filled('owner_name')) {
            $query->searchByOwner($request->owner_name);
        }
        if ($request->filled('vin')) {
            $query->searchByVin($request->vin);
        }
        if ($request->filled('make')) {
            $query->searchByMake($request->make);
        }
        if ($request->filled('model')) {
            $query->searchByModel($request->model);
        }
        if ($request->filled('license_plate')) {
            $query->searchByLicensePlate($request->license_plate);
        }

        $pevs = $query->paginate(12);

        return Inertia::render('welcome', [
            'pevs' => $pevs,
            'filters' => $request->only(['search', 'owner_name', 'vin', 'make', 'model', 'license_plate']),
            'totalCount' => Pev::count(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pevs/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePevRequest $request)
    {
        $validated = $request->validated();

        // Create or find the owner
        $owner = Owner::firstOrCreate(
            ['email' => $validated['owner_email']],
            [
                'full_name' => $validated['owner_full_name'],
                'phone' => $validated['owner_phone'],
                'address' => $validated['owner_address'],
            ]
        );

        // Create the PEV
        $pev = Pev::create([
            'make' => $validated['make'],
            'model' => $validated['model'],
            'year' => $validated['year'],
            'vin' => strtoupper($validated['vin']),
            'battery_capacity' => $validated['battery_capacity'],
            'purchase_date' => $validated['purchase_date'],
            'license_plate' => strtoupper($validated['license_plate']),
            'owner_id' => $owner->id,
        ]);

        return redirect()->route('pevs.show', $pev)
            ->with('success', 'PEV registered successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pev $pev)
    {
        $pev->load(['owner', 'transfers.previousOwner', 'transfers.newOwner']);

        return Inertia::render('pevs/show', [
            'pev' => $pev,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pev $pev)
    {
        $pev->load('owner');

        return Inertia::render('pevs/edit', [
            'pev' => $pev,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePevRequest $request, Pev $pev)
    {
        $validated = $request->validated();

        // Update or create the owner
        $owner = Owner::updateOrCreate(
            ['email' => $validated['owner_email']],
            [
                'full_name' => $validated['owner_full_name'],
                'phone' => $validated['owner_phone'],
                'address' => $validated['owner_address'],
            ]
        );

        // Update the PEV
        $pev->update([
            'make' => $validated['make'],
            'model' => $validated['model'],
            'year' => $validated['year'],
            'vin' => strtoupper($validated['vin']),
            'battery_capacity' => $validated['battery_capacity'],
            'purchase_date' => $validated['purchase_date'],
            'license_plate' => strtoupper($validated['license_plate']),
            'owner_id' => $owner->id,
        ]);

        return redirect()->route('pevs.show', $pev)
            ->with('success', 'PEV updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pev $pev)
    {
        $pev->delete();

        return redirect()->route('pevs.index')
            ->with('success', 'PEV deleted successfully!');
    }


}