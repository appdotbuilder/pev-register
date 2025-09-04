<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Owner
 *
 * @property int $id
 * @property string $full_name
 * @property string $email
 * @property string $phone
 * @property string $address
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Pev> $pevs
 * @property-read int|null $pevs_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OwnershipTransfer> $transfersAsPrevious
 * @property-read int|null $transfers_as_previous_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OwnershipTransfer> $transfersAsNew
 * @property-read int|null $transfers_as_new_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Owner newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Owner newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Owner query()
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Owner whereUpdatedAt($value)
 * @method static \Database\Factories\OwnerFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Owner extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'full_name',
        'email',
        'phone',
        'address',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get all PEVs owned by this owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pevs(): HasMany
    {
        return $this->hasMany(Pev::class);
    }

    /**
     * Get all ownership transfers where this owner was the previous owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transfersAsPrevious(): HasMany
    {
        return $this->hasMany(OwnershipTransfer::class, 'previous_owner_id');
    }

    /**
     * Get all ownership transfers where this owner was the new owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function transfersAsNew(): HasMany
    {
        return $this->hasMany(OwnershipTransfer::class, 'new_owner_id');
    }
}