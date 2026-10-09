/* ==========================================================================
   BASHFODIO FASHION - BESPOKE MEASUREMENT CALCULATOR & BOOKING
   Atelier custom tailoring measurement handler
   ========================================================================== */

function saveBespokeBooking(formData) {
  const reference = 'BF-BESPOKE-' + Math.floor(Math.random() * 1000000);
  const bookingData = {
    bookingRef: reference,
    dateCreated: new Date().toLocaleDateString('en-NG'),
    customerName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    gender: formData.get('gender'),
    outfitType: formData.get('outfitType'),
    preferredFabric: formData.get('preferredFabric'),
    fittingDate: formData.get('fittingDate'),
    measurements: {
      chest: formData.get('chest') || 'Standard',
      shoulder: formData.get('shoulder') || 'Standard',
      waist: formData.get('waist') || 'Standard',
      hip: formData.get('hip') || 'Standard',
      armLength: formData.get('armLength') || 'Standard',
      outfitLength: formData.get('outfitLength') || 'Standard',
      neck: formData.get('neck') || 'Standard'
    },
    status: 'Measurement Logged - Atelier Master Assigned'
  };

  const existingBookings = JSON.parse(localStorage.getItem('bashfodio_bespoke_bookings') || '[]');
  existingBookings.unshift(bookingData);
  localStorage.setItem('bashfodio_bespoke_bookings', JSON.stringify(existingBookings));

  return bookingData;
}
