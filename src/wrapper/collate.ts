/**
 * Takes an async iterator that yields interleaved items from different groups
 * and produces an iterator that yields items in group order.
 *
 * Example:
 *   Input:  A1, B1, A2, A3 (final), C1, C2, C3 (final), B2 (final)
 *   Output: A1, A2, A3, B1, B2, C1, C2, C3
 *
 * This is useful when using synthesizeJsonStreaming with num_generations > 1
 *
 * @example
 * ```typescript
 *
 * import { collate } from 'hume';
 *
 * const stream = hume.synthesizeJsonStreaming({
 *   ...
 * })
 *
 * const contiguous = collate(
 *   stream
 *   (chunk) => chunk.generationId,
 *   (chunk) => chunk.isLastChunk
 * );
 *
 * for await (const item of contiguous) {
 *   audioPlayer.write(item.audio)
 * }
 * ```
 *
 * @param source - Async iterable that yields interleaved items.
 * @param groupBy - Function to determine a "key" that determines the group identity for each item.
 * @param isFinal - Function to determine if an item is the final item in its group.
 * @returns An async iterable that yields items in group order.
 */
export async function* collate<TItem, TKey>(
    source: AsyncIterable<TItem>,
    groupBy: (x: TItem) => TKey,
    isFinal: (x: TItem) => boolean,
): AsyncIterable<TItem> {
    const buffers = new Map<TKey, TItem[]>();
    const order: TKey[] = [];
    let current: TKey | undefined;

    const ensure = (k: TKey) => {
        if (!buffers.has(k)) {
            buffers.set(k, []);
            order.push(k);
        }
    };

    const flushGroup = function* (k: TKey) {
        const buf = buffers.get(k);
        if (!buf) return;
        for (const item of buf) yield item;
        buffers.delete(k);
    };

    const nextGroup = (): TKey | undefined => {
        // pop the next group in first-seen order that still has a buffer
        while (order.length && !buffers.has(order[0])) order.shift();
        return order.shift();
    };

    for await (const item of source) {
        const k = groupBy(item);

        if (current === undefined) current = k;
        ensure(k);
        buffers.get(k)!.push(item);

        // if we just saw the final item for the current group, flush it and advance
        if (k === current && isFinal(item)) {
            yield* flushGroup(current);
            current = nextGroup();
        }
    }

    // stream ended; flush remaining groups in first-seen order
    if (current !== undefined) {
        if (buffers.has(current)) yield* flushGroup(current);
        while (true) {
            const k = nextGroup();
            if (k === undefined) break;
            yield* flushGroup(k);
        }
    }
}
