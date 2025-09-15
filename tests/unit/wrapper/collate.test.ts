import { collate } from '../../../src/wrapper/collate';

interface TestItem {
  group: string;
  data: string;
  isFinal: boolean;
}

describe('collate', () => {
  test('should collate items in group order', async () => {
    const source = async function* (): AsyncGenerator<TestItem> {
      yield { group: 'A', data: 'A1', isFinal: false };
      yield { group: 'B', data: 'B1', isFinal: false };
      yield { group: 'A', data: 'A2', isFinal: false };
      yield { group: 'A', data: 'A3', isFinal: true };
      yield { group: 'C', data: 'C1', isFinal: false };
      yield { group: 'C', data: 'C2', isFinal: false };
      yield { group: 'C', data: 'C3', isFinal: true };
      yield { group: 'B', data: 'B2', isFinal: true };
    };

    const collated = collate(
      source(),
      (item: TestItem) => item.group,
      (item: TestItem) => item.isFinal
    );

    const results: string[] = [];
    for await (const item of collated) {
      results.push(item.data);
    }

    expect(results).toEqual(['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2', 'C3']);
  });

  test('should handle single group', async () => {
    const source = async function* (): AsyncGenerator<TestItem> {
      yield { group: 'A', data: 'A1', isFinal: false };
      yield { group: 'A', data: 'A2', isFinal: true };
    };

    const collated = collate(
      source(),
      (item: TestItem) => item.group,
      (item: TestItem) => item.isFinal
    );

    const results: string[] = [];
    for await (const item of collated) {
      results.push(item.data);
    }

    expect(results).toEqual(['A1', 'A2']);
  });

  test('should handle empty source', async () => {
    const source = async function* (): AsyncGenerator<TestItem> {
      // Empty generator
    };

    const collated = collate(
      source(),
      (item: TestItem) => item.group,
      (item: TestItem) => item.isFinal
    );

    const results: string[] = [];
    for await (const item of collated) {
      results.push(item.data);
    }

    expect(results).toEqual([]);
  });

  test('should handle groups with single items', async () => {
    const source = async function* (): AsyncGenerator<TestItem> {
      yield { group: 'A', data: 'A1', isFinal: true };
      yield { group: 'B', data: 'B1', isFinal: true };
      yield { group: 'C', data: 'C1', isFinal: true };
    };

    const collated = collate(
      source(),
      (item: TestItem) => item.group,
      (item: TestItem) => item.isFinal
    );

    const results: string[] = [];
    for await (const item of collated) {
      results.push(item.data);
    }

    expect(results).toEqual(['A1', 'B1', 'C1']);
  });

  test('should handle complex interleaving', async () => {
    const source = async function* (): AsyncGenerator<TestItem> {
      yield { group: 'A', data: 'A1', isFinal: false };
      yield { group: 'B', data: 'B1', isFinal: false };
      yield { group: 'C', data: 'C1', isFinal: false };
      yield { group: 'A', data: 'A2', isFinal: false };
      yield { group: 'B', data: 'B2', isFinal: true };
      yield { group: 'A', data: 'A3', isFinal: true };
      yield { group: 'C', data: 'C2', isFinal: true };
    };

    const collated = collate(
      source(),
      (item: TestItem) => item.group,
      (item: TestItem) => item.isFinal
    );

    const results: string[] = [];
    for await (const item of collated) {
      results.push(item.data);
    }

    expect(results).toEqual(['A1', 'A2', 'A3', 'B1', 'B2', 'C1', 'C2']);
  });
});
