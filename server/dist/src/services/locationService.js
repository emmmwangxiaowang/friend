import { PrismaClient } from '@prisma/client';
const privacyMap = new Map();
const GEOHASH_ALPHABET = '0123456789bcdefghjkmnpqrstuvwxyz';
function encodeGeohash(latitude, longitude, precision = 5) {
    let isEven = true;
    let lat = latitude;
    let lon = longitude;
    let bit = 0;
    let ch = 0;
    const bits = [16, 8, 4, 2, 1];
    let geohashChars = [];
    while (geohashChars.length < precision) {
        if (isEven) {
            const mid = (lon + 180.0) / 2.0;
            if (lon > mid) {
                ch |= bits[bit];
                lon = (lon + mid) / 2.0;
            }
            else {
                lon = (lon + mid) / 2.0;
            }
        }
        else {
            const mid = (lat + 90.0) / 2.0;
            if (lat > mid) {
                ch |= bits[bit];
                lat = (lat + mid) / 2.0;
            }
            else {
                lat = (lat + mid) / 2.0;
            }
        }
        isEven = !isEven;
        if (bit < 0) {
            bit = 0;
            geohashChars.push(GEOHASH_ALPHABET[ch]);
            ch = 0;
        }
        else {
            bit++;
        }
    }
    return geohashChars.join('').substring(0, precision);
}
function haversineKm(lat1, lon1, lat2, lon2) {
    const toRad = (x) => (x * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.asin(Math.min(1, Math.sqrt(a)));
    const R = 6371;
    return R * c;
}
const CITY_REGION_MAP = {
    'New York': 'New York',
    'San Francisco': 'California',
    'Los Angeles': 'California',
    'Chicago': 'Illinois'
};
const prisma = new PrismaClient();
function inferRegionFromCity(city) {
    return CITY_REGION_MAP[city] ?? undefined;
}
export async function updateLocation(payload) {
    const { userId, city, country, region, latitude, longitude, privacy } = payload;
    const isHidden = privacy === true || privacyMap.get(userId) === true;
    privacyMap.set(userId, isHidden);
    let profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
        profile = await prisma.profile.create({ data: { userId, displayName: 'User', age: 30, gender: '' } });
    }
    if ((city && country) && !isHidden) {
        const regionResolved = region ?? inferRegionFromCity(city);
        let location = await prisma.location.findFirst({ where: { city, country, region: regionResolved } });
        if (!location) {
            location = await prisma.location.create({ data: { city, country, region: regionResolved } });
        }
        if (latitude !== undefined && longitude !== undefined) {
            await prisma.location.update({ where: { id: location.id }, data: { latitude, longitude } });
        }
        await prisma.profile.update({ where: { userId }, data: { locationId: location.id } });
    }
    else {
        await prisma.profile.update({ where: { userId }, data: { locationId: null } });
    }
}
export async function getNearby(userId, radiusKm = 50) {
    const requesterProfile = await prisma.profile.findUnique({ where: { userId }, include: { location: true } });
    const requesterLocation = requesterProfile?.location
        ? { lat: requesterProfile.location.latitude, lon: requesterProfile.location.longitude }
        : null;
    if (!requesterLocation || requesterProfile?.locationId == null) {
        return [];
    }
    const profiles = await prisma.profile.findMany({
        where: {
            NOT: { userId },
            locationId: { not: null },
        },
        include: {
            location: true,
            user: true,
        },
    });
    const results = [];
    for (const p of profiles) {
        const hidden = privacyMap.get(p.userId) === true;
        if (hidden)
            continue;
        const loc = p.location;
        if (!loc?.latitude || !loc?.longitude)
            continue;
        const dist = haversineKm(requesterLocation.lat, requesterLocation.lon, loc.latitude, loc.longitude);
        if (dist <= radiusKm) {
            results.push({
                userId: p.userId,
                distanceKm: dist,
                city: loc.city,
                country: loc.country,
                region: loc.region,
                latitude: loc.latitude,
                longitude: loc.longitude,
            });
        }
    }
    results.sort((a, b) => a.distanceKm - b.distanceKm);
    return results;
}
export async function filterUsersByCity(city) {
    const profiles = await prisma.profile.findMany({
        where: {
            location: {
                isNot: null,
                some: {},
            },
        },
        include: {
            location: true,
            user: true,
        },
    });
    const results = [];
    for (const p of profiles) {
        const loc = p.location;
        if (!loc)
            continue;
        if (loc.city?.toLowerCase() === city.toLowerCase()) {
            if (privacyMap.get(p.userId) === true)
                continue;
            results.push({
                userId: p.userId,
                distanceKm: 0,
                city: loc.city,
                country: loc.country,
                region: loc.region,
                latitude: loc.latitude,
                longitude: loc.longitude,
            });
        }
    }
    return results;
}
export async function discoverSameCityOnly(userId, sameCity) {
    if (!sameCity) {
        return getNearby(userId);
    }
    const requesterProfile = await prisma.profile.findUnique({ where: { userId }, include: { location: true } });
    const requesterLoc = requesterProfile?.location;
    if (!requesterLoc || !requesterLoc.city) {
        return [];
    }
    const profiles = await prisma.profile.findMany({
        where: {
            userId: { not: userId },
            locationId: { not: null },
        },
        include: {
            location: true,
            user: true,
        },
    });
    const results = [];
    for (const p of profiles) {
        const loc = p.location;
        if (!loc || !loc.city)
            continue;
        if (loc.city.toLowerCase() === requesterLoc.city.toLowerCase()) {
            if (privacyMap.get(p.userId) === true)
                continue;
            results.push({
                userId: p.userId,
                distanceKm: 0,
                city: loc.city,
                country: loc.country,
                region: loc.region,
                latitude: loc.latitude,
                longitude: loc.longitude,
            });
        }
    }
    return results;
}
export { privacyMap };
