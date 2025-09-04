import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Repeat2, Calendar, Battery, Car, User, Mail, Phone, MapPin, History } from 'lucide-react';

interface Owner {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    address: string;
}

interface OwnershipTransfer {
    id: number;
    transfer_date: string;
    previous_owner: Owner;
    new_owner: Owner;
    created_at: string;
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
    transfers: OwnershipTransfer[];
    created_at: string;
    updated_at: string;
}

interface Props {
    pev: Pev;
    [key: string]: unknown;
}

export default function ShowPev({ pev }: Props) {
    return (
        <>
            <Head title={`${pev.year} ${pev.make} ${pev.model} - ${pev.license_plate}`} />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    {/* Header */}
                    <div className="mb-8">
                        <Link href="/">
                            <Button variant="outline" className="mb-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Registry
                            </Button>
                        </Link>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="text-3xl">⚡</div>
                                    <h1 className="text-3xl font-bold text-gray-900">
                                        {pev.year} {pev.make} {pev.model}
                                    </h1>
                                    <Badge variant="secondary" className="text-lg px-3 py-1">
                                        {pev.license_plate}
                                    </Badge>
                                </div>
                                <p className="text-gray-600">
                                    VIN: <span className="font-mono">{pev.vin}</span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <Link href={`/pevs/${pev.id}/edit`}>
                                    <Button variant="outline">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                    </Button>
                                </Link>
                                <Link href={`/pevs/${pev.id}/transfer`}>
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Repeat2 className="mr-2 h-4 w-4" />
                                        Transfer Ownership
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Vehicle Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center">
                                    <Car className="mr-3 h-6 w-6 text-green-600" />
                                    <CardTitle>Vehicle Information</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Make</div>
                                        <div className="font-semibold">{pev.make}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Model</div>
                                        <div className="font-semibold">{pev.model}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">Year</div>
                                        <div className="font-semibold">{pev.year}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-500 mb-1">License Plate</div>
                                        <div className="font-semibold font-mono">{pev.license_plate}</div>
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Vehicle Identification Number (VIN)</div>
                                    <div className="font-mono text-sm bg-gray-100 p-2 rounded">{pev.vin}</div>
                                </div>

                                <div className="flex items-center gap-6 pt-4 border-t">
                                    <div className="flex items-center">
                                        <Battery className="mr-2 h-5 w-5 text-green-500" />
                                        <div>
                                            <div className="text-sm text-gray-500">Battery Capacity</div>
                                            <div className="font-semibold">{pev.battery_capacity} kWh</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                                        <div>
                                            <div className="text-sm text-gray-500">Purchase Date</div>
                                            <div className="font-semibold">
                                                {new Date(pev.purchase_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Current Owner Information */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center">
                                    <User className="mr-3 h-6 w-6 text-blue-600" />
                                    <CardTitle>Current Owner</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Full Name</div>
                                    <div className="font-semibold text-lg">{pev.owner.full_name}</div>
                                </div>
                                
                                <div className="space-y-3">
                                    <div className="flex items-center">
                                        <Mail className="mr-3 h-4 w-4 text-gray-400" />
                                        <div>
                                            <div className="text-sm text-gray-500">Email</div>
                                            <div className="font-medium">{pev.owner.email}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center">
                                        <Phone className="mr-3 h-4 w-4 text-gray-400" />
                                        <div>
                                            <div className="text-sm text-gray-500">Phone</div>
                                            <div className="font-medium">{pev.owner.phone}</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-start">
                                        <MapPin className="mr-3 h-4 w-4 text-gray-400 mt-1" />
                                        <div>
                                            <div className="text-sm text-gray-500">Address</div>
                                            <div className="font-medium">{pev.owner.address}</div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Registration Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Registration Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Registered On</div>
                                    <div className="font-semibold">
                                        {new Date(pev.created_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Last Updated</div>
                                    <div className="font-semibold">
                                        {new Date(pev.updated_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-500 mb-1">Registry ID</div>
                                    <div className="font-mono text-sm bg-gray-100 p-2 rounded">
                                        PEV-{String(pev.id).padStart(6, '0')}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ownership History */}
                        <Card>
                            <CardHeader>
                                <div className="flex items-center">
                                    <History className="mr-3 h-6 w-6 text-purple-600" />
                                    <div>
                                        <CardTitle>Ownership History</CardTitle>
                                        <CardDescription>
                                            {pev.transfers.length === 0 
                                                ? "No ownership transfers recorded"
                                                : `${pev.transfers.length} transfer${pev.transfers.length === 1 ? '' : 's'} recorded`
                                            }
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                {pev.transfers.length === 0 ? (
                                    <div className="text-center py-8 text-gray-500">
                                        <History className="mx-auto h-12 w-12 mb-4 text-gray-300" />
                                        <p>Original owner - no transfers yet</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {pev.transfers.map((transfer, index) => (
                                            <div key={transfer.id} className="border rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <Badge variant="outline">
                                                        Transfer #{pev.transfers.length - index}
                                                    </Badge>
                                                    <div className="text-sm text-gray-500">
                                                        {new Date(transfer.transfer_date).toLocaleDateString()}
                                                    </div>
                                                </div>
                                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                                    <div>
                                                        <div className="text-gray-500 mb-1">From</div>
                                                        <div className="font-medium">{transfer.previous_owner.full_name}</div>
                                                        <div className="text-gray-600">{transfer.previous_owner.email}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-500 mb-1">To</div>
                                                        <div className="font-medium">{transfer.new_owner.full_name}</div>
                                                        <div className="text-gray-600">{transfer.new_owner.email}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}