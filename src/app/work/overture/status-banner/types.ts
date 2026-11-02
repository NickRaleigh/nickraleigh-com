/* ==========================================================================
   types.ts
   --------------------------------------------------------------------------
   Shared shapes for the status-banner demo (right column of the "Rules vs.
   a model, live" section). Ported from nr-symfony's
   public/js/status-banner/types.ts, where these lived as ambient globals
   because every file there loaded as a plain <script>. This project is a
   real module graph, so they're ordinary exported types instead.
   ========================================================================== */

export type PostingState = "open" | "pending" | "signed" | "closed";

export interface ReferralStats {
  state: PostingState;
  isDirect: boolean;
  postedAt: Date | string | null;
  viewCount: number;
  responseCount: number;
  lastResponseAt: Date | string | null;
  ownerHasResponded: boolean;
  lastOwnerMessageAt: Date | string | null;
}

export interface ViewerProfile {
  id: string;
  name: string;
  practiceAreas: string[];
  pastCaseTypes: string[];
}

export interface Viewer {
  isOwner: boolean;
  hasApplied: boolean;
  profile: ViewerProfile;
}

export type BannerKey =
  | "new"
  | "competitive"
  | "trending"
  | "reviewing"
  | "underperforming";

export type BannerState = "loading" | "streaming" | "done" | "error";

export interface Matter {
  id: string;
  practiceArea: string;
  state: string; // jurisdiction, e.g. "Texas"; unrelated to ReferralStats.state
  description: string;
  feeSplit: string; // e.g. "30/70"
}

// Anything helpers.ts's date functions accept.
export type DateLike = Date | string | number | null | undefined;
