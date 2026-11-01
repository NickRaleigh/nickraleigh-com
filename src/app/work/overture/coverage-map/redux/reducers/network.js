/* ==========================================================================
   reducers/network.js
   --------------------------------------------------------------------------
   Mock-data port of the original's redux/reducers/network.js. Keeps the
   original's data shapes where a component downstream actually depends on
   them (networkMembers and pendingInvites as { count, next, results } page
   envelopes, matching InnerCircle/index.js's own rendering, even though
   `next` is always null here: there's no second page to fetch) and drops
   the shapes that only existed for machinery this demo doesn't have
   (networks browsing/search, pagination, loading flags for requests that
   never really go over the wire).

   One deliberate difference from the original: there, the network/member
   diffing that decides which map states are "new" vs "existing" lives in
   CoverageMap/index.js (a useEffect comparing this render's networkMembers
   against the last one), not here — this reducer only appends to
   networkMembersAdded and lets that effect do the diffing, exactly like
   the original does. See index.jsx's own comment on that effect.
   ========================================================================== */

import {
  SET_USER_INNER_CIRCLE_HOVERED,
  SET_DISABLED_ANIMATION,
  SET_MEMBERS_STATES_TO_UPDATE_ON_MAP,
  ADD_USER_TO_NETWORK,
  ADD_MY_NETWORK_MEMBER_INVITE,
  RESET_NETWORK,
} from "../actions/network";

// `avatar` is a filename under /uploads/coverage-map/avatars/ — see
// SearchBar/platformAttorneys.js's own comment on why.
const SEED_ATTORNEYS = [
  { id: "seed-jalvarez", full_name: "J. Alvarez", state: "California", avatar: "avatar-01.jpg" },
  { id: "seed-rkim", full_name: "R. Kim", state: "California", avatar: "avatar-02.jpg" },
  { id: "seed-tbrooks", full_name: "T. Brooks", state: "California", avatar: "avatar-03.jpg" },
  { id: "seed-mosei", full_name: "M. Osei", state: "California", avatar: "avatar-04.jpg" },
  { id: "seed-mchen", full_name: "M. Chen", state: "Texas", avatar: "avatar-05.jpg" },
  { id: "seed-spatel", full_name: "S. Patel", state: "New York", avatar: "avatar-06.jpg" },
  { id: "seed-dnguyen", full_name: "D. Nguyen", state: "New York", avatar: "avatar-07.jpg" },
  { id: "seed-lgarcia", full_name: "L. Garcia", state: "Florida", avatar: "avatar-08.jpg" },
  { id: "seed-kito", full_name: "K. Ito", state: "Illinois", avatar: "avatar-09.jpg" },
  { id: "seed-acole", full_name: "A. Cole", state: "Georgia", avatar: "avatar-10.jpg" },
  { id: "seed-pnovak", full_name: "P. Novak", state: "Ohio", avatar: "avatar-11.jpg" },
  { id: "seed-ereyes", full_name: "E. Reyes", state: "Washington", avatar: "avatar-12.jpg" },
  { id: "seed-hosei", full_name: "H. Osei", state: "Colorado", avatar: "avatar-13.jpg" },
  { id: "seed-vsilva", full_name: "V. Silva", state: "North Carolina", avatar: "avatar-14.jpg" },
];

function initialsOf(fullName) {
  return fullName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function toNetworkMember(attorney) {
  return {
    model_name: "NetworkMember",
    user_id: attorney.id,
    full_name: attorney.full_name,
    practice_states: [attorney.state],
    avatar: attorney.avatar,
  };
}

function seedNetworkStates() {
  const states = {};
  SEED_ATTORNEYS.forEach((attorney) => {
    const entry = { full_name: attorney.full_name, initials: initialsOf(attorney.full_name), avatar: attorney.avatar };
    states[attorney.state] = (states[attorney.state] || []).concat([entry]);
  });
  return states;
}

function countCoveredStates(networkStates) {
  return Object.keys(networkStates).filter((state) => networkStates[state].length > 0).length;
}

// Called at store creation and again on RESET_NETWORK, so both start from
// the identical baseline. `disableAnimation`/`variant` ride along from
// whatever CoverageMapDemo was mounted with (see index.jsx), since those
// describe the mount, not the network.
export function buildInitialState({ disableAnimation, variant, resetNonce = 0 }) {
  const networkStates = seedNetworkStates();
  const seedMembers = SEED_ATTORNEYS.map(toNetworkMember);

  return {
    hovered: null,
    disableAnimation: !!disableAnimation,
    variant: variant,
    // Bumped on every RESET_NETWORK. index.jsx keys SearchBar on this, so a
    // reset also force-remounts it — clearing its own local state (the
    // typed query, an in-progress invite) the same way the original
    // SearchBar's handleOnClose did when "Reset demo" lived inside it,
    // before it moved out to sit next to "Simulate" (see DemoControls).
    resetNonce: resetNonce,
    memberStatesToUpdateOnMap: { new: [], existing: [] },
    networkStates: networkStates,
    networkStatesCount: countCoveredStates(networkStates),
    networkMembers: { count: seedMembers.length, next: null, results: seedMembers },
    // Only ever grows via ADD_USER_TO_NETWORK, i.e. a real visitor action —
    // the seed network above was never "added", so it starts empty. This is
    // what index.jsx's map-diffing effect watches to know a fresh add just
    // happened, same as the original.
    networkMembersAdded: [],
    pendingInvites: { count: 0, next: null, results: [] },
    networkSummary: {
      inner_circle_member_count: seedMembers.length,
      total_invites_sent: 0,
      practice_states_count: countCoveredStates(networkStates),
    },
  };
}

function addUserToNetwork(state, attorney) {
  const member = { ...toNetworkMember(attorney), new: true };
  const entry = { full_name: attorney.full_name, initials: initialsOf(attorney.full_name), avatar: attorney.avatar };
  const networkStates = {
    ...state.networkStates,
    [attorney.state]: (state.networkStates[attorney.state] || []).concat([entry]),
  };
  const networkStatesCount = countCoveredStates(networkStates);
  const networkMembers = {
    count: state.networkMembers.count + 1,
    next: null,
    results: [member].concat(state.networkMembers.results),
  };

  return {
    ...state,
    networkStates: networkStates,
    networkStatesCount: networkStatesCount,
    networkMembers: networkMembers,
    networkMembersAdded: state.networkMembersAdded.concat([member]),
    networkSummary: {
      ...state.networkSummary,
      inner_circle_member_count: networkMembers.count,
      practice_states_count: networkStatesCount,
    },
  };
}

function addMyNetworkMemberInvite(state, invite) {
  const referral = {
    id: `invite-${Date.now()}-${Math.round(Math.random() * 1e6)}`,
    model_name: "NetworkMemberReferral",
    full_name: invite.fullName,
    email: invite.email,
    new: true,
  };
  const pendingInvites = {
    count: state.pendingInvites.count + 1,
    next: null,
    results: [referral].concat(state.pendingInvites.results),
  };

  return {
    ...state,
    pendingInvites: pendingInvites,
    networkSummary: {
      ...state.networkSummary,
      total_invites_sent: state.networkSummary.total_invites_sent + 1,
    },
  };
}

export default function networkReducer(state, action) {
  switch (action.type) {
    case SET_USER_INNER_CIRCLE_HOVERED:
      return { ...state, hovered: action.payload };
    case SET_DISABLED_ANIMATION:
      return { ...state, disableAnimation: action.payload };
    case SET_MEMBERS_STATES_TO_UPDATE_ON_MAP:
      return { ...state, memberStatesToUpdateOnMap: action.payload };
    case ADD_USER_TO_NETWORK:
      return addUserToNetwork(state, action.payload);
    case ADD_MY_NETWORK_MEMBER_INVITE:
      return addMyNetworkMemberInvite(state, action.payload);
    case RESET_NETWORK:
      return buildInitialState({
        disableAnimation: state.disableAnimation,
        variant: state.variant,
        resetNonce: state.resetNonce + 1,
      });
    default:
      return state;
  }
}
