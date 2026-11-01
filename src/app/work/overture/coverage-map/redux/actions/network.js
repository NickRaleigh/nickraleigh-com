/* ==========================================================================
   actions/network.js
   --------------------------------------------------------------------------
   Trimmed, mock-data port of the original's redux/actions/network.js:
   same "[network] ..." action-type strings and action-creator names for
   everything this demo actually uses, so the shape is recognizable against
   the real file. Left out: everything that only existed to drive a real API
   call this demo has no backend for (GET_ALL_NETWORKS, SEARCH_NETWORKS,
   GET_NETWORK_PENDING_REQUESTS, the "_REQUEST"/"_SUCCESS"/"_FAILURE" triplet
   around fetching the first page of members, and the networks-browsing
   actions). RESET_NETWORK has no production equivalent; it exists only so
   this page can be replayed from a clean slate.
   ========================================================================== */

export const SET_USER_INNER_CIRCLE_HOVERED = "[network] set user inner circle hovered";
export const SET_DISABLED_ANIMATION = "[network] set disabled animation";
export const SET_MEMBERS_STATES_TO_UPDATE_ON_MAP = "[network] set members states to update on map";
export const ADD_USER_TO_NETWORK = "[network] add user to network";
export const ADD_MY_NETWORK_MEMBER_INVITE = "[network] add my network member invite";

// Demo-only: no production equivalent.
export const RESET_NETWORK = "[network] reset network (demo)";

export const setUserInnerCircleHoveredAction = (payload) => ({
  type: SET_USER_INNER_CIRCLE_HOVERED,
  payload: payload,
});

export const setDisabledAnimationAction = (payload) => ({
  type: SET_DISABLED_ANIMATION,
  payload: payload,
});

export const setMemberStatesToUpdateOnMapAction = (payload) => ({
  type: SET_MEMBERS_STATES_TO_UPDATE_ON_MAP,
  payload: payload,
});

// payload: a platformAttorneys entry ({ id, full_name, state }). The real
// action just carried the new NetworkMember the API handed back; the
// reducer here builds that shape itself since there's no API response to
// build it from.
export const addUserToNetworkAction = (payload) => ({
  type: ADD_USER_TO_NETWORK,
  payload: payload,
});

// payload: { fullName, email }.
export const addMyNetworkMemberInviteAction = (payload) => ({
  type: ADD_MY_NETWORK_MEMBER_INVITE,
  payload: payload,
});

export const resetNetworkAction = () => ({ type: RESET_NETWORK });
