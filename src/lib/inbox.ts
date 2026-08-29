/**
 * Mock content for the Inbox screen.
 *
 * Transcribed from Figma `22780-917` (desktop) and `22780-1226` (mobile).
 * Same contract as `./data.ts`, `./policies.ts` and `./claims.ts` — swap it for
 * real API calls without touching a component.
 *
 * The two frames are not the same content at two widths. Desktop is a message
 * list beside one open thread; mobile is the list alone, as cards, with no
 * thread designed at all. Where the two disagree the difference is carried in
 * the data rather than papered over:
 *
 * - `preview` is the desktop row's snippet, `mobilePreview` the card's. Three
 *   messages word them differently, and the two read messages drop the line
 *   entirely on mobile — hence the optional field.
 * - Avatars exist only on mobile. Desktop rows are name-first with no tile.
 */

/** Tag chip on a message. INTERNAL is unbordered and a shade tighter. */
export type InboxTagTone = "claim" | "renewal" | "internal";

export type InboxTag = {
  label: string;
  tone: InboxTagTone;
};

/** Avatar tile colour. Mobile only — the desktop list has no tiles. */
export type InboxAvatarTone = "amber" | "blue" | "slate";

export type InboxMessage = {
  id: string;
  sender: string;
  /** Initials for the mobile avatar tile; System takes a glyph instead. */
  initials: string;
  avatarTone: InboxAvatarTone;
  /** True for the System row, which shows a dashed-circle glyph, not initials. */
  systemAvatar?: boolean;
  time: string;
  subject: string;
  /** Desktop row snippet. */
  preview: string;
  /** Mobile card snippet; omitted where the card shows none. */
  mobilePreview?: string;
  unread: boolean;
  tag?: InboxTag;
  /** Mono reference beside the tag. INTERNAL carries none. */
  reference?: string;
};

export const inboxPage = {
  title: "Inbox",
  markAllRead: "Mark all read",
  mobileMeta: "14 unread",
  searchPlaceholder: "Search messages…",
  filters: [
    { id: "unread", label: "Unread · 14" },
    { id: "all", label: "All" },
    { id: "claims", label: "Claims" },
    { id: "renewals", label: "Renewals" },
  ],
};

export const inboxMessages: InboxMessage[] = [
  {
    id: "msg-1",
    sender: "Marcus Johnson",
    initials: "MJ",
    avatarTone: "amber",
    time: "9:41 AM",
    subject: "Re: Claim CLM-8241 — repair timeline?",
    preview:
      "Hi Sarah, the body shop says they can start Monday if the claim is approved by…",
    mobilePreview:
      "The body shop says they can start Monday if the claim is approved by Friday…",
    unread: true,
    tag: { label: "CLAIM", tone: "claim" },
    reference: "CLM-8241",
  },
  {
    id: "msg-2",
    sender: "Hartwell Logistics",
    initials: "HL",
    avatarTone: "blue",
    time: "8:55 AM",
    subject: "Renewal quote — fleet expansion",
    preview:
      "We're adding 4 vehicles to the fleet before the July 29 renewal. Can you requote…",
    mobilePreview:
      "We're adding 4 vehicles to the fleet before the July 29 renewal. Can you requote…",
    unread: true,
    tag: { label: "RENEWAL", tone: "renewal" },
    reference: "POL-20441",
  },
  {
    id: "msg-3",
    sender: "Dana Ortiz",
    initials: "DO",
    avatarTone: "amber",
    time: "Yesterday",
    subject: "Handoff before PTO — open caseload",
    preview:
      "I've flagged 5 claims that need attention while I'm out Aug 3–7. CLM-8241 should…",
    mobilePreview: "I've flagged 5 claims that need attention while I'm out Aug 3–7…",
    unread: true,
    tag: { label: "INTERNAL", tone: "internal" },
  },
  {
    id: "msg-4",
    sender: "Aisha Bello",
    initials: "AB",
    avatarTone: "slate",
    time: "Yesterday",
    subject: "Uploaded requested documents",
    preview: "I've attached the itemized bill and the referral letter you asked for…",
    unread: false,
  },
  {
    id: "msg-5",
    sender: "System",
    initials: "SY",
    avatarTone: "slate",
    systemAvatar: true,
    time: "Jul 25",
    subject: "Weekly digest — 64 renewals due",
    preview: "Renewals this week total $412K in premium. 23 have no assigned agent…",
    unread: false,
  },
];

/** A bubble in a thread. `draft` is an unsent reply of Sarah's. */
export type ThreadMessage = {
  id: string;
  author: string;
  initials: string;
  avatarTone: InboxAvatarTone;
  /** "Today · 9:41 AM" on a received message, "Draft" on an unsent one. */
  meta: string;
  variant: "received" | "draft";
  /**
   * One string per paragraph. Wrapping is left to the browser — the frame's
   * line breaks are a function of its 678px bubble, not the copy. A literal
   * "\n" is a break the author wrote, as in the sign-off.
   */
  paragraphs: string[];
};

export type InboxThread = {
  subject: string;
  tag?: InboxTag;
  reference?: string;
  /** Header actions. The first varies with the tag; Archive is always last. */
  actions: string[];
  /** Desktop addressing line, which has room for the full address. */
  metaLead: string;
  /** Mobile addressing line — the address is dropped, the routing kept. */
  mobileMetaLead: string;
  metaReference?: string;
  /**
   * First name for the composer's placeholder. Absent means the thread takes no
   * reply at all: the System digest has no one to answer, so it renders no
   * composer rather than an input that goes nowhere.
   */
  replyTo?: string;
  messages: ThreadMessage[];
};

/**
 * One thread per message, keyed by message id.
 *
 * **Only `msg-1` is designed** — it is transcribed from `22780-917`, down to the
 * paragraph breaks. The other four are written to match the snippet each row
 * already showed, so that opening any message leads somewhere; they are
 * invented, and flagged as such in AGENTS.md.
 */
export const inboxThreads: Record<string, InboxThread> = {
  "msg-1": {
    subject: "Re: Claim CLM-8241 — repair timeline?",
    tag: { label: "CLAIM", tone: "claim" },
    reference: "CLM-8241",
    actions: ["Open claim", "Assign", "Archive"],
    metaLead: "Marcus Johnson <marcus.j@example.com> · to Claims team · linked to ",
    mobileMetaLead: "Marcus Johnson · to Claims team · linked to ",
    metaReference: "CLM-8241",
    replyTo: "Marcus",
    messages: [
      {
        id: "msg-1-a",
        author: "Marcus Johnson",
        initials: "MJ",
        avatarTone: "amber",
        meta: "Today · 9:41 AM",
        variant: "received",
        paragraphs: [
          "Hi Sarah,",
          "The body shop says they can start Monday if the claim is approved by Friday. Is that realistic? I'm without the car for now and the rental coverage runs out on the 5th.",
          "Thanks,\nMarcus",
        ],
      },
      {
        id: "msg-1-b",
        author: "Sarah Kim",
        initials: "SK",
        avatarTone: "blue",
        meta: "Draft",
        variant: "draft",
        paragraphs: [
          "Hi Marcus — good news: your claim is in final review and we expect a decision before Friday. Your rental coverage is confirmed through Aug 5, so timing should work out.",
        ],
      },
    ],
  },

  "msg-2": {
    subject: "Renewal quote — fleet expansion",
    tag: { label: "RENEWAL", tone: "renewal" },
    reference: "POL-20441",
    actions: ["Open policy", "Assign", "Archive"],
    metaLead: "Hartwell Logistics <ops@hartwell-logistics.com> · to Renewals · linked to ",
    mobileMetaLead: "Hartwell Logistics · to Renewals · linked to ",
    metaReference: "POL-20441",
    replyTo: "Hartwell",
    messages: [
      {
        id: "msg-2-a",
        author: "Hartwell Logistics",
        initials: "HL",
        avatarTone: "blue",
        meta: "Today · 8:55 AM",
        variant: "received",
        paragraphs: [
          "Morning Sarah,",
          "We're adding 4 vehicles to the fleet before the July 29 renewal. Can you requote the general liability line with them included? Two are box trucks, two are vans — I can send VINs today if that helps.",
          "Also worth flagging: we've moved the yard to the Portland site, so the garaging address changes.",
          "Thanks,\nDeb",
        ],
      },
    ],
  },

  "msg-3": {
    subject: "Handoff before PTO — open caseload",
    tag: { label: "INTERNAL", tone: "internal" },
    actions: ["Assign", "Archive"],
    metaLead: "Dana Ortiz <dana.o@surebase.com> · to Sarah Kim · internal",
    mobileMetaLead: "Dana Ortiz · to Sarah Kim · internal",
    replyTo: "Dana",
    messages: [
      {
        id: "msg-3-a",
        author: "Dana Ortiz",
        initials: "DO",
        avatarTone: "amber",
        meta: "Yesterday · 4:12 PM",
        variant: "received",
        paragraphs: [
          "Sarah — I've flagged 5 claims that need attention while I'm out Aug 3–7.",
          "CLM-8241 should close this week; the estimate is in line with regional averages and I'd approve at $7,920 after deductible. The other four are waiting on documents and can sit until I'm back.",
          "Everything's in the shared queue under my name. Shout if anything escalates.",
        ],
      },
    ],
  },

  "msg-4": {
    subject: "Uploaded requested documents",
    actions: ["Archive"],
    metaLead: "Aisha Bello <aisha.bello@example.com> · to Claims team",
    mobileMetaLead: "Aisha Bello · to Claims team",
    replyTo: "Aisha",
    messages: [
      {
        id: "msg-4-a",
        author: "Aisha Bello",
        initials: "AB",
        avatarTone: "slate",
        meta: "Yesterday · 11:03 AM",
        variant: "received",
        paragraphs: [
          "Hi Sarah,",
          "I've attached the itemized bill and the referral letter you asked for. Let me know if the clinic needs to send anything else over.",
          "Aisha",
        ],
      },
    ],
  },

  "msg-5": {
    subject: "Weekly digest — 64 renewals due",
    actions: ["Archive"],
    metaLead: "Surebase · automated digest · sent every Monday",
    mobileMetaLead: "Surebase · automated digest",
    messages: [
      {
        id: "msg-5-a",
        author: "System",
        initials: "SY",
        avatarTone: "slate",
        meta: "Jul 25 · 6:00 AM",
        variant: "received",
        paragraphs: [
          "Renewals this week total $412K in premium across 64 policies. 23 have no assigned agent.",
          "Commercial lines account for $310K of the total, with the four largest accounts renewing on July 29. Personal auto is flat week on week.",
          "Open the renewals board to assign the unclaimed 23.",
        ],
      },
    ],
  },
};

/** Tag chip classes, keyed by tone. INTERNAL is the unbordered one. */
export const tagToneClass: Record<InboxTagTone, string> = {
  claim: "border border-amber-200 bg-amber-50 text-amber-700",
  renewal: "border border-blue-200 bg-blue-50 text-blue-600",
  internal: "bg-slate-100 text-slate-600",
};

/** Avatar tile classes, keyed by tone. */
export const avatarToneClass: Record<InboxAvatarTone, string> = {
  amber: "bg-amber-100 text-amber-700",
  blue: "bg-blue-100 text-blue-600",
  slate: "bg-slate-100 text-slate-600",
};
