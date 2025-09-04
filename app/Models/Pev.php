<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Pev
 *
 * @property int $id
 * @property string $make
 * @property string $model
 * @property int $year
 * @property string $vin
 * @property float $battery_capacity
 * @property \Illuminate\Support\Carbon $purchase_date
 * @property string $license_plate
 * @property int $owner_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Owner $owner
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OwnershipTransfer> $transfers
 * @property-read int|null $transfers_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Pev newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pev newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Pev query()
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereBatteryCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereLicensePlate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereMake($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereModel($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev wherePurchaseDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereVin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev whereYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev searchByOwner($ownerName)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev searchByVin($vin)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev searchByMake($make)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev searchByModel($model)
 * @method static \Illuminate\Database\Eloquent\Builder|Pev searchByLicensePlate($licensePlate)
 * @method static \Database\Factories\PevFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Pev extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'make',
        'model',
        'year',
        'vin',
        'battery_capacity',
        'purchase_date',
        'license_plate',
        'owner_id',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'year' => 'integer',
        'battery_capacity' => 'decimal:2',
        'purchase_date' => 'date',
        'owner_id' => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the owner of this PEV.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner(): BelongsTo
    {
        return $this->belongsTo(Owner::class);
    }

    /**
     * Get all ownership transfers for this PEV.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transfers(): HasMany
    {
        return $this->hasMany(OwnershipTransfer::class);
    }

    /**
     * Scope a query to search by owner name.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $ownerName
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchByOwner($query, $ownerName)
    {
        return $query->whereHas('owner', function ($q) use ($ownerName) {
            $q->where('full_name', 'like', "%{$ownerName}%");
        });
    }

    /**
     * Scope a query to search by VIN.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $vin
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchByVin($query, $vin)
    {
        return $query->where('vin', 'like', "%{$vin}%");
    }

    /**
     * Scope a query to search by make.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $make
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchByMake($query, $make)
    {
        return $query->where('make', 'like', "%{$make}%");
    }

    /**
     * Scope a query to search by model.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $model
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchByModel($query, $model)
    {
        return $query->where('model', 'like', "%{$model}%");
    }

    /**
     * Scope a query to search by license plate.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @param  string  $licensePlate
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearchByLicensePlate($query, $licensePlate)
    {
        return $query->where('license_plate', 'like', "%{$licensePlate}%");
    }
}