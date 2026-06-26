import { cn } from '@/lib/utils';
import type { SEPARATOR_DATA, SEPARATOR_STYLE, SEPARATOR_SIZE } from '@/lib/types';

const SIZE_MAP: Record<SEPARATOR_SIZE, string> = {
  xs: 'py-2',
  sm: 'py-4',
  md: 'py-8',
  lg: 'py-12',
  xl: 'py-16',
};


const BORDER_STYLE_MAP: Partial<Record<SEPARATOR_STYLE, React.CSSProperties['borderStyle']>> = {
  line: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
};

const Separator = (data: SEPARATOR_DATA) => {
  const { style = 'blank', size = 'md', color = '#e5e7eb', label, hideOnMobile = false, hideOnDesktop = false } = data;
  const hasLine = style !== 'blank';

  return (
    <div
      role="separator"
      aria-hidden={!label}
      aria-label={label}
      className={cn(
        'w-full',
        SIZE_MAP[size],
        hideOnMobile && 'hidden md:block',
        hideOnDesktop && 'block md:hidden',
      )}
    >
      {hasLine && (
        <div className="relative flex items-center">
          <hr
            className="w-full border-t"
            style={{
              borderColor: color,
              borderStyle: BORDER_STYLE_MAP[style],
            }}
          />
          {label && (
            <span
              className="absolute left-1/2 -translate-x-1/2 bg-white px-4 text-sm text-gray-400"
              style={{ color }}
            >
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Separator;