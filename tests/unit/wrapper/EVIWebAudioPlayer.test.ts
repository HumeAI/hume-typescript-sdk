import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EVIWebAudioPlayer } from "../../../src/wrapper/EVIWebAudioPlayer";

class FakeBufferSource {
    buffer: unknown = null;
    onended: (() => void) | null = null;
    connect = vi.fn();
    disconnect = vi.fn();
    start = vi.fn();
    stop = vi.fn();
}

class FakeAudioContext {
    static sources: FakeBufferSource[] = [];
    destination = {};
    sampleRate = 48000;
    currentTime = 0;
    createGain = () => ({ gain: { value: 1, setValueAtTime: vi.fn() }, connect: vi.fn(), disconnect: vi.fn() });
    createAnalyser = () => ({ fftSize: 0, frequencyBinCount: 4, connect: vi.fn(), disconnect: vi.fn() });
    createBufferSource = () => {
        const source = new FakeBufferSource();
        FakeAudioContext.sources.push(source);
        return source;
    };
    decodeAudioData = async () => ({ duration: 1 });
    resume = async () => undefined;
    close = async () => undefined;
}

const chunk = (id: string, index: number) => ({ type: "audio_output" as const, id, index, data: "AAAA" }) as any;

describe("EVIWebAudioPlayer in regular buffer mode", () => {
    let player: EVIWebAudioPlayer;

    beforeEach(async () => {
        FakeAudioContext.sources = [];
        vi.stubGlobal("AudioContext", FakeAudioContext);
        vi.stubGlobal("window", globalThis);
        player = new EVIWebAudioPlayer({ disableAudioWorklet: true });
        await player.init();
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("plays consecutive chunks of one message in order", async () => {
        await player.enqueue(chunk("a", 0));
        FakeAudioContext.sources[0]!.onended?.();
        await player.enqueue(chunk("a", 1));
        expect(FakeAudioContext.sources).toHaveLength(2);
    });

    it("drops chunks of an interrupted message that arrive after stop()", async () => {
        await player.enqueue(chunk("a", 0));
        player.stop();
        FakeAudioContext.sources[0]!.onended?.();

        await player.enqueue(chunk("a", 1));

        expect(FakeAudioContext.sources).toHaveLength(1);
        expect(player.playing).toBe(false);
    });

    it("drops buffered out-of-order chunks when stop() is called", async () => {
        await player.enqueue(chunk("a", 0));
        await player.enqueue(chunk("a", 2));
        player.stop();
        FakeAudioContext.sources[0]!.onended?.();

        await player.enqueue(chunk("a", 1));

        expect(FakeAudioContext.sources).toHaveLength(1);
    });

    it("plays a new message after stop()", async () => {
        await player.enqueue(chunk("a", 0));
        player.stop();
        FakeAudioContext.sources[0]!.onended?.();

        await player.enqueue(chunk("b", 0));

        expect(FakeAudioContext.sources).toHaveLength(2);
    });
});
