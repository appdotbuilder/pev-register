import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Plus, Battery, Calendar, User, Phone, Mail, ArrowRight } from 'lucide-react';

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
    created_at: string;
}

interface Props {
    pevs?: {
        data: Pev[];
        links: Record<string, unknown>[];
        meta: Record<string, unknown>;
    };
    filters?: {
        search?: string;
        owner_name?: string;
        vin?: string;
        make?: string;
        model?: string;
        license_plate?: string;
    };
    totalCount?: number;
    [key: string]: unknown;
}

export default function Welcome({ pevs, filters = {}, totalCount = 0 }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/', { search: searchTerm }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const clearFilters = () => {
        setSearchTerm('');
        router.get('/', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // If no PEVs data is provided, show the landing page
    if (!pevs) {
        return (
            <>
                <Head title="PEV National Registry" />
                <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                    {/* Hero Section */}
                    <div className="container mx-auto px-4 py-16">
                        <div className="text-center mb-16">
                            <div className="text-6xl mb-6">⚡🚗</div>
                            <h1 className="text-5xl font-bold text-gray-900 mb-6">
                                PEV National Registry
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                                The official nationwide register for Personal Electric Vehicle (PEV) owners. 
                                Register your electric vehicle, transfer ownership, and search the national database.
                            </p>
                            <div className="flex gap-4 justify-center">
                                <Link href="/pevs/create">
                                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="mr-2 h-5 w-5" />
                                        Register Your PEV
                                    </Button>
                                </Link>
                                <Button 
                                    variant="outline" 
                                    size="lg" 
                                    onClick={() => router.get('/', { search: '' })}
                                >
                                    <Search className="mr-2 h-5 w-5" />
                                    Search Registry
                                </Button>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <Card>
                                <CardHeader>
                                    <div className="text-3xl mb-4">📋</div>
                                    <CardTitle>Vehicle Registration</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Register your electric vehicle with complete owner and vehicle details. 
                                        Track make, model, VIN, battery capacity, and more.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="text-3xl mb-4">🔄</div>
                                    <CardTitle>Ownership Transfer</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Easily transfer vehicle ownership to new owners. 
                                        Complete transfer history is maintained for transparency.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <div className="text-3xl mb-4">🔍</div>
                                    <CardTitle>Search & Filter</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-600">
                                        Search the national registry by owner name, VIN, make, model, 
                                        or license plate number.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stats Section */}
                        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Registry Statistics</h2>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div>
                                    <div className="text-3xl font-bold text-blue-600">{totalCount}</div>
                                    <div className="text-gray-600">Registered PEVs</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-green-600">100%</div>
                                    <div className="text-gray-600">Electric</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-purple-600">24/7</div>
                                    <div className="text-gray-600">Access</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-orange-600">🔒</div>
                                    <div className="text-gray-600">Secure</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head title="PEV National Registry" />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="text-4xl mb-4">⚡🚗</div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            PEV National Registry
                        </h1>
                        <p className="text-lg text-gray-600 mb-6">
                            {totalCount} Personal Electric Vehicles registered nationwide
                        </p>
                    </div>

                    {/* Search and Actions */}
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
                                <Input
                                    type="text"
                                    placeholder="Search by owner, VIN, make, model, or license plate..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" variant="outline">
                                    <Search className="h-4 w-4" />
                                </Button>
                            </form>
                            
                            <div className="flex gap-2">
                                {filters.search && (
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear Search
                                    </Button>
                                )}
                                <Link href="/pevs/create">
                                    <Button className="bg-blue-600 hover:bg-blue-700">
                                        <Plus className="mr-2 h-4 w-4" />
                                        Register PEV
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    {filters.search && (
                        <div className="mb-6">
                            <p className="text-gray-600">
                                Showing {pevs.data.length} results for "{filters.search}"
                            </p>
                        </div>
                    )}

                    {/* PEV Grid */}
                    {pevs.data.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {pevs.data.map((pev) => (
                                <Card key={pev.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="text-2xl">⚡</div>
                                            <Badge variant="secondary">{pev.license_plate}</Badge>
                                        </div>
                                        <CardTitle className="text-lg">
                                            {pev.year} {pev.make} {pev.model}
                                        </CardTitle>
                                        <CardDescription>
                                            VIN: {pev.vin}
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Battery className="mr-2 h-4 w-4" />
                                            {pev.battery_capacity} kWh
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Purchased: {new Date(pev.purchase_date).toLocaleDateString()}
                                        </div>
                                        <div className="border-t pt-3">
                                            <div className="flex items-center text-sm text-gray-900 font-medium mb-1">
                                                <User className="mr-2 h-4 w-4" />
                                                {pev.owner.full_name}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 mb-1">
                                                <Mail className="mr-2 h-4 w-4" />
                                                {pev.owner.email}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Phone className="mr-2 h-4 w-4" />
                                                {pev.owner.phone}
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter>
                                        <Link href={`/pevs/${pev.id}`} className="w-full">
                                            <Button variant="outline" className="w-full">
                                                View Details
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                No PEVs Found
                            </h3>
                            <p className="text-gray-600 mb-6">
                                {filters.search 
                                    ? "Try adjusting your search terms or clear the search."
                                    : "Be the first to register a PEV in the national registry!"
                                }
                            </p>
                            <div className="flex gap-4 justify-center">
                                {filters.search && (
                                    <Button variant="outline" onClick={clearFilters}>
                                        Clear Search
                                    </Button>
                                )}
                                <Link href="/pevs/create">
                                    <Button>Register First PEV</Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    {/* Pagination */}
                    {pevs.links && pevs.links.length > 3 && (
                        <div className="flex justify-center">
                            <div className="flex gap-2">
                                {pevs.links.map((link, index) => (
                                    <Button
                                        key={index}
                                        variant={link.active ? "default" : "outline"}
                                        size="sm"
                                        disabled={!link.url}
                                        onClick={() => {
                                            if (link.url && typeof link.url === 'string') {
                                                router.get(link.url);
                                            }
                                        }}
                                    >
                                        <span dangerouslySetInnerHTML={{ 
                                            __html: typeof link.label === 'string' ? link.label : '' 
                                        }} />
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}