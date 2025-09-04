import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Repeat2, User, Car } from 'lucide-react';
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

type TransferFormData = {
    new_owner_full_name: string;
    new_owner_email: string;
    new_owner_phone: string;
    new_owner_address: string;
    transfer_date: string;
}

interface Props {
    pev: Pev;
    [key: string]: unknown;
}

export default function TransferPev({ pev }: Props) {
    const { data, setData, post, processing, errors } = useForm<TransferFormData>({
        new_owner_full_name: '',
        new_owner_email: '',
        new_owner_phone: '',
        new_owner_address: '',
        transfer_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/pevs/${pev.id}/transfer`);
    };

    return (
        <>
            <Head title={`Transfer Ownership - ${pev.year} ${pev.make} ${pev.model}`} />
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
                            <div className="text-4xl mb-4">🔄⚡</div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Transfer Ownership
                            </h1>
                            <p className="text-gray-600">
                                Transfer ownership of your PEV to a new owner
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Current Vehicle Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center">
                                    <Car className="mr-3 h-6 w-6 text-green-600" />
                                    <div>
                                        <CardTitle>Vehicle Being Transferred</CardTitle>
                                        <CardDescription>
                                            Current vehicle and owner information
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="text-2xl">⚡</div>
                                            <div>
                                                <h3 className="text-xl font-semibold">
                                                    {pev.year} {pev.make} {pev.model}
                                                </h3>
                                                <p className="text-gray-600 font-mono">VIN: {pev.vin}</p>
                                            </div>
                                        </div>
                                        <Badge variant="secondary" className="text-lg px-3 py-1">
                                            {pev.license_plate}
                                        </Badge>
                                    </div>
                                    
                                    <div className="border-t pt-4">
                                        <h4 className="font-medium mb-2">Current Owner</h4>
                                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <div className="text-gray-500">Name</div>
                                                <div className="font-medium">{pev.owner.full_name}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500">Email</div>
                                                <div className="font-medium">{pev.owner.email}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500">Phone</div>
                                                <div className="font-medium">{pev.owner.phone}</div>
                                            </div>
                                            <div>
                                                <div className="text-gray-500">Address</div>
                                                <div className="font-medium">{pev.owner.address}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* New Owner Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center">
                                    <User className="mr-3 h-6 w-6 text-blue-600" />
                                    <div>
                                        <CardTitle>New Owner Information</CardTitle>
                                        <CardDescription>
                                            Details of the person receiving the vehicle
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="new_owner_full_name">Full Name *</Label>
                                    <Input
                                        id="new_owner_full_name"
                                        type="text"
                                        value={data.new_owner_full_name}
                                        onChange={(e) => setData('new_owner_full_name', e.target.value)}
                                        placeholder="Enter new owner's full name"
                                    />
                                    <InputError message={errors.new_owner_full_name} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new_owner_email">Email Address *</Label>
                                    <Input
                                        id="new_owner_email"
                                        type="email"
                                        value={data.new_owner_email}
                                        onChange={(e) => setData('new_owner_email', e.target.value)}
                                        placeholder="Enter new owner's email"
                                    />
                                    <InputError message={errors.new_owner_email} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="new_owner_phone">Phone Number *</Label>
                                    <Input
                                        id="new_owner_phone"
                                        type="tel"
                                        value={data.new_owner_phone}
                                        onChange={(e) => setData('new_owner_phone', e.target.value)}
                                        placeholder="Enter new owner's phone"
                                    />
                                    <InputError message={errors.new_owner_phone} />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="transfer_date">Transfer Date *</Label>
                                    <Input
                                        id="transfer_date"
                                        type="date"
                                        max={new Date().toISOString().split('T')[0]}
                                        value={data.transfer_date}
                                        onChange={(e) => setData('transfer_date', e.target.value)}
                                    />
                                    <InputError message={errors.transfer_date} />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="new_owner_address">Address *</Label>
                                    <Textarea
                                        id="new_owner_address"
                                        value={data.new_owner_address}
                                        onChange={(e) => setData('new_owner_address', e.target.value)}
                                        placeholder="Enter new owner's complete address"
                                        rows={3}
                                    />
                                    <InputError message={errors.new_owner_address} />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Transfer Summary */}
                        <Card className="border-blue-200 bg-blue-50">
                            <CardHeader>
                                <div className="flex items-center">
                                    <Repeat2 className="mr-3 h-6 w-6 text-blue-600" />
                                    <div>
                                        <CardTitle className="text-blue-900">Transfer Summary</CardTitle>
                                        <CardDescription className="text-blue-700">
                                            Review the ownership transfer details
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="text-blue-900">
                                <div className="space-y-2">
                                    <p>
                                        <strong>Vehicle:</strong> {pev.year} {pev.make} {pev.model} ({pev.license_plate})
                                    </p>
                                    <p>
                                        <strong>From:</strong> {pev.owner.full_name} ({pev.owner.email})
                                    </p>
                                    <p>
                                        <strong>To:</strong> {data.new_owner_full_name || 'New owner name'} ({data.new_owner_email || 'New owner email'})
                                    </p>
                                    <p>
                                        <strong>Transfer Date:</strong> {data.transfer_date ? new Date(data.transfer_date).toLocaleDateString() : 'Select date'}
                                    </p>
                                </div>
                                
                                <div className="mt-4 p-4 bg-blue-100 rounded-lg">
                                    <p className="text-sm font-medium">⚠️ Important Note:</p>
                                    <p className="text-sm mt-1">
                                        Once this transfer is completed, the ownership records will be permanently updated in the national registry. 
                                        The new owner will become the official registered owner of this vehicle.
                                    </p>
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
                                className="bg-blue-600 hover:bg-blue-700 min-w-[140px]"
                            >
                                {processing ? 'Processing...' : 'Transfer Ownership'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}