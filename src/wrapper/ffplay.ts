import commandExists from "command-exists"; 
import * as errors from "../errors";
import execa from "execa";

export async function ffplay(audio: Buffer): Promise<void> {
    if (!commandExists("ffplay")) {
        throw new errors.HumeError({
            message: `ffplay from ffmpeg not found, necessary to play audio. 
            On mac you can install it with 'brew install ffmpeg'. 
            On linux and windows you can install it from https://ffmpeg.org/`,
        });
    }
    const ffmpeg = execa("ffplay", ["-autoexit", "-acodec", "pcm_s16le", "-", "-nodisp"]);
    ffmpeg.stdin?.write(audio);
    ffmpeg.stdin?.end();
    await ffmpeg;
}