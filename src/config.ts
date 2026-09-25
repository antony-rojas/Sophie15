/**
 * Configuration variables for Sophie Shanell - Mis XV Años
 * Modify here to update event details without touching component code.
 */
import botanicalFrame from './assets/images/botanical_gold_frame_1787467015216.jpg'; 
import coutureGown from './assets/images/couture_gala_gown_1787209764865.jpg'; 
import enchantedRose from './assets/images/enchanted_rose_1787209730778.jpg'; 
import fairytaleCastle from './assets/images/fairytale_castle_night_1787209753203.jpg'; 
import grandBallroom from './assets/images/grand_ballroom_panorama_1787209741456.jpg'; 
import heroBallroom from './assets/images/hero_ballroom_doors_1787209718540.jpg';
import minimalDress from './assets/images/minimal_dress_code_1787469268748.jpg';
import princessGazing from './assets/images/princess_gazing_castle_1787209775904.jpg';
import stainedGlass from './assets/images/stained_glass_dance_1787468154920.jpg';

export const INVITATION_CONFIG = {
  quinceaneraName: "Sophie Shanell",
  eventName: "Mis XV Años",
  creativeConcept: "Una Noche Encantada",
  eventDate: "2026-11-14T19:00:00-05:00", // 14 de Noviembre de 2026, 7:00 PM
  displayDate: "14 de Noviembre de 2026",
  shortDate: "14 · 11 · 2026",
  schedule: {
    arrivalTime: "7:00 PM",
    arrivalTitle: "HORA DE LLEGADA",
    arrivalSubtitle: "Recepción de Invitados",
    quinceaneraTime: "8:30 PM",
    quinceaneraTitle: "BAJADA DE LA QUINCEAÑERA",
    quinceaneraSubtitle: "Ingreso Triunfal de Sophie",
    note: "Agradecemos tu puntualidad para disfrutar juntos de cada instante mágico."
  },
  eventLocation: "Chorrillos, Lima, Perú",
  venueName: "Local Recepciones Imperio",
  eventAddress: "Av. El Sol 1457, La Campiña - Chorrillos",
  fullAddress: "Av. El Sol 1457, La Campiña - Chorrillos, Local Recepciones Imperio",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+El+Sol+1457,+La+Campi%C3%B1a,+Chorrillos,+Local+Recepciones+Imperio",
  dressCode: "Elegante",
  dressCodeSubtitle: "Porque toda noche de cuento merece un look especial.",
  reservedColors: [
    { name: "Dorado", hex: "#C29043", gradient: "from-[#F3DC9B] via-[#C29043] to-[#9E6F28]" },
    { name: "Champagne", hex: "#F1E4C3", gradient: "from-[#FFF8E7] via-[#F1E4C3] to-[#DFCE9F]" },
    { name: "Amarillo", hex: "#F4D03F", gradient: "from-[#FEF08A] via-[#FACC15] to-[#CA8A04]" },
  ],
  // High quality classical fairy-tale orchestral waltz
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=waltz-of-the-flowers-tchaikovsky-piano-classical-112191.mp3",
  rsvpUrl: "#rsvp",
  whatsappNumber: "+51926961387",
  whatsappMessage: "✨ Estás invitado/a a los XV años de Sophie Shanell ✨\n\n14 de noviembre de 2026\n\nUna noche encantada nos espera. 🥀✨",
  parents: {
    sectionTitle: "Los padres de la quinceañera",
    father: "Luis Cabrera",
    mother: "Cristina Salvatierra",
    blessing: "Con la bendición de Dios y el amor infinito que guía cada uno de mis pasos",
    invitationText: "Tienen el inmenso honor y la alegría de invitarte a celebrar los quince años de su amada hija"
  },
  giftRain: {
    sectionTitle: "Lluvia de Regalos",
    subtitle: "Tu presencia es nuestro mejor regalo",
    message: "Si deseas tener un detalle o presente con Sophie, en la recepción del palacio contaremos con un baúl especial de sobres y regalos para depositar tus buenos deseos.",
    envelopeNote: "Lluvia de sobres o presentes en el cofre real"
  }
};

export const IMAGES = {
 heroBallroom, enchantedRose, grandBallroom, fairytaleCastle, coutureGown, princessGazing, botanicalFrame, minimalDress, stainedGlass
};
