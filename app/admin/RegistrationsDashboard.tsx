"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AlertTriangle, ChevronDown, Download, LogOut, Search } from "lucide-react";
import { toast, Toaster } from "sonner";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { packageAmount } from "@/app/(site)/register/packages";
import {
  EXPERIENCE_LABELS,
  PACKAGE_LABELS,
  PACKAGE_SHORT_LABELS,
  SESSION_LABELS,
  SESSION_SHORT_LABELS,
  labelFor,
} from "@/app/(site)/register/labels";
import { setStatus, signOut } from "./actions";
import {
  formatBirr,
  inView,
  matchesSearch,
  sortForView,
  type ViewKey,
} from "./filtering";
import type { PaymentStatus, Registration } from "./types";

const VIEWS: { key: ViewKey; label: string }[] = [
  { key: "attention", label: "Needs attention" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Paid" },
  { key: "cancelled", label: "Cancelled" },
  { key: "all", label: "All" },
];

const STATUS_ORDER: PaymentStatus[] = ["pending", "confirmed", "cancelled"];

const STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  confirmed: "Paid",
  cancelled: "Cancelled",
};

const STATUS_TRIGGER: Record<PaymentStatus, string> = {
  pending:
    "border-[color:var(--ks-gold-deep)]/40 bg-[color:var(--ks-gold)]/20 text-[color:var(--ks-gold-deep)]",
  confirmed:
    "border-[color:var(--ks-teal)]/40 bg-[color:var(--ks-teal)]/15 text-[color:var(--ks-teal)]",
  cancelled: "border-border bg-muted text-muted-foreground",
};

const MOBILE_QUERY = "(max-width: 639px)";

/**
 * useSyncExternalStore rather than an effect: it gives a correct value on the
 * first client render and avoids a setState-in-effect cascade.
 */
function useIsMobile(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(MOBILE_QUERY);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}

function formatDay(ms: number): string {
  const date = new Date(ms);
  const today = new Date();
  const sameDay =
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  return date.toLocaleString("en-GB", {
    ...(sameDay
      ? { hour: "2-digit", minute: "2-digit" }
      : { day: "2-digit", month: "short" }),
    timeZone: "Africa/Addis_Ababa",
  });
}

function formatFull(ms: number): string {
  return new Date(ms).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Africa/Addis_Ababa",
  });
}

/**
 * Current status doubles as the trigger for an explicit "change status"
 * menu — one compact control instead of three competing buttons, which also
 * stops the third option being clipped on narrow screens.
 */
function StatusMenu({
  row,
  onChange,
  className,
}: {
  row: Registration;
  onChange: (next: PaymentStatus) => void;
  className?: string;
}) {
  // Non-modal: a modal menu renders an inert backdrop, which blocks its own
  // items when the menu is opened from inside the detail dialog.
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        aria-label={`Payment status for ${row.fullName}: ${STATUS_LABELS[row.paymentStatus]}. Change it.`}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-semibold transition hover:brightness-95",
          STATUS_TRIGGER[row.paymentStatus],
          className,
        )}
      >
        {STATUS_LABELS[row.paymentStatus]}
        <ChevronDown aria-hidden="true" className="size-3 opacity-60" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        onClick={(event) => event.stopPropagation()}
      >
        {/* The label is Base UI's GroupLabel, which throws unless it sits
            inside a Group. */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>Change status</DropdownMenuLabel>
          <DropdownMenuRadioGroup
            value={row.paymentStatus}
            onValueChange={(value) => onChange(value as PaymentStatus)}
          >
            {STATUS_ORDER.map((option) => (
              <DropdownMenuRadioItem key={option} value={option}>
                {STATUS_LABELS[option]}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-0.5 break-words">{children}</dd>
    </div>
  );
}

/** Shared by the desktop side sheet and the mobile dialog. */
function DetailBody({
  row,
  onChangeStatus,
}: {
  row: Registration;
  onChangeStatus: (next: PaymentStatus) => void;
}) {
  return (
    <div className="space-y-4 px-4 pb-4 text-sm">
      <div className="flex flex-col gap-1 text-sm">
        <a
          href={`mailto:${row.email}`}
          className="break-all text-primary underline-offset-2 hover:underline"
        >
          {row.email}
        </a>
        <a
          href={`tel:${row.phone.replace(/[^\d+]/g, "")}`}
          className="tabular-nums text-primary underline-offset-2 hover:underline"
        >
          {row.phone}
        </a>
      </div>

      {!row.confirmationEmailSent && (
        <Badge variant="destructive" className="w-fit gap-1">
          <AlertTriangle aria-hidden="true" className="size-3" />
          Confirmation email never sent
        </Badge>
      )}

      <Separator />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <StatusMenu row={row} onChange={onChangeStatus} className="px-2.5 py-1.5 text-sm" />
        <span className="font-display text-lg font-bold whitespace-nowrap tabular-nums">
          {formatBirr(packageAmount(row.packageId))} ETB
        </span>
      </div>

      <Separator />

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Package">{labelFor(PACKAGE_LABELS, row.packageId)}</Field>
        </div>
        <Field label="Session">
          {labelFor(SESSION_LABELS, row.sessionPreference)}
        </Field>
        <Field label="City">{row.city}</Field>
        <div className="sm:col-span-2">
          <Field label="Experience">
            {labelFor(EXPERIENCE_LABELS, row.experience)}
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Business idea">
            <span className="leading-relaxed">{row.businessIdea}</span>
          </Field>
        </div>
        {row.background && (
          <div className="sm:col-span-2">
            <Field label="Background">
              <span className="leading-relaxed">{row.background}</span>
            </Field>
          </div>
        )}
      </dl>

      <p className="border-t border-border pt-2 text-xs leading-relaxed text-muted-foreground">
        Registered {formatFull(row._creationTime)}.
        {row.reviewedBy &&
          row.reviewedAt &&
          ` Last updated by ${row.reviewedBy} on ${formatFull(row.reviewedAt)}.`}
      </p>
    </div>
  );
}

export function RegistrationsDashboard({
  initialRows,
  adminEmail,
  truncated,
}: {
  initialRows: Registration[];
  adminEmail: string;
  truncated: boolean;
}) {
  // After mount this list is authoritative: status changes patch it directly
  // rather than refetching every registration on each click.
  const [rows, setRows] = useState(initialRows);
  const [view, setView] = useState<ViewKey>("attention");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

  // "/" focuses search from anywhere, as in most review tools.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (event.key === "/" && !typing) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const counts = useMemo(
    () =>
      VIEWS.reduce<Record<string, number>>((acc, entry) => {
        acc[entry.key] = rows.filter((row) => inView(row, entry.key)).length;
        return acc;
      }, {}),
    [rows],
  );

  const visible = useMemo(() => {
    const filtered = rows.filter(
      (row) => inView(row, view) && matchesSearch(row, query),
    );
    return sortForView(filtered, view);
  }, [rows, view, query]);

  const totals = useMemo(() => {
    let outstanding = 0;
    let collected = 0;
    for (const row of visible) {
      const amount = packageAmount(row.packageId);
      if (row.paymentStatus === "confirmed") collected += amount;
      else if (row.paymentStatus === "pending") outstanding += amount;
    }
    return { outstanding, collected };
  }, [visible]);

  const patch = useCallback((id: string, changes: Partial<Registration>) => {
    setRows((current) =>
      current.map((row) => (row._id === id ? { ...row, ...changes } : row)),
    );
  }, []);

  const changeStatus = useCallback(
    async (row: Registration, next: PaymentStatus) => {
      if (next === row.paymentStatus) return;
      const previous = row.paymentStatus;
      patch(row._id, { paymentStatus: next });

      const result = await setStatus(row._id, next);
      if (!result.ok) {
        patch(row._id, { paymentStatus: previous });
        toast.error(result.message ?? "Couldn't save that change.");
        return;
      }

      // Undo instead of a confirm dialog: marking is one click, and the rare
      // mistake is cheap to reverse.
      toast(`${row.fullName} — ${STATUS_LABELS[next]}`, {
        action: {
          label: "Undo",
          onClick: () => {
            patch(row._id, { paymentStatus: previous });
            void setStatus(row._id, previous);
          },
        },
      });
    },
    [patch],
  );

  const selected = rows.find((row) => row._id === openId) ?? null;
  const exportHref = `/admin/export?view=${view}${query ? `&q=${encodeURIComponent(query)}` : ""}`;
  const closeDetail = () => setOpenId(null);

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Pinned light: there is no ThemeProvider, so useTheme() would report
          "system" and render dark toasts on a dark-mode OS. */}
      <Toaster position="bottom-center" theme="light" />

      <header className="sticky top-0 z-20 border-b border-[color:var(--ks-navy-deep)] bg-[color:var(--ks-navy)] text-white">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-2 md:h-14 md:flex-nowrap md:gap-3 md:py-0">
          <span className="font-display text-sm font-bold whitespace-nowrap">
            BCaD · Registrations
          </span>

          {/* Full-width on its own row on phones; inline on desktop. */}
          <div className="relative order-last w-full md:order-none md:ml-2 md:w-auto md:max-w-md md:flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-white/50"
            />
            <Input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search name, phone or email…"
              aria-label="Search registrations"
              className="h-9 border-white/20 bg-white/10 pl-8 text-white placeholder:text-white/50 focus:border-white/50"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={exportHref}
              className={buttonVariants({
                variant: "outline",
                size: "sm",
                className:
                  "border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white",
              })}
            >
              <Download aria-hidden="true" />
              CSV
            </a>
            <span className="hidden text-xs text-white/60 lg:inline">
              {adminEmail}
            </span>
            <form action={signOut}>
              <Button
                type="submit"
                variant="ghost"
                size="icon-sm"
                aria-label="Sign out"
                className="text-white/70 hover:bg-white/10 hover:text-white"
              >
                <LogOut aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-4 py-4">
        {/* Counts live on the filter chips, so the numbers and the control
            that uses them are the same widget. */}
        <nav aria-label="Filter registrations" className="flex flex-wrap gap-1.5">
          {VIEWS.map((entry) => {
            const active = entry.key === view;
            return (
              <button
                key={entry.key}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => setView(entry.key)}
                className={`rounded-md border px-3 py-1.5 text-sm font-semibold transition ${
                  active
                    ? "border-[color:var(--ks-navy)] bg-[color:var(--ks-navy)] text-white"
                    : "border-border bg-white text-[color:var(--ks-navy)] hover:bg-muted"
                }`}
              >
                {entry.label}
                <span
                  className={`ml-1.5 tabular-nums ${active ? "text-white/70" : "text-muted-foreground"}`}
                >
                  {counts[entry.key] ?? 0}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Phones get cards, not the table: at 390px the horizontal scroll
            pushed the payment control off-screen. */}
        <div className="mt-3 space-y-2 md:hidden">
          {visible.map((row) => (
            <div
              key={row._id}
              className="rounded-md border border-border bg-white p-3"
            >
              <button
                type="button"
                onClick={() => setOpenId(row._id)}
                className="flex w-full items-start justify-between gap-3 text-left"
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <span className="truncate">{row.fullName}</span>
                    {!row.confirmationEmailSent && (
                      <AlertTriangle
                        aria-label="Confirmation email did not send"
                        className="size-3.5 shrink-0 text-destructive"
                      />
                    )}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted-foreground">
                    {labelFor(PACKAGE_SHORT_LABELS, row.packageId)} ·{" "}
                    {labelFor(SESSION_SHORT_LABELS, row.sessionPreference)} ·{" "}
                    {formatDay(row._creationTime)}
                  </span>
                </span>
                <span className="shrink-0 font-display font-bold tabular-nums">
                  {formatBirr(packageAmount(row.packageId))}
                </span>
              </button>

              <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`tel:${row.phone.replace(/[^\d+]/g, "")}`}
                  className="text-sm tabular-nums text-primary underline-offset-2"
                >
                  {row.phone}
                </a>
                <StatusMenu
                  row={row}
                  onChange={(next) => void changeStatus(row, next)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 hidden overflow-hidden rounded-md border border-border bg-white md:block">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="h-9 w-full">Name</TableHead>
                <TableHead className="h-9 w-[110px]">Package</TableHead>
                <TableHead className="h-9 w-[104px] text-right">
                  Amount ETB
                </TableHead>
                <TableHead className="hidden h-9 w-[92px] xl:table-cell">
                  Session
                </TableHead>
                <TableHead className="hidden h-9 w-[150px] lg:table-cell">
                  Phone
                </TableHead>
                <TableHead className="h-9 w-[72px] text-right">Recv</TableHead>
                <TableHead className="h-9 w-[130px]">Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map((row) => (
                <TableRow
                  key={row._id}
                  onClick={() => setOpenId(row._id)}
                  className="cursor-pointer"
                >
                  <TableCell className="py-1.5 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="truncate">{row.fullName}</span>
                      {!row.confirmationEmailSent && (
                        <AlertTriangle
                          aria-label="Confirmation email did not send"
                          className="size-3.5 shrink-0 text-destructive"
                        />
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="py-1.5 text-muted-foreground">
                    {labelFor(PACKAGE_SHORT_LABELS, row.packageId)}
                  </TableCell>
                  <TableCell className="py-1.5 text-right font-semibold tabular-nums">
                    {formatBirr(packageAmount(row.packageId))}
                  </TableCell>
                  <TableCell className="hidden py-1.5 text-muted-foreground xl:table-cell">
                    {labelFor(SESSION_SHORT_LABELS, row.sessionPreference)}
                  </TableCell>
                  <TableCell className="hidden py-1.5 tabular-nums text-muted-foreground lg:table-cell">
                    {row.phone}
                  </TableCell>
                  <TableCell className="py-1.5 text-right text-muted-foreground tabular-nums">
                    {formatDay(row._creationTime)}
                  </TableCell>
                  <TableCell className="py-1.5">
                    <StatusMenu
                      row={row}
                      onChange={(next) => void changeStatus(row, next)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {visible.length === 0 && (
          <p className="mt-3 rounded-md border border-border bg-white px-4 py-10 text-center text-sm text-muted-foreground">
            {query
              ? `Nothing matches “${query}”.`
              : view === "attention"
                ? "Nothing needs attention — every registration is settled."
                : "No registrations here yet."}
          </p>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-md border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground md:mt-0 md:rounded-t-none md:border-t-0">
          <span>
            {visible.length} row{visible.length === 1 ? "" : "s"}
          </span>
          {totals.outstanding > 0 && (
            <span>
              Outstanding{" "}
              <strong className="tabular-nums text-[color:var(--ks-navy)]">
                {formatBirr(totals.outstanding)} ETB
              </strong>
            </span>
          )}
          {totals.collected > 0 && (
            <span>
              Collected{" "}
              <strong className="tabular-nums text-[color:var(--ks-teal)]">
                {formatBirr(totals.collected)} ETB
              </strong>
            </span>
          )}
          {truncated && (
            <span className="text-destructive">
              Showing the 1,000 most recent only — use CSV for the full list.
            </span>
          )}
        </div>
      </div>

      {/* A centred dialog on phones, a docked side panel on desktop. The
          side panel keeps the table stationary while working a queue; on a
          phone there is no table to keep in view, so a compact popup wins. */}
      {isMobile ? (
        <Dialog open={selected !== null} onOpenChange={(open) => !open && closeDetail()}>
          <DialogContent className="max-h-[85vh] gap-0 overflow-y-auto p-0 sm:max-w-md">
            {selected && (
              <>
                <div className="px-4 pt-4 pb-3">
                  <DialogTitle className="font-display text-base">
                    {selected.fullName}
                  </DialogTitle>
                </div>
                <DetailBody
                  row={selected}
                  onChangeStatus={(next) => void changeStatus(selected, next)}
                />
              </>
            )}
          </DialogContent>
        </Dialog>
      ) : (
        <Sheet open={selected !== null} onOpenChange={(open) => !open && closeDetail()}>
          <SheetContent className="gap-0 overflow-y-auto data-[side=right]:w-full data-[side=right]:sm:max-w-md">
            {selected && (
              <>
                <SheetHeader className="pb-3">
                  <SheetTitle className="font-display text-lg">
                    {selected.fullName}
                  </SheetTitle>
                </SheetHeader>
                <DetailBody
                  row={selected}
                  onChangeStatus={(next) => void changeStatus(selected, next)}
                />
              </>
            )}
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
