import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Car, User } from 'lucide-react';
import InputError from '@/components/input-error';

interface Owner {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
}

interface Pev {
    id: number;
    make: string;
    model: string;
    year: number;
    vin: string;
    battery_capacity: number;
    purchase_date: string;
    license_plate: string;
    owner: Owner;
}

type PevFormData = {
    owner_full_name: string;
    owner_email: string;
    owner_phone: string;
    owner_address: string;
    make: string;
    model: string;
    year: string;
    vin: string;
    battery_capacity: string;
    purchase_date: string;
    license_plate: string;
}

interface Props {
    pev: Pev;
    [key: string]: unknown;
}

export default function EditPev({ pev }: Props) {
    const { data, setData, put, processing, errors } = useForm<PevFormData>({
        owner_full_name: pev.owner.full_name,
        owner_email: pev.owner.email,
        owner_phone: pev.owner.phone,
        owner_address: pev.owner.address,
        make: pev.make,
        model: pev.model,
        year: pev.year.toString(),
        vin: pev.vin,
        battery_capacity: pev.battery_capacity.toString(),
        purchase_date: pev.purchase_date,
        license_plate: pev.license_plate,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/pevs/${pev.id}`);
    };

    return (
        <>
            <Head title={`Edit - ${pev.year} ${pev.make} ${pev.model}`} />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href={`/pevs/${pev.id}`}>
                            <Button variant="outline" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Vehicle
                            </Button>
                        </Link>
                        <div className="text-center">
                            <div className="text-4xl mb-4">⚡✏️</div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Edit PEV Registration
                            </h1>
                            <p className="text-gray-600">
                                Update registration details for {pev.year} {pev.make} {pev.model}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Owner Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center">
                                    <User className="mr-3 h-6 w-6 text-blue-600" />
                                    <div>
                                        <CardTitle>Owner Information</CardTitle>
                                        <CardDescription>
                                            Update owner details
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="owner_full_name">Full Name *</Label>
                                    <Input
                                        id="owner_full_name"
                                        type="text"
                                        value={data.owner_full_name}
                                        onChange={(e) => setData('owner_full_name', e.target.value)}
                                        placeholder="Enter full name"
                                    />
                                    <InputError message={errors.owner_full_name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="owner_email">Email Address *</Label>
                                    <Input
                                        id="owner_email"
                                        type="email"
                                        value={data.owner_email}
                                        onChange={(e) => setData('owner_email', e.target.value)}
                                        placeholder="Enter email address"
                                    />
                                    <InputError message={errors.owner_email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="owner_phone">Phone Number *</Label>
                                    <Input
                                        id="owner_phone"
                                        type="tel"
                                        value={data.owner_phone}
                                        onChange={(e) => setData('owner_phone', e.target.value)}
                                        placeholder="Enter phone number"
                                    />
                                    <InputError message={errors.owner_phone} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="owner_address">Address *</Label>
                                    <Textarea
                                        id="owner_address"
                                        value={data.owner_address}
                                        onChange={(e) => setData('owner_address', e.target.value)}
                                        placeholder="Enter complete address"
                                        rows={3}
                                    />
                                    <InputError message={errors.owner_address} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Vehicle Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center">
                                    <Car className="mr-3 h-6 w-6 text-green-600" />
                                    <div>
                                        <CardTitle>Vehicle Information</CardTitle>
                                        <CardDescription>
                                            Update vehicle details
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="make">Make *</Label>
                                    <Input
                                        id="make"
                                        type="text"
                                        value={data.make}
                                        onChange={(e) => setData('make', e.target.value)}
                                        placeholder="e.g., Tesla, Nissan, BMW"
                                    />
                                    <InputError message={errors.make} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="model">Model *</Label>
                                    <Input
                                        id="model"
                                        type="text"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        placeholder="e.g., Model 3, Leaf, i4"
                                    />
                                    <InputError message={errors.model} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="year">Year *</Label>
                                    <Input
                                        id="year"
                                        type="number"
                                        min="2000"
                                        max={new Date().getFullYear() + 1}
                                        value={data.year}
                                        onChange={(e) => setData('year', e.target.value)}
                                        placeholder="e.g., 2023"
                                    />
                                    <InputError message={errors.year} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="vin">VIN (Vehicle Identification Number) *</Label>
                                    <Input
                                        id="vin"
                                        type="text"
                                        maxLength={17}
                                        value={data.vin}
                                        onChange={(e) => setData('vin', e.target.value.toUpperCase())}
                                        placeholder="17-character VIN"
                                        className="font-mono"
                                    />
                                    <InputError message={errors.vin} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="battery_capacity">Battery Capacity (kWh) *</Label>
                                    <Input
                                        id="battery_capacity"
                                        type="number"
                                        step="0.1"
                                        min="1"
                                        max="1000"
                                        value={data.battery_capacity}
                                        onChange={(e) => setData('battery_capacity', e.target.value)}
                                        placeholder="e.g., 75.5"
                                    />
                                    <InputError message={errors.battery_capacity} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="purchase_date">Purchase Date *</Label>
                                    <Input
                                        id="purchase_date"
                                        type="date"
                                        max={new Date().toISOString().split('T')[0]}
                                        value={data.purchase_date}
                                        onChange={(e) => setData('purchase_date', e.target.value)}
                                    />
                                    <InputError message={errors.purchase_date} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="license_plate">License Plate Number *</Label>
                                    <Input
                                        id="license_plate"
                                        type="text"
                                        value={data.license_plate}
                                        onChange={(e) => setData('license_plate', e.target.value.toUpperCase())}
                                        placeholder="Enter license plate number"
                                        className="font-mono"
                                    />
                                    <InputError message={errors.license_plate} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Button */}
                        <div className="flex gap-4 justify-end">
                            <Link href={`/pevs/${pev.id}`}>
                                <Button variant="outline" type="button">
                                    Cancel
                                </Button>
                            </Link>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 min-w-[120px]"
                            >
                                {processing ? 'Updating...' : 'Update PEV'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}