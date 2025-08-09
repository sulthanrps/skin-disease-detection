'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import { getLocation } from '@/lib/getLocation';
import L from 'leaflet';
import ReactDOMServer from 'react-dom/server';
import { CircleUserRound } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  address: string;
  position: [number, number]; // [latitude, longitude]
}

interface IDummyDoctor {
  name: string;
  specialty: string;
  address: string;
  position: [number, number]; // [latitude, longitude]
}

const dummyDoctors = 
[
  {
    name: "Naavagreen Natural Skin Care Malang",
    specialty: "Klinik Kecantikan",
    address: "Jl. Brigjend Slamet Riadi No.165a, Oro-oro Dowo, Kec. Klojen, Kota Malang, Jawa Timur 65119",
    position: [-7.96220, 112.62885] 
  },
  {
    name: "Larissa Aesthetic Center Malang",
    specialty: "Klinik Kecantikan",
    address: "Jl. Arjuno No.17, Kauman, Kec. Klojen, Kota Malang, Jawa Timur 65119",
    position: [-7.97349, 112.63007]
  },
  {
    name: "Natasha Skin Clinic Center Malang",
    specialty: "Klinik Kecantikan",
    address: "Jl. Bondowoso No.19, Gading Kasri, Kec. Klojen, Kota Malang, Jawa Timur 65115",
    position: [-7.96910, 112.62479]
  },
  {
    name: "Ella Skin Care Malang",
    specialty: "Klinik Kecantikan",
    address: "Jl. Bandung No.36, Penanggungan, Kec. Klojen, Kota Malang, Jawa Timur 65113",
    position: [-7.96105, 112.62255]
  }
]

const getCoordsFromAddress = async (address: string): Promise<[number, number] | null> => {
  try {
    const formattedAddress = encodeURIComponent(address);
    // Menggunakan API Nominatim dari OpenStreetMap
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${formattedAddress}&format=json&limit=1`);
    
    if (!response.ok) throw new Error("Gagal menghubungi layanan geocoding.");
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      // Mengembalikan [latitude, longitude]
      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } else {
      console.warn(`Alamat tidak ditemukan untuk: ${address}`);
      return null;
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    return null;
  }
};

const ChangeView = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  map.setView(center, 12);
  return null;
}

const NearbyDoctor = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [doctors, setDoctors] = useState<IDummyDoctor[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchAndProcessDoctors = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch('/api/nearby-doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ latitude, longitude }),
        });

        if (!response.ok) throw new Error('Gagal mengambil data dokter dari server.');
        
        // const doctorsFromGemini: Omit<Doctor, 'position'>[] = await response.json();

        // const geocodingPromises = doctorsFromGemini.map(doctor => 
        //     getCoordsFromAddress(doctor.address).then(coords => ({
        //         ...doctor,
        //         position: coords
        //     }))
        // );

        // const doctorsWithCoords = await Promise.all(geocodingPromises);

        // const validDoctors = doctorsWithCoords.filter(
        //   (doctor): doctor is Doctor => doctor.position !== null
        // );

        const doctorsDummy: Omit<IDummyDoctor, 'position'>[] = dummyDoctors;

        const geocodingPromises = doctorsDummy.map(doctor => 
            getCoordsFromAddress(doctor.address).then(coords => ({
                ...doctor,
                position: coords
            }))
        );

        const doctorsWithCoords = await Promise.all(geocodingPromises);

        const validDoctors = doctorsWithCoords.filter(
          (doctor): doctor is IDummyDoctor => doctor.position !== null
        );

        setDoctors(validDoctors);

      } catch (err) {
        console.error("Doctor processing error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getLocation()
      .then(coords => {
        setUserLocation([coords.latitude, coords.longitude]);
        fetchAndProcessDoctors(coords.latitude, coords.longitude);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const customIcon = new Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/447/447031.png',
    iconSize: [38, 38],
  });

  const createCustomIcon = (customIcon ,size = 24) => {
    const htmlIcon = ReactDOMServer.renderToString(
      <div className='px-4 py-1 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full'>
        <CircleUserRound size={size} className='-ml-3' color='white' />
      </div>
    );

    return L.divIcon({
      html: htmlIcon,
      className: 'custom-leaflet-icon',
      iconSize: L.point(size, size),
      iconAnchor: L.point(size / 2, size),
    });
  }
  
  const userIcon = createCustomIcon(CircleUserRound)

  if (error) {
    return <div className="p-4 bg-red-100 text-red-700 rounded-lg">Error: {error}</div>;
  }

  if (!userLocation) {
    return <div className="p-4 bg-gray-200 rounded-lg animate-pulse">Memuat peta dan lokasi Anda...</div>;
  }

  if(isLoading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='p-4 bg-gray-200 rounded-lg animate-pulse h-fit w-fit'>
          <h1 className='font-semibold text-xs md:text-xl bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent'>Mencari Dokter di Sekeliling Anda</h1>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full flex flex-col gap-4 justify-center items-center'>
      <h1 className='text-center font-bold text-xl md:text-3xl w-full bg-gradient-to-r from-rose-400 to-pink-600 bg-clip-text text-transparent'>
        Cek Dokter Di Sekitarmu Sekarang !
      </h1>
      <div className="h-[500px] w-[80%] rounded-2xl overflow-hidden shadow-lg">
        <MapContainer center={userLocation} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <ChangeView center={userLocation} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Pin untuk Lokasi Pengguna */}
          <Marker position={userLocation} icon={userIcon}>
            <Popup>Anda di sini.</Popup>
          </Marker>

          {/* Pin untuk setiap dokter */}
          {dummyDoctors.map((doctor, idx) => (
            <Marker key={idx} position={doctor.position} icon={customIcon}>
              <Popup>
                <div className="font-sans">
                  <h3 className="font-bold text-base mb-1">{doctor.name}</h3>
                  <p className="text-sm text-gray-600">{doctor.address}</p>
                  <a
                    // href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${doctor.position[0]},${doctor.position[1]}`}
                    href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation[0]},${userLocation[1]}&destination=${encodeURIComponent(doctor.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block bg-gradient-to-r from-rose-400 to-pink-600 text-white text-center text-sm font-semibold px-3 py-1 rounded-lg w-full"
                  >
                    Lihat Rute
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default NearbyDoctor;