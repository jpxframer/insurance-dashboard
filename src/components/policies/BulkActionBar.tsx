import { bulkActions } from "@/lib/policies";

/** The blue bar the frame shows above the table while rows are selected. */
export function BulkActionBar({
  count,
  onDeselect,
}: {
  count: number;
  onDeselect: () => void;
}) {
  return (
    <div
      role="toolbar"
      aria-label="Bulk actions"
      className="flex w-full items-center gap-3 rounded-[10px] bg-blue-700 px-3.5 py-2"
    >
      <span className="text-[12.5px] font-semibold whitespace-nowrap text-white">
        {count} selected
      </span>

      <span aria-hidden className="h-4 w-px bg-white/20" />

      {bulkActions.items.map((action) => (
        <button
          key={action}
          type="button"
          className="text-[12.5px] font-medium whitespace-nowrap text-slate-100 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {action}
        </button>
      ))}

      <button
        type="button"
        className="text-[12.5px] font-medium whitespace-nowrap text-red-300 hover:text-red-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {bulkActions.destructive}
      </button>

      <button
        type="button"
        onClick={onDeselect}
        className="ml-auto text-[12.5px] whitespace-nowrap text-slate-100 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        {bulkActions.deselect}
      </button>
    </div>
  );
}
