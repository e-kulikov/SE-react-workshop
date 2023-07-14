import { act } from 'react-dom/test-utils';
import { createRoot, Root } from 'react-dom/client';

let container: HTMLDivElement | null;
let root: Root;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
});

afterEach(() => {
  if (!container) return;

  act(() => root.unmount());
  container.remove();
  container = null;
});

export const renderHook = <T extends (...args: any[]) => any>(
  hook: T,
  args: Parameters<T>
) => {
  let result: { current?: ReturnType<typeof hook> } = {};
  const TestComponent = ({
    hookArgs,
    useHook,
  }: {
    hookArgs: typeof args;
    useHook: typeof hook;
  }) => {
    result.current = useHook(...hookArgs);
    return null;
  };

  act(() => {
    root.render(<TestComponent useHook={hook} hookArgs={args} />);
  });

  return { result };
};
