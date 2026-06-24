import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAsync, useAsyncList } from './useAsync';

describe('useAsync', () => {
  it('should initialize with loading false and no data', async () => {
    const { result } = renderHook(() => useAsync<string>());

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('should initialize with provided data', () => {
    const { result } = renderHook(() => useAsync<string>('initial'));

    expect(result.current.data).toBe('initial');
    expect(result.current.error).toBeNull();
  });

  it('should execute async function and update state', async () => {
    const { result } = renderHook(() => useAsync<string>());
    const asyncFn = vi.fn(async () => 'success');

    await act(async () => {
      await result.current.execute(asyncFn);
    });

    expect(result.current.data).toBe('success');
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it('should reset state', () => {
    const { result } = renderHook(() => useAsync<string>('initial'));

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });
});

describe('useAsyncList', () => {
  it('should initialize with empty list', () => {
    const { result } = renderHook(() => useAsyncList<string>());

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should load list data', async () => {
    const { result } = renderHook(() => useAsyncList<string>());
    const items = ['a', 'b', 'c'];
    const asyncFn = vi.fn(async () => items);

    await act(async () => {
      await result.current.load(asyncFn);
    });

    expect(result.current.data).toEqual(items);
    expect(result.current.error).toBeNull();
  });

  it('should append items to list', () => {
    const { result } = renderHook(() => useAsyncList<string>());

    act(() => {
      result.current.append(['a', 'b']);
    });

    act(() => {
      result.current.append(['c']);
    });

    expect(result.current.data).toEqual(['a', 'b', 'c']);
  });

  it('should reset list', () => {
    const { result } = renderHook(() => useAsyncList<string>());

    act(() => {
      result.current.append(['a', 'b']);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toEqual([]);
  });
});
