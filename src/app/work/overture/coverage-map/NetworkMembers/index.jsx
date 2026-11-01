import React from "react";
import { useSelector } from "../redux/store";
import { classify } from "../helpers";

/* ==========================================================================
   NetworkMembers/index.jsx
   --------------------------------------------------------------------------
   The piece the earlier version of this demo was missing: a visible list of
   who's actually in the network, growing as you add people through
   SearchBar or "Simulate a new referral connection". Ported from
   InnerCircle/index.js's own member-listing sections (Pending Invites,
   then the member list itself) — the original used real profile photos and
   InfiniteScroll pagination for both; this demo has neither. Network
   members (platform attorneys, with a mock avatar) get a real photo, same
   as SearchBar's results; a pending invite doesn't have one (nobody's
   signed up yet to have a photo of), so it keeps the initials circle. Both
   render the full mock list at once rather than paging, since there's
   never more than a few dozen entries.
   Dropped entirely: the "Suggested" section below these two in the
   original, which needs its own suggestion data this demo doesn't model.
   ========================================================================== */

const InitialsCircle = ({ fullName, added }) => {
  const parts = fullName.replace(/\s+/g, " ").split(" ");
  const first = parts[0] ? parts[0][0].toUpperCase() : "";
  const second = parts.length > 1 && parts[1] ? parts[1][0].toUpperCase() : "";

  return (
    <div
      className={`inner-circle-search__user__result__circle inner-circle-search__user__result__initials${
        added ? " inner-circle-search__user__result__initials--added" : ""
      }`}
    >
      <div className="inner-circle-search__user__result__initials__inner">
        <span className="inner-circle-search__user__result__initials__initial">{first}</span>
        {second && <span className="inner-circle-search__user__result__initials__initial">{second}</span>}
      </div>
    </div>
  );
};

const AvatarPhoto = ({ avatar, added }) => (
  <div
    className={`inner-circle-search__user__result__circle${
      added ? " inner-circle-search__user__result__initials--added" : ""
    }`}
  >
    <img className="member-listing__photo" src={`/uploads/coverage-map/avatars/${avatar}`} alt="" />
  </div>
);

const NetworkMembers = () => {
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  const networkMembers = useSelector(state => state.network.networkMembers);
  const pendingInvites = useSelector(state => state.network.pendingInvites);
  const cls = disableAnimation ? "animation-disabled" : "animate-in";

  return (
    <div className="inner-circle__section-wrapper">
      {pendingInvites.count > 0 && (
        // Always "animation-disabled" (full opacity, no delay) rather than
        // `cls`: unlike "Your Network" below (mounted once, at page load,
        // when the 2800ms-delayed fade-in is tuned to fire after the map
        // settles), this section only enters the DOM the first time a
        // visitor sends an invite — whenever that happens to be. Inheriting
        // the same page-load-tuned delay made it look stalled for ~3s after
        // every first invite.
        <div className={`${classify("inner-circle__section", { "members": true })} animation-disabled`}>
          <div className="inner-circle__section__title-wrapper">
            <h2 className="inner-circle__section__title">
              Pending Invites
              <span className="inner-circle__section__count">{pendingInvites.count}</span>
            </h2>
          </div>

          <div className="inner-circle__section__list">
            {pendingInvites.results.map(invite => (
              <div className={classify("inner-circle__member", { "invite-added": invite.new })} key={invite.id}>
                <div className="member-listing member-listing--network-referral-member">
                  <div className="member-listing__wrapper">
                    <InitialsCircle fullName={invite.full_name} added={true} />
                    <div className="member-listing__rows">
                      <div className="member-listing__row member-listing__row--top">
                        <h3 className="member-listing__name">{invite.full_name}</h3>
                        <span className="inner-circle__type inner-circle__type--pending">Invite Sent</span>
                      </div>
                      <div className="member-listing__row member-listing__row--bottom">
                        <span className="member-listing__stat">{invite.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`${classify("inner-circle__section", { "members": true })} ${cls}`}>
        <div className="inner-circle__section__title-wrapper">
          <h2 className="inner-circle__section__title">
            Your Network
            <span className="inner-circle__section__count">{networkMembers.count}</span>
          </h2>
        </div>

        <div className="inner-circle__section__list">
          {networkMembers.results.map(member => (
            <div className={classify("inner-circle__member", { "invite-added": member.new })} key={member.user_id}>
              <div className="member-listing member-listing--network-member">
                <div className="member-listing__wrapper">
                  <AvatarPhoto avatar={member.avatar} added={!!member.new} />
                  <div className="member-listing__rows">
                    <div className="member-listing__row member-listing__row--top">
                      <h3 className="member-listing__name">{member.full_name}</h3>
                      {member.new && <span className="inner-circle__type inner-circle__type--signed">Just Added</span>}
                    </div>
                    <div className="member-listing__row member-listing__row--bottom">
                      <span className="member-listing__stat">{member.practice_states.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetworkMembers;
