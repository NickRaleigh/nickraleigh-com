import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "../redux/store";
import { addUserToNetworkAction, addMyNetworkMemberInviteAction } from "../redux/actions/network";
import { platformAttorneys } from "./platformAttorneys";
import Toast from "./Toast";

// Mock latency, standing in for a real request, so adding a result or
// sending an invite still shows the brief "adding"/"inviting" state.
const MOCK_LATENCY_MS = 450;

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Pool and networkStates both key attorneys by full_name, which is enough
// to dedupe since this mock data never has two attorneys sharing a name.
function isInNetwork(attorney, networkStates) {
  const existing = networkStates[attorney.state];
  return !!existing && existing.some(a => a.full_name === attorney.full_name);
}

const EnvelopeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="2.5" y="5" width="19" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M3.5 6.5 12 13l8.5-6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ==========================================================================
   SearchBar/index.jsx
   --------------------------------------------------------------------------
   Ported from the original InnerCircle/SearchBar. The real one pinned an
   invite option above the results the whole time you're typing, not just
   when nothing matched, so "Invite {name}" was always the first option.
   Kept that here: the invite row sits above results for as long as
   there's a query, expands into an email field once selected, and
   submits through addMyNetworkMemberInviteAction.

   Dropped: the live profile search API (platformAttorneys.js stands in),
   the email/name field swap, and the promo/redeem-funds column (a
   separate feature, unrelated to search or the map).

   Added: ARIA combobox semantics and keyboard nav over the results list.
   The original's results were mouse-only. "Reset demo" (../index.jsx's
   DemoControls) has no production equivalent either.
   ========================================================================== */

const SearchBar = () => {
  const dispatch = useDispatch();
  const disableAnimation = useSelector(state => state.network.disableAnimation);
  const networkStates = useSelector(state => state.network.networkStates);

  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [addingId, setAddingId] = useState(null);

  const [inviteSelected, setInviteSelected] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitingUser, setInvitingUser] = useState(false);

  const [toastMessage, setToastMessage] = useState(null);

  const inputRef = useRef(null);
  const inviteEmailRef = useRef(null);
  const containerRef = useRef(null);
  const listboxId = useId();

  // Only flagged once there's something to be wrong about, so the field
  // doesn't open already showing a red border before anyone's typed.
  const emailInvalid = inviteEmail.length > 0 && !isValidEmail(inviteEmail);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return platformAttorneys
      .filter(a => !isInNetwork(a, networkStates))
      .filter(a => a.full_name.toLowerCase().includes(q) || a.state.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, networkStates]);

  const open = focused && query.trim().length > 0;

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Focus the revealed email field the moment the invite form is selected,
  // same as the original's own effect on inviteFormSelected.
  useEffect(() => {
    if (inviteSelected && inviteEmailRef.current) {
      inviteEmailRef.current.focus();
    }
  }, [inviteSelected]);

  function resetSearch() {
    setQuery("");
    setInviteSelected(false);
    setInviteEmail("");
  }

  function handleChange(e) {
    setQuery(e.target.value.replace(/\s+/g, " "));
    setInviteSelected(false);
    setInviteEmail("");
  }

  // Tracked on the whole container (React's onFocus/onBlur bubble, same as
  // native focusin/focusout) rather than on the main input alone: focus
  // moves from the main input to the invite form's own email field once
  // it's revealed, and that's still "open", not a close.
  function handleContainerFocus() {
    setFocused(true);
  }

  function handleContainerBlur(e) {
    if (!containerRef.current || !containerRef.current.contains(e.relatedTarget)) {
      setFocused(false);
    }
  }

  function addAttorney(attorney) {
    setAddingId(attorney.id);
    window.setTimeout(() => {
      dispatch(addUserToNetworkAction(attorney));
      setToastMessage(`Added ${attorney.full_name} · ${attorney.state}`);
      setAddingId(null);
      resetSearch();
      inputRef.current?.focus();
    }, MOCK_LATENCY_MS);
  }

  function submitInvite(e) {
    e.preventDefault();
    if (!isValidEmail(inviteEmail)) return;
    const fullName = query.trim();
    setInvitingUser(true);
    window.setTimeout(() => {
      dispatch(addMyNetworkMemberInviteAction({ fullName, email: inviteEmail.trim() }));
      setToastMessage(`Invite sent to ${fullName}`);
      setInvitingUser(false);
      resetSearch();
      inputRef.current?.focus();
    }, MOCK_LATENCY_MS);
  }

  function handleKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown" && results.length > 0) {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp" && results.length > 0) {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0) {
        addAttorney(results[activeIndex]);
      } else {
        setInviteSelected(true);
      }
    } else if (e.key === "Escape") {
      resetSearch();
    }
  }

  const activeId = open && results.length > 0 ? `${listboxId}-option-${activeIndex}` : undefined;

  return (
    <div
      ref={containerRef}
      className={`coverage-map__search ${disableAnimation ? "animation-disabled" : "animate-in"} ${open ? "coverage-map__search--active" : ""}`}
      onFocus={handleContainerFocus}
      onBlur={handleContainerBlur}
    >
      <div className="coverage-map__search__field">
        <input
          ref={inputRef}
          className="coverage-map__search__input"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeId}
          aria-autocomplete="list"
          placeholder="Enter any attorney's name"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>

      {open && (
        <div className="coverage-map__search__results">
          <form
            className={`coverage-map__search__invite${invitingUser ? " coverage-map__search__invite--adding" : ""}`}
            onSubmit={submitInvite}
          >
            {/* onMouseDown preventDefault keeps focus on the main input
                through this click, so selecting the invite row doesn't blur
                the search field and collapse the dropdown out from under
                it. Scoped to this row, not the whole form, so the email
                field and submit button below keep normal click behavior. */}
            <div
              className="coverage-map__search__invite__row"
              onMouseDown={e => e.preventDefault()}
              onClick={() => setInviteSelected(true)}
            >
              <div className="coverage-map__search__invite__avatar">
                {query.trim().split(" ").slice(0, 2).map((word, i) => (
                  <span key={i} className="coverage-map__search__invite__avatar__initial">{word[0]?.toUpperCase()}</span>
                ))}
              </div>
              <span className="coverage-map__search__invite__name">Invite {query.trim()}</span>
            </div>
            {inviteSelected && (
              <div className="coverage-map__search__invite__footer">
                <input
                  ref={inviteEmailRef}
                  className={`coverage-map__search__invite__email${emailInvalid ? " coverage-map__search__invite__email--invalid" : ""}`}
                  type="email"
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder={`${query.trim()}'s email address`}
                  aria-label={`${query.trim()}'s email address`}
                  aria-invalid={emailInvalid}
                />
                <button
                  type="submit"
                  className="coverage-map__search__invite__button"
                  disabled={!isValidEmail(inviteEmail) || invitingUser}
                  aria-label={`Send invite to ${query.trim()}`}
                >
                  <EnvelopeIcon />
                </button>
              </div>
            )}
          </form>

          {results.length > 0 && (
            <div className="coverage-map__search__result-list" role="listbox" id={listboxId}>
              {results.map((attorney, i) => {
                const active = i === activeIndex;
                const adding = addingId === attorney.id;
                return (
                  <div
                    key={attorney.id}
                    id={`${listboxId}-option-${i}`}
                    role="option"
                    aria-selected={active}
                    className={`coverage-map__search__result${active ? " coverage-map__search__result--active" : ""}${adding ? " coverage-map__search__result--adding" : ""}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={e => e.preventDefault()}
                    onClick={() => addAttorney(attorney)}
                  >
                    <img
                      className="coverage-map__search__result__avatar"
                      src={`/uploads/coverage-map/avatars/${attorney.avatar}`}
                      alt=""
                    />
                    <span className="coverage-map__search__result__text">
                      <span className="coverage-map__search__result__name">{attorney.full_name}</span>
                      <span className="coverage-map__search__result__state">{attorney.state}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <Toast message={toastMessage} onDismiss={() => setToastMessage(null)} />
    </div>
  );
};

export default SearchBar;
