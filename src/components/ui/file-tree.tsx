import { FileTreeNode, flattenFileTree } from '@/lib/file-tree';

export type { FileTreeNode } from '@/lib/file-tree';

interface FileTreeProps {
  root: FileTreeNode;
  /** Accessible summary, the tree itself is visual. */
  label: string;
  className?: string;
}

/**
 * File tree drawing with dotted leaders to notes (moodboard .tree).
 * Only show folders from the approved list in .claude/memory.md (Positivliste).
 * Below 640px leaders and notes are hidden, as in the mobile hero draft.
 */
export function FileTree({ root, label, className = '' }: FileTreeProps) {
  const rows = flattenFileTree(root);

  return (
    <div
      role="img"
      aria-label={label}
      className={`grid overflow-x-auto font-mono-brand text-[12.5px] leading-[1.7] sm:text-[15px] sm:leading-[1.75] ${className}`}
    >
      {rows.map((row, index) => (
        <div key={index} className="flex min-w-0 items-baseline gap-2">
          <span className="whitespace-pre">
            {row.prefix}
            <span className={row.isDir ? 'font-medium text-brand-blue' : ''}>{row.name}</span>
          </span>
          {row.note && (
            <>
              <span className="hidden min-w-4 flex-1 -translate-y-1 border-b border-dotted border-[#9AA3BD] sm:block" />
              <span className="hidden font-text text-sm whitespace-nowrap text-ink-2 sm:inline">
                {row.note}
              </span>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
