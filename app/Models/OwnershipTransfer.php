<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\OwnershipTransfer
 *
 * @property int $id
 * @property int $pev_id
 * @property int $previous_owner_id
 * @property int $new_owner_id
 * @property \Illuminate\Support\Carbon $transfer_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Pev $pev
 * @property-read \App\Models\Owner $previousOwner
 * @property-read \App\Models\Owner $newOwner
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer query()
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer whereNewOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer wherePevId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer wherePreviousOwnerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer whereTransferDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|OwnershipTransfer whereUpdatedAt($value)
 * @method static \Database\Factories\OwnershipTransferFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class OwnershipTransfer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'pev_id',
        'previous_owner_id',
        'new_owner_id',
        'transfer_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'pev_id' => 'integer',
        'previous_owner_id' => 'integer',
        'new_owner_id' => 'integer',
        'transfer_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the PEV being transferred.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function pev(): BelongsTo
    {
        return $this->belongsTo(Pev::class);
    }

    /**
     * Get the previous owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function previousOwner(): BelongsTo
    {
        return $this->belongsTo(Owner::class, 'previous_owner_id');
    }

    /**
     * Get the new owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function newOwner(): BelongsTo
    {
        return $this->belongsTo(Owner::class, 'new_owner_id');
    }
}