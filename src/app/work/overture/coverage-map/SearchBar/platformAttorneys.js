// Mock pool of attorneys on the platform at large, distinct from
// networkStates/networkMembers (redux/reducers/network.js), which track
// only the attorneys already in *this* visitor's network. SearchBar filters
// this pool to find attorneys the visitor could add.
//
// `avatar` is a filename under /uploads/coverage-map/avatars/ — stock
// placeholder headshots (pravatar.cc), not real attorneys, standing in for
// the real app's profile photos so results read as people, not initials.

export const platformAttorneys = [
  // Two names that collide with the starting network (see seedNetworkStates
  // in redux/reducers/network.js), so the "already in network" filter has
  // something to demonstrate on page load, before a visitor adds anyone
  // themselves.
  { id: "mchen", full_name: "M. Chen", state: "Texas", avatar: "avatar-15.jpg" },
  { id: "jalvarez", full_name: "J. Alvarez", state: "California", avatar: "avatar-16.jpg" },

  // New names in states the starting network already covers, to exercise
  // the toast-without-animation path: the state is already lit, so there's
  // nothing new for the map to reveal.
  { id: "gwhitmore", full_name: "G. Whitmore", state: "California", avatar: "avatar-17.jpg" },
  { id: "hdelacroix", full_name: "H. Delacroix", state: "Texas", avatar: "avatar-18.jpg" },

  // New names in states the starting network doesn't cover yet.
  { id: "awhitfield", full_name: "A. Whitfield", state: "Oregon", avatar: "avatar-19.jpg" },
  { id: "bnakamura", full_name: "B. Nakamura", state: "Arizona", avatar: "avatar-20.jpg" },
  { id: "cokafor", full_name: "C. Okafor", state: "Nevada", avatar: "avatar-21.jpg" },
  { id: "dlarsen", full_name: "D. Larsen", state: "Utah", avatar: "avatar-22.jpg" },
  { id: "emarquez", full_name: "E. Marquez", state: "New Mexico", avatar: "avatar-23.jpg" },
  { id: "fdonnelly", full_name: "F. Donnelly", state: "Wyoming", avatar: "avatar-24.jpg" },
  { id: "gpetrov", full_name: "G. Petrov", state: "Montana", avatar: "avatar-25.jpg" },
  { id: "habiodun", full_name: "H. Abiodun", state: "Idaho", avatar: "avatar-26.jpg" },
  { id: "icastellano", full_name: "I. Castellano", state: "Minnesota", avatar: "avatar-27.jpg" },
  { id: "jhartley", full_name: "J. Hartley", state: "Wisconsin", avatar: "avatar-28.jpg" },
  { id: "kdelgado", full_name: "K. Delgado", state: "Missouri", avatar: "avatar-29.jpg" },
  { id: "lfairweather", full_name: "L. Fairweather", state: "Michigan", avatar: "avatar-30.jpg" },
  { id: "mnovotny", full_name: "M. Novotny", state: "Pennsylvania", avatar: "avatar-31.jpg" },
  { id: "nesposito", full_name: "N. Esposito", state: "New Jersey", avatar: "avatar-32.jpg" },
  { id: "oblackwood", full_name: "O. Blackwood", state: "Virginia", avatar: "avatar-33.jpg" },
  { id: "podom", full_name: "P. Odom", state: "Tennessee", avatar: "avatar-34.jpg" },
  { id: "qrahman", full_name: "Q. Rahman", state: "Alabama", avatar: "avatar-35.jpg" },
  { id: "rbeaumont", full_name: "R. Beaumont", state: "Mississippi", avatar: "avatar-36.jpg" },
  { id: "stran", full_name: "S. Tran", state: "Louisiana", avatar: "avatar-37.jpg" },
  { id: "tkowalski", full_name: "T. Kowalski", state: "Oklahoma", avatar: "avatar-38.jpg" },
  { id: "usingh", full_name: "U. Singh", state: "Kansas", avatar: "avatar-39.jpg" },
  { id: "vboateng", full_name: "V. Boateng", state: "Nebraska", avatar: "avatar-40.jpg" },
  { id: "walvarado", full_name: "W. Alvarado", state: "Iowa", avatar: "avatar-41.jpg" },
  { id: "xfontaine", full_name: "X. Fontaine", state: "Indiana", avatar: "avatar-42.jpg" },
  { id: "ymcallister", full_name: "Y. McAllister", state: "Kentucky", avatar: "avatar-43.jpg" },
  { id: "zdubois", full_name: "Z. Dubois", state: "West Virginia", avatar: "avatar-44.jpg" },
  { id: "awinslow", full_name: "A. Winslow", state: "Maryland", avatar: "avatar-45.jpg" },
  { id: "bkessler", full_name: "B. Kessler", state: "Delaware", avatar: "avatar-46.jpg" },
  { id: "cokonkwo", full_name: "C. Okonkwo", state: "Connecticut", avatar: "avatar-47.jpg" },
  { id: "dpham", full_name: "D. Pham", state: "Rhode Island", avatar: "avatar-48.jpg" },
];
