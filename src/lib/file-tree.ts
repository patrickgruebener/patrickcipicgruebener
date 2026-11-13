// Pure helpers for the file tree drawing (src/components/ui/file-tree.tsx).

export interface FileTreeNode {
  /** Folder names end with "/". */
  name: string;
  /** Short explanation, drawn after dotted leader. */
  note?: string;
  children?: FileTreeNode[];
}

export interface FileTreeRow {
  /** Box-drawing prefix such as "│   ├── ". */
  prefix: string;
  name: string;
  isDir: boolean;
  note?: string;
}

const BRANCH = '├── ';
const LAST_BRANCH = '└── ';
const PIPE = '│   ';
const SPACE = '    ';

function walk(nodes: FileTreeNode[], indent: string, rows: FileTreeRow[]): void {
  nodes.forEach((node, index) => {
    const isLast = index === nodes.length - 1;
    rows.push({
      prefix: indent + (isLast ? LAST_BRANCH : BRANCH),
      name: node.name,
      isDir: node.name.endsWith('/'),
      note: node.note,
    });
    if (node.children?.length) {
      walk(node.children, indent + (isLast ? SPACE : PIPE), rows);
    }
  });
}

/** Flattens a tree into drawable rows with box-drawing prefixes. The root has no prefix. */
export function flattenFileTree(root: FileTreeNode): FileTreeRow[] {
  const rows: FileTreeRow[] = [
    { prefix: '', name: root.name, isDir: root.name.endsWith('/'), note: root.note },
  ];
  walk(root.children ?? [], '', rows);
  return rows;
}
